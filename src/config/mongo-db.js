import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (e) {
    console.error( `Error trying to create the connection to db. ${e}`)
    process.exit(1)
  }
};
mongoose.connection.on('error', err => {
  console.error('Error de MongoDB:', err.message);
});
export default connectDB;