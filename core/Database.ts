import mongoose from "mongoose";
import BotClient from "./Client";
import models from "../models";

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const MODELS_DIR = "./models";

export default class DatabaseHandler {
  constructor(private client: BotClient) {
    // Check if the bot is ready to be connected
    if (DB_HOST !== "") {
      // Loads models
      this.loadModels();

      // Start databse connection
      this.load();
    }
  }

  async loadModels() {
    models.forEach((registerModel) => registerModel());
  }

  async load() {
    // Defining conntection uri
    const connectionUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&writeConcern=majority`;

    // Await the connection
    await mongoose
      .connect(connectionUri)
      .then(() => {
        console.log(`[MONGODB] Connected successfully`);
      })
      .catch((error) => {
        console.log(`[MONGODB] Connecction error: `, error.response);
      });
  }
}
