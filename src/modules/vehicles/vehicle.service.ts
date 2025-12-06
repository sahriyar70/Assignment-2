import { pool } from "../../db/index";



export const create = async (data: any) => {
  const { vehicle_name, type, registration_number, daily_rent_price } = data;

  const res = await pool.query(
    `INSERT INTO vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status)
     VALUES ($1,$2,$3,$4,'available')
     RETURNING *`,
    [vehicle_name, type, registration_number, daily_rent_price]
  );

  return res.rows[0];
};

export const getAll = async () => {
  const res = await pool.query(`SELECT * FROM vehicles ORDER BY id ASC`);
  return res.rows;
};

export const getOne = async (id: string) => {
  const res = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
  if (!res.rows.length) throw new Error("Vehicle not found");
  return res.rows[0];
};

export const update = async (id: string, data: any) => {
  const { vehicle_name, type, daily_rent_price, availability_status } = data;

  const res = await pool.query(
    `UPDATE vehicles
     SET vehicle_name=$1, type=$2, daily_rent_price=$3, availability_status=$4
     WHERE id=$5
     RETURNING *`,
    [vehicle_name, type, daily_rent_price, availability_status, id]
  );

  return res.rows[0];
};

export const remove = async (id: string) => {
  const check = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'`,
    [id]
  );

  if (check.rows.length) throw new Error("Vehicle has active booking");

  await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
};
