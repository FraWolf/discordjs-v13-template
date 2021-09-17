//----------------------------------------------------------------------------------------------
// Dependencies

require("dotenv").config();

import BotClient from "./core/Client";
import { Intents } from "discord.js";
const { TOKEN } = process.env;

//----------------------------------------------------------------------------------------------
// Classes

const client = new BotClient({
  ownerId: "OWNER_USER_ID",
  admins: "ADMIN_ID,ADMIN_ID",
  intents: Object.values(Intents.FLAGS),
});

//----------------------------------------------------------------------------------------------
// Client Login

client.login(TOKEN!);

//----------------------------------------------------------------------------------------------
// Error Handling

client.on("error", console.error);
client.on("warn", console.warn);
