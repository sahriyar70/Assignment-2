import { pool } from "../../db/index";

export const createBooking = async (customerId: number, body: any) => {
  const { vehicle_id, rent_start_date, rent_end_date } = body;

  const client = await {pool}.pool.connect();
  try {
    await client.query("BEGIN");

    const v = await client.query(
      `SELECT * FROM vehicles WHERE id=$1 FOR UPDATE`,
      [vehicle_id]
    );

    if (!v.rows.length) throw new Error("Vehicle not found");
    if (v.rows[0].availability_status !== "available")
      throw new Error("Vehicle not available");

    const days =
      (new Date(rent_end_date).getTime() -
        new Date(rent_start_date).getTime()) /
      (1000 * 60 * 60 * 24);

    if (days <= 0) throw new Error("Invalid dates");

    const total_price = days * Number(v.rows[0].daily_rent_price);

    const booking = await client.query(
      `INSERT INTO bookings (customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status)
       VALUES ($1,$2,$3,$4,$5,'active')
       RETURNING *`,
      [customerId, vehicle_id, rent_start_date, rent_end_date, total_price]
    );

    await client.query(
      `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
      [vehicle_id]
    );

    await client.query("COMMIT");
    return booking.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const res = await pool.query(`SELECT * FROM bookings`);
    return res.rows;
  } else {
    const res = await pool.query(
      `SELECT * FROM bookings WHERE customer_id=$1`,
      [user.id]
    );
    return res.rows;
  }
};

export const updateBooking = async (user: any, bookingId: string) => {
  const res = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
  const booking = res.rows[0];

  if (!booking) throw new Error("Booking not found");

  if (user.role === "customer" && user.id !== booking.customer_id)
    throw new Error("Unauthorized");

  if (user.role === "customer") {
    if (new Date(booking.rent_start_date) <= new Date())
      throw new Error("Cannot cancel after start date");

    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [
      bookingId,
    ]);
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return { message: "Booking cancelled" };
  }

  if (user.role === "admin") {
    await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [
      bookingId,
    ]);
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return { message: "Vehicle returned" };
  }
};
