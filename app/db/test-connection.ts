import { sql } from "drizzle-orm";
import { db } from "./index";

const testConnection = async () => {
  try {
    console.log("Testing database connection...");
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log("Connection successful:", result);
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

testConnection();
