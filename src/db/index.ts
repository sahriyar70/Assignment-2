import { Pool } from "pg";


export const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_67bOKxmGDdUc@ep-mute-salad-ah0ytpiq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  

});

export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users  (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin','customer'))
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name TEXT NOT NULL,
      type TEXT NOT NULL,
      registration_number TEXT UNIQUE NOT NULL,
      daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
      availability_status TEXT NOT NULL CHECK (availability_status IN ('available','booked')) DEFAULT 'available'
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER NOT NULL REFERENCES users(id),
      vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price NUMERIC NOT NULL CHECK (total_price > 0),
      status TEXT NOT NULL CHECK (status IN ('active','cancelled','returned'))
    );
  `);

  console.log("Database connected ");
};
