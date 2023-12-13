import { c as create_ssr_component, v as validate_store, s as subscribe, d as add_attribute, f as validate_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { i as isLoggedIn } from "../../../chunks/store.js";
import { I as IconXi } from "../../../chunks/IconXi.js";
import { T as TabMenuBox } from "../../../chunks/TabMenuBox.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "#logo-box.s-29l8KhKlj7vd.s-29l8KhKlj7vd{width:310px;margin:15px auto}#logo-box.s-29l8KhKlj7vd img.s-29l8KhKlj7vd{width:60px;border-radius:25%}.home.s-29l8KhKlj7vd.s-29l8KhKlj7vd{margin:50px}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  let $page, $$unsubscribe_page;
  validate_store(isLoggedIn, "isLoggedIn");
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const pageRouteId = String($page.route.id).split("/");
  const baseUrl = pageRouteId[1];
  const tabsArr = [
    {
      link: baseUrl,
      name: "개인정보처리방침",
      mbLv: 0
    },
    {
      link: "termsOfUse",
      name: "이용약관",
      mbLv: 0
    }
  ];
  let gotoUrl = $isLoggedIn ? "/" : "/login";
  $$result.css.add(css);
  $$unsubscribe_isLoggedIn();
  $$unsubscribe_page();
  return `<div id="logo-box" class="flex justify-center s-29l8KhKlj7vd"><a${add_attribute("href", gotoUrl, 0)}><img src="/images/logo.png" alt="logo" class="s-29l8KhKlj7vd"></a></div> <div class="flex justify-between items-center my-4">${validate_component(TabMenuBox, "TabMenuBox").$$render(
    $$result,
    {
      tabsArr,
      baseUrl,
      currUrl: $page.params.slug
    },
    {},
    {}
  )}</div> <div class="text-surface-200">${slots.default ? slots.default({}) : ``}</div> <div class="flex justify-between items-center mt-8">${validate_component(TabMenuBox, "TabMenuBox").$$render(
    $$result,
    {
      tabsArr,
      baseUrl,
      currUrl: $page.params.slug
    },
    {},
    {}
  )}</div> <div class="text-center text-surface-500 home s-29l8KhKlj7vd"><a${add_attribute("href", gotoUrl, 0)}>${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "home", fontSize: "2.5rem" }, {}, {})}</a> </div>`;
});
export {
  Layout as default
};
