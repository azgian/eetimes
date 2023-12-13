import { c as create_ssr_component, e as escape, f as validate_component, v as validate_store, s as subscribe, h as each } from "../../../chunks/ssr.js";
import { a as accessApi } from "../../../chunks/access.js";
import { m as mb } from "../../../chunks/store.js";
import { I as IconXi } from "../../../chunks/IconXi.js";
import { b as addCommas } from "../../../chunks/config.js";
const StakingDetail_svelte_svelte_type_style_lang = "";
const css = {
  code: ".walletBox.s-LJM2Uti4r2us{border-radius:10px}.coin_logo.s-LJM2Uti4r2us{width:120px;border-radius:25px}tr.s-LJM2Uti4r2us{@apply variant-ghost;;color:#ccc}th.s-LJM2Uti4r2us{padding:5px;width:80px;font-size:0.8rem;font-weight:400}td.s-LJM2Uti4r2us{padding:5px}",
  map: null
};
const StakingDetail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { mbItem = {} } = $$props;
  let currPrice;
  let startDate = new Date(mbItem.start_day);
  let today = /* @__PURE__ */ new Date();
  let diffInTime = today.getTime() - startDate.getTime();
  let diffInDays = Math.floor(diffInTime / (1e3 * 60 * 60 * 24));
  if ($$props.mbItem === void 0 && $$bindings.mbItem && mbItem !== void 0)
    $$bindings.mbItem(mbItem);
  $$result.css.add(css);
  return `<div class="p-3 mb-4 variant-ghost walletBox s-LJM2Uti4r2us"><div class="flex justify-between">${mbItem.item_name ? `<img src="${"./images/coin_" + escape(mbItem.item_name.toLowerCase(), true) + ".jpg"}" alt="logo" class="coin_logo me-3 s-LJM2Uti4r2us">` : ``} <div>${mbItem.start_day === "0000-00-00" ? `<span class="badge variant-filled-tertiary" data-svelte-h="svelte-n8m7zf">접수대기중</span>` : ``}</div></div> <div class="table-container mt-2"><table class="table table-hover"><tr class="s-LJM2Uti4r2us"><th class="s-LJM2Uti4r2us" data-svelte-h="svelte-1cmz1ii">기간</th> <td class="s-LJM2Uti4r2us">${escape(mbItem.start_day !== "0000-00-00" ? mbItem.start_day : "")} ${escape(mbItem.end_day !== "0000-00-00" ? " ~ " + mbItem.end_day : "")}
					(${escape(mbItem.period)}일)</td></tr> <tr class="s-LJM2Uti4r2us"><th class="s-LJM2Uti4r2us" data-svelte-h="svelte-vykuft">보상율</th> <td class="s-LJM2Uti4r2us"><!-- HTML_TAG_START -->${mbItem.rate ? mbItem.rate * 1 + " <small>% / Daily</small>" : ""}<!-- HTML_TAG_END --></td></tr> <tr class="s-LJM2Uti4r2us"><th class="s-LJM2Uti4r2us">스테이킹<br>수량</th> <td class="text-primary-300 s-LJM2Uti4r2us"><!-- HTML_TAG_START -->${mbItem.amount ? "<strong>" + addCommas(mbItem.amount) + '</strong> <small class="text-surface-100">' + mbItem.item_name + "</small>" : ""}<!-- HTML_TAG_END --> <strong class="ms-2 text-success-300">(${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "won", fontSize: "0.8rem" }, {}, {})} ${escape(addCommas(Math.round(currPrice * mbItem.amount)))})</strong></td></tr> <tr class="s-LJM2Uti4r2us"><th class="s-LJM2Uti4r2us">누적<br>보상수량</th> <td class="text-primary-300 s-LJM2Uti4r2us">${escape(diffInDays ? diffInDays : "0")}일째<br> <!-- HTML_TAG_START -->${"0"}<!-- HTML_TAG_END --> ${``}</td></tr></table></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  let mbItemsList = [];
  const getMbItemsList = async () => {
    const params = { mbId: $mb.mb_id };
    const data = await accessApi("eetimes/getMbItemsList", params);
    mbItemsList = data;
  };
  getMbItemsList();
  $$unsubscribe_mb();
  return `<div>${each(mbItemsList, (mbItem) => {
    return `${validate_component(StakingDetail, "StakingDetail").$$render($$result, { mbItem }, {}, {})}`;
  })}</div>`;
});
export {
  Page as default
};
