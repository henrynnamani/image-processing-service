import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const datasource = new DataSource({
  type: 'postgres',
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: Boolean(process.env.DB_SYNC) === true,
});
