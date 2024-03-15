import log from "./log";

export default async function check() {
  try {
    const res = await fetch("http://localhost:5000/api/users/check", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    });
    return { status: res.status, data: await res.json() };
  } catch (err) {
    log(err);
  }
}
