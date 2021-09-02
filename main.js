//----------------------------------------------------------------------------------------------
// Dependencies

require("dotenv").config();

const SecurityClient = require("./core/Client");
const { Intents } = require("discord.js");
const { TOKEN, OWNER_ID, ADMINS_ID } = process.env;

//----------------------------------------------------------------------------------------------
// Classes

const client = new BotClient({
  ownerId: "OWNER_USER_ID",
  admins: "ADMIN_ID,ADMIN_ID",
  intents: Object.values(Intents.FLAGS),
});

//----------------------------------------------------------------------------------------------
// Client Login

client.login(TOKEN);

//----------------------------------------------------------------------------------------------
// Error Handling

client.on("error", console.error);
client.on("warn", console.warn);
