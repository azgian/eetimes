import { c as create_ssr_component, v as validate_store, s as subscribe, e as escape, f as validate_component, h as each } from "../../chunks/ssr.js";
import { b as addCommas, c as getCopyText, g as goto } from "../../chunks/config.js";
import { a as accessApi } from "../../chunks/access.js";
import { m as mb } from "../../chunks/store.js";
import { B as Button } from "../../chunks/Button.js";
import { I as IconXi } from "../../chunks/IconXi.js";
import { g as getToastStore } from "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const itemListDetail_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "td.s-ZrLVcJ0SFUjJ{text-align:center}.text-price.s-ZrLVcJ0SFUjJ{font-size:1.75rem;font-weight:600;@apply text-surface-300;}",
  map: null
};
const ItemListDetail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  const toastStore = getToastStore();
  let { itemInfo = {} } = $$props;
  let { itemPrice } = $$props;
  const setCopy = (text) => {
    getCopyText(text);
    const t = {
      message: "복사되었습니다.",
      timeout: 3e3
    };
    toastStore.trigger(t);
  };
  let itemName = itemInfo.it_name;
  let btnDisabledReq = false;
  let showGsReq = false;
  const reqBuy = async () => {
    if (!($mb.mb_name && $mb.mb_hp && $mb.mb_email)) {
      const t = {
        message: "회원정보에 회원이름, 전화번호, 이메일 입력후에 신청가능합니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
      return false;
    }
    if (!confirm("신청하시겠습니까?"))
      return;
    const params = { itemName };
    btnDisabledReq = showGsReq = true;
    const data = await accessApi("eetimes/reqBuy", params);
    if (data.msg === "success") {
      const t = {
        message: "신청되었습니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
    }
    btnDisabledReq = showGsReq = false;
  };
  if ($$props.itemInfo === void 0 && $$bindings.itemInfo && itemInfo !== void 0)
    $$bindings.itemInfo(itemInfo);
  if ($$props.itemPrice === void 0 && $$bindings.itemPrice && itemPrice !== void 0)
    $$bindings.itemPrice(itemPrice);
  $$result.css.add(css$2);
  $$unsubscribe_mb();
  return `${itemPrice ? `<div class="flex items-center mt-3 ps-4"><string class="me-3 text-surface-300">${escape(itemInfo._it_name)}</string> ${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "won", addClass: "me-1" }, {}, {})}<span class="text-price s-ZrLVcJ0SFUjJ">${escape(addCommas(Math.floor(itemPrice * 100) / 100))}</span></div>` : ``} <div class="p-3 mt-3 table-container"><table class="table table-compact table-interactive"><tbody><tr><td class="s-ZrLVcJ0SFUjJ" data-svelte-h="svelte-11h38fx">월환산 보상율</td> <td class="s-ZrLVcJ0SFUjJ" data-svelte-h="svelte-1dv2oj1">보상주기</td></tr> <tr class="text-primary-300"><td class="s-ZrLVcJ0SFUjJ"><strong>${escape(itemInfo.it_rate ? Math.round(itemInfo.it_rate * 30 * 100) / 100 : "")} %</strong></td> <td class="s-ZrLVcJ0SFUjJ"><strong data-svelte-h="svelte-v2q4q8">매일</strong></td></tr></tbody></table></div> <div class="flex justify-between px-3 mt-3"><div>${itemInfo.it_wallet ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: "variant-filled-primary btn-sm mt-1",
      btnText: itemInfo.it_wallet ? "Wallet" : "지갑주소 없음",
      iconNameS: "documents-o",
      btnDisabled: itemInfo.it_wallet ? false : true,
      onClick: () => setCopy(itemInfo.it_wallet)
    },
    {},
    {}
  )}` : ``} ${itemInfo.bank ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: "variant-filled-primary btn-sm mt-1",
      btnText: itemInfo.bank ? "계좌번호 복사" : "은행계좌정보없음",
      iconNameS: "documents-o",
      btnDisabled: itemInfo.bank ? false : true,
      onClick: () => setCopy(itemInfo.bank.replace(/\D/g, ""))
    },
    {},
    {}
  )}<br> <small class="text-surface-300">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "bank" }, {}, {})} ${escape(itemInfo.bank)}</small>` : ``}</div> <div><form>${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary",
      btnText: "신청",
      onClick: reqBuy,
      btnDisabled: btnDisabledReq,
      showGs: showGsReq
    },
    {},
    {}
  )}</form></div></div> <div class="flex flex-col p-5 text-surface-300"><small>${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 참여자들이 실제로 분배 받은 보상율은 향후 변동될 수 있습니다.</small> ${itemInfo._it_name === "USDT" ? `<small>${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 지갑주소를 복사하여 코인을 전송한 후, 신청하시면 관리자가 확인후 처리해
			드립니다.</small> <small>${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 송금 수수료(1USDT)는 본인 부담입니다.</small>` : ``} ${itemInfo._it_name === "KRW" ? `<small>${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 계좌번호를 복사하여 이체한 후, 신청하시면 관리자가 확인후 처리해 드립니다.</small>` : ``} </div>`;
});
const ItemList_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".itemWrap.s-hSqP7Ue1x-Ax.s-hSqP7Ue1x-Ax{border-radius:10px}.coin_logo.s-hSqP7Ue1x-Ax.s-hSqP7Ue1x-Ax{width:150px;border-radius:25px;border:solid 1px #666}.itemBox.s-hSqP7Ue1x-Ax.s-hSqP7Ue1x-Ax{vertical-align:middle}.infoBox.s-hSqP7Ue1x-Ax span.s-hSqP7Ue1x-Ax{margin-left:15px;font-size:2rem;font-weight:700}.infoBox.s-hSqP7Ue1x-Ax span small.s-hSqP7Ue1x-Ax{margin-left:5px;font-size:1rem;font-weight:400;color:#ccc}.infoBox.s-hSqP7Ue1x-Ax .total.s-hSqP7Ue1x-Ax{margin-left:1.25px;font-size:1rem;font-weight:400}@media(max-width: 468px){.infoBox.s-hSqP7Ue1x-Ax span.s-hSqP7Ue1x-Ax{margin-left:10px;font-size:1.5rem;display:block}.infoBox.s-hSqP7Ue1x-Ax span small.s-hSqP7Ue1x-Ax{font-size:0.8rem}.infoBox.s-hSqP7Ue1x-Ax .total.s-hSqP7Ue1x-Ax{font-size:1rem}}@media(max-width: 300px){.coin_logo.s-hSqP7Ue1x-Ax.s-hSqP7Ue1x-Ax{width:100px}}",
  map: null
};
const ItemList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { itemId } = $$props;
  let showDetail = false;
  let itemInfo = {};
  let itemPrice;
  if ($$props.itemId === void 0 && $$bindings.itemId && itemId !== void 0)
    $$bindings.itemId(itemId);
  $$result.css.add(css$1);
  return `${itemInfo ? `<div class="mb-4 variant-ghost itemWrap s-hSqP7Ue1x-Ax"><div class="flex items-center justify-between p-3 itemBox s-hSqP7Ue1x-Ax">${itemInfo.it_name ? `<div><img src="${"./images/coin_" + escape(itemInfo.it_name.toLowerCase(), true) + ".jpg"}" alt="logo" class="coin_logo s-hSqP7Ue1x-Ax"></div>` : ``} <div class="text-center infoBox grow s-hSqP7Ue1x-Ax"><span class="text-primary-300 s-hSqP7Ue1x-Ax">${escape(itemInfo.it_rate ? itemInfo.it_rate * 1 : "")}<small class="s-hSqP7Ue1x-Ax" data-svelte-h="svelte-1rszlrh">%</small></span> <span class="total text-primary-300 s-hSqP7Ue1x-Ax">(${escape(itemInfo.it_rate && itemInfo.it_period ? Math.floor(itemInfo.it_rate * itemInfo.it_period * 100) / 100 : "")}<small class="s-hSqP7Ue1x-Ax" data-svelte-h="svelte-1rszlrh">%</small>)</span> <span class="text-success-300 s-hSqP7Ue1x-Ax">${escape(itemInfo.it_period ? itemInfo.it_period : "")}<small class="s-hSqP7Ue1x-Ax" data-svelte-h="svelte-1pp7p5i">일</small></span></div> <div>${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: "variant-ghost btn-icon btn-icon-sm",
      iconNameS: "ellipsis-h",
      iconNameAlt: "close",
      showAlt: showDetail,
      onClick: () => showDetail = !showDetail
    },
    {},
    {}
  )}</div></div> ${showDetail ? `<div>${validate_component(ItemListDetail, "ItemListDetail").$$render($$result, { itemInfo, itemPrice }, {}, {})}</div>` : ``}</div>` : ``}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".alertBox.s-y_bCXRrkrYfP{border-radius:10px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  let itemList = [];
  const getItemList = async () => {
    const data = await accessApi("eetimes/getItemList");
    itemList = data;
  };
  getItemList();
  $$result.css.add(css);
  $$unsubscribe_mb();
  return `<div>${!($mb.mb_name && $mb.mb_hp && $mb.mb_email) ? `<aside class="p-4 alertBox variant-ghost-primary s-y_bCXRrkrYfP">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "profile" }, {}, {})} <span class="me-2" data-svelte-h="svelte-1q83nkq">회원이름, 전화번호, 이메일 등 회원정보를 입력하세요.</span> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: "variant-filled-secondary btn-sm",
      btnText: "회원정보 입력하기",
      onClick: () => goto("/myInfo")
    },
    {},
    {}
  )}</aside>` : ``} <div class="mt-6">${each(itemList, (item) => {
    return `${validate_component(ItemList, "ItemList").$$render($$result, { itemId: item.it_id }, {}, {})}`;
  })}</div> </div>`;
});
export {
  Page as default
};
