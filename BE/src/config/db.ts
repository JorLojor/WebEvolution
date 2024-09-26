import mysql from 'mysql2/promise';

// const port: any = process.env.PORT;
const port: any = 8889;

export const DBconnection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'evolutiondb',
  port: port,
  waitForConnections: true,
});
