import mysql from 'mysql2/promise';

export const DBconnection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'evolutiondb',
    port : 8889,
    waitForConnections: true,
});
