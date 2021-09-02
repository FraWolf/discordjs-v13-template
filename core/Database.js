const mongoose = require("mongoose");
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const { readdirSync } = require("fs");
const MODELS_DIR = "./models";

module.exports = class DatabaseHandler {
  constructor(client) {
    this.client = client;

    // Check if the bot is ready to be connected
    if (DB_HOST !== "") {
      // Loads models
      this.loadModels();

      // Start databse connection
      this.load();
    }
  }

  async loadModels() {
    // Read the folder contents
    const modelsFolder = readdirSync(`${MODELS_DIR}`);

    // Load all models inside the folder
    modelsFolder.forEach((schema) => {
      require(`.${MODELS_DIR}/${schema}`);
    });
  }

  async load() {
    // Defining conntection uri
    const connectionUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&writeConcern=majority`;

    // Await the connection
    await mongoose
      .connect(connectionUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`[MONGODB] Connected successfully`);
      })
      .catch((error) => {
        console.log(`[MONGODB] Connecction error: `, error.response);
      });
  }
};
