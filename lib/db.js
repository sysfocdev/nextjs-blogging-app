

export const connectionStr = process.env.mongodburi

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(connectionStr);
}
