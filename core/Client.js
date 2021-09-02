const { Client } = require("discord.js");

const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");
const CommandLoader = require("./CommandLoader");

const Utils = require("./Utils");
const Settings = require("./Settings");
const DatabaseHandler = require("./Database");

const { OWNER_ID } = process.env;

module.exports = class BotClient extends Client {
  constructor({ ownerId, admins, intents }) {
    super({
      ownerId: ownerId || OWNER_ID,
      admins: admins || [],
      intents,
    });
  }

  async login(token) {
    this.Settings = new Settings(this);
    this.Utils = new Utils(this);

    new CommandLoader(this, token);
    new CommandHandler(this);
    new EventHandler(this);
    new DatabaseHandler(this);

    // Login on Discord
    return super.login(token);
  }
};
