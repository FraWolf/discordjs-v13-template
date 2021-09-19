import fetch from "isomorphic-unfetch";
import BotClient from "./Client";

export default class Utils {
  constructor(private client: BotClient) {}

  isTrusted(userId: string) {
    if (userId === this.client.options.ownerId) return true;
    else if (this.client.options.admins.includes(userId)) return true;
    else return false;
  }

  async capital(name: string) {
    const chars = name.split("_");
    return chars.reduce(
      (acc, item) => acc + `${item.charAt(0).toUpperCase() + item.slice(1)} `,
      ""
    );
  }

  formatDate(date: string | number | Date) {
    date = new Date(date);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  async request(
    url: string,
    json = false,
    method = "GET",
    headers = {},
    body?: RequestInit["body"]
  ) {
    if (!url) throw Error;
    else {
      let req;
      try {
        let options: RequestInit = { method, headers };
        if (method === "POST") options.body = body;

        let req1 = await fetch(url, options);
        if (!json) req = await req1.text();
        else if (json) req = await req1.json();
      } catch (e: any) {
        console.log(`[REQUEST] Error on request: ${url}`);
        e.error = true;
        return e;
      }
      return req;
    }
  }
}
