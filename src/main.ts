//----------------------------------------------------------------------------------------------
// Dependencies

require("dotenv").config();

import BotClient from "./core/client";
import { Intents } from "discord.js";
const { TOKEN, OWNER_ID, ADMINS_ID } = process.env;

//----------------------------------------------------------------------------------------------
// Classes

const client = new BotClient({
  ownerId: OWNER_ID!,
  admins: ADMINS_ID!,
  intents: [Intents.FLAGS.GUILD_MESSAGES],
});

//----------------------------------------------------------------------------------------------
// Client Login

client.login(TOKEN!);

//----------------------------------------------------------------------------------------------
// Error Handling

client.client.on("error", console.error);
client.client.on("warn", console.warn);
