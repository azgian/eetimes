import { c as create_ssr_component, v as validate_store, s as subscribe, e as escape } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "pre.s-x-oVXsYm8pUe{width:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<pre class="s-x-oVXsYm8pUe">	${escape(JSON.stringify($page))}
</pre>`;
});
export {
  Page as default
};
