import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
};
