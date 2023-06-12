export const config =  {
    mongoUri: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/products',
    port: process.env.PORT || 8000,
};