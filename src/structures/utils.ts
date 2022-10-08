import fetch from "isomorphic-unfetch";

export function isUserTrusted(userId: string) {
  const { OWNER_USER_ID, ADMINS_ID } = process.env;
  return userId === OWNER_USER_ID || ADMINS_ID?.includes(userId);
}

export function capital(name: string) {
  const chars = name.split("_");
  return chars.reduce((acc, item) => acc + `${item.charAt(0).toUpperCase() + item.slice(1)} `, "");
}

export function formatDate(date: string | number | Date) {
  date = new Date(date);
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export async function request<T>(
  url: string,
  json = false,
  method = "GET",
  headers: RequestInit["headers"] = {},
  body?: RequestInit["body"]
): Promise<T> {
  if (!url) throw Error;
  else {
    let requestToSend;
    try {
      let options: RequestInit = { method, headers };
      if (method === "POST") options.body = body;

      let webRequest = await fetch(url, options);

      requestToSend = json ? await webRequest.json() : await webRequest.text();
    } catch (e: any) {
      requestToSend = { error: true, message: e.message };
    }

    return requestToSend;
  }
}
