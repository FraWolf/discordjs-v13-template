import fetch from "isomorphic-unfetch";

export function isUserTrusted(userId: string) {
  const { OWNER_USER_ID, ADMINS_ID } = process.env;
  return userId === OWNER_USER_ID || ADMINS_ID?.includes(userId);
}

export function capital(name: string) {
  const chars = name.split("_");
  return chars.reduce(
    (acc, item) => acc + `${item.charAt(0).toUpperCase() + item.slice(1)} `,
    ""
  );
}

export function formatDate(date: string | number | Date) {
  date = new Date(date);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

export async function request(
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
