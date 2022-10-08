//----------------------------------------------------------------------------------------------
// Dependencies

require("dotenv").config();

import { GatewayIntentBits } from "discord.js";
import BotClient from "./structures/client";
const { TOKEN } = process.env;

//----------------------------------------------------------------------------------------------
// Classes

export const client = new BotClient({
  intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
});

//----------------------------------------------------------------------------------------------
// Client Login

client.login(TOKEN!);

//----------------------------------------------------------------------------------------------
// Error Handling

client.client.on("error", console.error);
client.client.on("warn", console.warn);
