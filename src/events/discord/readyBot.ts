import { DiscordEvent } from "../../types/event";

const readyBot: DiscordEvent<"ready"> = {
  name: "ready",
  execute: async (client) => {
    // Starting debug
    console.log(
      `[DISCORD] Ready as ${client.client.user?.tag} - Loaded ${client.commands.size} commands and ${client.events.size} events`
    );

    // Setup bot presence
    client.client.user?.setPresence({
      activities: [{ type: "PLAYING", name: "DiscordJS v13 Template" }],
      status: "online",
    });
  },
};

export default readyBot;
