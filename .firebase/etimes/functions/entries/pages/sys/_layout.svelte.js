import { c as create_ssr_component, d as add_attribute, v as validate_store, s as subscribe, f as validate_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { T as TabMenuBox } from "../../../chunks/TabMenuBox.js";
const SearchMbForm_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.s-Pfr-52J2aTbl{text-align:center}",
  map: null
};
const SearchMbForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchMbName = "";
  $$result.css.add(css);
  return `<div class="mb-4 ms-2"><input type="search" placeholder="이름, 아이디 검색" class="input s-Pfr-52J2aTbl"${add_attribute("value", searchMbName, 0)}> </div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const pageRouteId = String($page.route.id).split("/");
  const baseUrl = pageRouteId[1];
  const tabsArr = [
    {
      link: baseUrl,
      name: "회원",
      mbLv: 2
    },
    {
      link: "item",
      name: "아이템",
      mbLv: 2
    }
  ];
  $$unsubscribe_page();
  return `<div class="flex justify-between items-center">${validate_component(TabMenuBox, "TabMenuBox").$$render(
    $$result,
    {
      tabsArr,
      baseUrl,
      currUrl: $page.params.slug
    },
    {},
    {}
  )} <div>${$page.route.id === "/sys" ? `${validate_component(SearchMbForm, "SearchMbForm").$$render($$result, {}, {}, {})}` : ``}</div></div> ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
