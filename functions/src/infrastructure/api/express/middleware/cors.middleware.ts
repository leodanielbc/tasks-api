export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.URL_FRONTEND : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};