import cors from 'cors';

export const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.URL_FRONTEND : 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

export const corsMiddleware = cors(corsOptions);