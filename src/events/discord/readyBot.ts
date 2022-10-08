import { WrappedEvents } from "../../types/event";

const readyBot: WrappedEvents<"Discord", "ready"> = {
  name: "ready",
  type: "Discord",
  execute: async (client) => {
    // Starting debug
    console.log(
      [
        `Ready as ${client.client.user?.tag}`,
        `Loaded ${client.commands.size} commands and ${client.events.size} events`,
      ].join("\n")
    );
  },
};

export default readyBot;
