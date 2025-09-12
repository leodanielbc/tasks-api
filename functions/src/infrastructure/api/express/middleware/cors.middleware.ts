import cors from 'cors';

export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? '*' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);