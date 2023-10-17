import myslConnection from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest-api'
};

export const pool = myslConnection.createPool(properties);