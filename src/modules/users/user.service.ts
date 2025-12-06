import { pool } from "../../db/index";
import { AuthRequest } from "../../common/middleware/auth.middleware";

export const getAllUsers = async () => {
  const res = await pool.query(
    `SELECT id,name,email,phone,role FROM users ORDER BY id ASC`
  );
  return res.rows;
};

export const updateUser = async (req: AuthRequest) => {
  const userId = Number(req.params.userId);

  if (req.user!.role !== "admin" && req.user!.id !== userId)
    throw new Error("You cannot edit others profile");

  const { name, phone, role } = req.body;

  const res = await pool.query(
    `UPDATE users SET name=$1, phone=$2, role=$3 WHERE id=$4 RETURNING id,name,email,phone,role`,
    [name, phone, role || "customer", userId]
  );

  return res.rows[0];
};

export const deleteUser = async (userId: string) => {
  const check = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
    [userId]
  );

  if (check.rows.length > 0)
    throw new Error("User has active bookings — cannot delete");

  await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
};
