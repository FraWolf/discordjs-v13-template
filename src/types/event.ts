import { ClientEvents, Collection } from "discord.js";
import BotClient from "../structures/client";
import { Command } from "./command";

interface Options {
  Discord: ClientEvents;
}

export type Arrayalize<T> = T extends unknown[] ? T : [];

export interface WrappedEvents<T extends keyof Options = keyof Options, K extends keyof Options[T] = keyof Options[T]> {
  name: K;
  type: T;
  execute: (client: BotClient, ...args: Arrayalize<Options[T][K]>) => Promise<any>;
}

export type EventsCollection = Collection<string, WrappedEvents<keyof Options, keyof Options[keyof Options]>>;

export type CommandsCollection = Collection<string, Command>;
