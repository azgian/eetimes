import { c as create_ssr_component, v as validate_store, s as subscribe, h as each, d as add_attribute, e as escape } from "./ssr.js";
import { p as page } from "./stores.js";
import { m as mb } from "./store.js";
const TabMenuBox_svelte_svelte_type_style_lang = "";
const css = {
  code: "#tabMenuBox.s-qrVFZJF2sq8Q{margin-bottom:15px}",
  map: null
};
const TabMenuBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $mb, $$unsubscribe_mb;
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  let { tabsArr } = $$props;
  let { currUrl } = $$props;
  let { baseUrl } = $$props;
  if ($$props.tabsArr === void 0 && $$bindings.tabsArr && tabsArr !== void 0)
    $$bindings.tabsArr(tabsArr);
  if ($$props.currUrl === void 0 && $$bindings.currUrl && currUrl !== void 0)
    $$bindings.currUrl(currUrl);
  if ($$props.baseUrl === void 0 && $$bindings.baseUrl && baseUrl !== void 0)
    $$bindings.baseUrl(baseUrl);
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_mb();
  return `<div id="tabMenuBox" class="s-qrVFZJF2sq8Q"><div class="tabMenuBox btn-group variant-ringed">${each(tabsArr, (tab) => {
    let isBaseUrl = $page.url.pathname === "/" + baseUrl ? baseUrl + "/" : "", tabLink = tab.link === baseUrl ? "./" : tab.link, isCurrUrl = !currUrl ? "./" : currUrl;
    return `   ${$mb && $mb.mb_level >= tab.mbLv || !tab.mbLv ? `<a${add_attribute("href", isBaseUrl + tabLink, 0)} class="${"btn " + escape(tabLink === isCurrUrl ? "variant-ghost-tertiary" : "", true)}">${escape(tab.name)} </a>` : ``}`;
  })}</div> </div>`;
});
export {
  TabMenuBox as T
};
