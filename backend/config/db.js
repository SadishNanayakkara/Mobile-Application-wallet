import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Add the "export" keyword directly before the "const"
export const sql = neon(process.env.DATABASE_URL);
