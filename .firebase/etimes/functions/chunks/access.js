import { g as goto } from "./config.js";
import { m as mb, i as isLoggedIn } from "./store.js";
import { a as get_store_value } from "./ssr.js";
const accessApi = async (accessUrl, obj = {}, method = "POST") => {
  const mbId = get_store_value(mb)?.mb_id;
  const mbToken = get_store_value(mb)?.mb_token;
  const siteCode = "eetimes";
  const API_ENDPOINT = "https://fynx.cc/api/routes/";
  const authInfo = {
    mbId,
    mbToken,
    siteCode
  };
  const params = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      authInfo,
      ...obj
    })
  };
  const res = await fetch(API_ENDPOINT + accessUrl, params);
  const { data } = await res.json();
  if (data.msg === "x!") {
    console.log("Invalid access token");
    isLoggedIn.set(false);
    goto("/");
  }
  return data;
};
const resetMb = async (mbId) => {
  const params = { mbId };
  await accessApi("member/resetMb", params);
  const data = await accessApi("member/resetMb", params);
  mb.set(data.mb);
};
export {
  accessApi as a,
  resetMb as r
};
