import mongoose from "mongoose";

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export async function loadMongoose() {
  if (!DB_HOST) {
    return null;
  }

  const connectionUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&writeConcern=majority`;

  // Await the connection
  return await mongoose
    .connect(connectionUri)
    .then((mongoose) => {
      console.log(`[MONGODB] Connected successfully`);
      return mongoose;
    })
    .catch((error) => {
      console.log(`[MONGODB] Connecction error: `, error);
      return null;
    });
}
