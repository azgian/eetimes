function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const addCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const getCopyText = (content) => {
  navigator.clipboard.writeText(content);
};
const getEmailMatch = (email) => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!email || email.match(regExp) == null)
    return false;
  else
    return true;
};
const scrollToId = (elmId) => {
  const element = document.getElementById(elmId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
};
const ibLv = 4;
const brLv = 6;
const sys7Lv = 7;
const sys8Lv = 8;
const sys9Lv = 9;
const sys10Lv = 10;
const lvArray = [
  { lv: 1, name: "비회원", ref: null },
  { lv: 2, name: "회원", ref: null },
  { lv: ibLv, name: "IB", ref: null },
  { lv: brLv, name: "CO", ref: null },
  { lv: sys7Lv, name: "CO", ref: null },
  { lv: sys8Lv, name: "SYS", ref: null },
  { lv: sys9Lv, name: "SYS", ref: null },
  { lv: sys10Lv, name: "SYS", ref: null }
];
const lvColorArray = [
  { lv: 1, name: "surface" },
  { lv: 2, name: "primary" },
  { lv: 4, name: "warning" },
  { lv: 6, name: "surface" },
  { lv: 7, name: "secondary" },
  { lv: 8, name: "secondary" },
  { lv: 9, name: "secondary" },
  { lv: 10, name: "secondary" }
];
const getLvName = (lv) => {
  const lvObj = lvArray.find((obj) => obj.lv === lv);
  return lvObj?.name;
};
const lvNameElm = (lv) => {
  const lvColorObj = lvColorArray.find((obj) => obj.lv === lv);
  const color = lvColorObj?.name;
  return '<span class="badge variant-filled-' + color + '">' + getLvName(lv) + "</span>";
};
export {
  getEmailMatch as a,
  addCommas as b,
  getCopyText as c,
  sys7Lv as d,
  goto as g,
  lvNameElm as l,
  scrollToId as s
};
