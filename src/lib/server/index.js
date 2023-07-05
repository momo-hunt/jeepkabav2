import { SECRET_URL_DB } from "$env/static/private";
import { error } from "@sveltejs/kit";

class DB {
  constructor() {
    this.time = new Date().getTime().toString();
    this.req = {};
  }

  async fetchData() {
    // await new Promise((res) => setTimeout(res, 3000));
    const req = { ...this.req, token: this.token };
    const url = new URL(SECRET_URL_DB);
    url.searchParams.set("req", JSON.stringify(req));
    url.searchParams.set("time", this.time);

    try {
      const respon = await fetch(url);
      const result = await respon.json();
      // console.log("res->", result);
      if (result.error) throw error(400, result);

      return result;
    } catch (err) {
      throw error(500, err.message);
    }
  }

  setToken(token) {
    this.token = token;
  }

  collection(collection) {
    this.req = { collection };
    return this;
  }

  async read(opt) {
    this.req = { ...this.req, method: "read", ...opt };
    return this.fetchData();
  }

  async create(body, opt) {
    this.req = { ...this.req, method: "create", body, ...opt };
    return this.fetchData();
  }

  async update(id, body, opt) {
    this.req = { ...this.req, method: "update", id, body, ...opt };
    return this.fetchData();
  }

  async delete(id, opt) {
    this.req = { ...this.req, method: "delete", id, ...opt };
    return this.fetchData();
  }
}

export const db = new DB();
