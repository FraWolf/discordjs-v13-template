const fetch = require("node-fetch");

module.exports = class Utils {
  constructor(client) {
    this.client = client;
  }

  isTrusted(userId) {
    if (userId === this.client.options.ownerId) return true;
    else if (this.client.options.admins.includes(userId)) return true;
    else return false;
  }

  async capital(name) {
    name = name.split("_");
    let finalName = "";

    await name.map(async (item) => {
      finalName += `${item.charAt(0).toUpperCase() + item.slice(1)} `;
    });

    return finalName;
  }

  formatDate(date) {
    date = new Date(date);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  async request(url, json = false, method = "GET", headers = {}, body = {}) {
    if (!url) throw Error;
    else {
      let req;
      try {
        let options = { method, headers };
        if (method === "POST") options.body = body;

        let req1 = await fetch(url, options);
        if (!json) req = await req1.text();
        else if (json) req = await req1.json();
      } catch (e) {
        console.log(`[REQUEST] Error on request: ${url}`);
        e.error = true;
        return e;
      }
      return req;
    }
  }
};
