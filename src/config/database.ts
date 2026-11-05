import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crud-nodejs');
    console.log('📦 Conectado ao MongoDB local com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}