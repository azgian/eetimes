import { c as create_ssr_component, v as validate_store, s as subscribe, e as escape, d as add_attribute, f as validate_component } from "../../../chunks/ssr.js";
import { m as mb } from "../../../chunks/store.js";
import { g as getToastStore } from "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { I as IconXi } from "../../../chunks/IconXi.js";
import { B as Button } from "../../../chunks/Button.js";
import { a as accessApi, r as resetMb } from "../../../chunks/access.js";
import { a as getEmailMatch } from "../../../chunks/config.js";
const ItemBox_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".coin_logo.s-DJxrql_j8_fu{width:120px;border-radius:25px}.walletBox.s-DJxrql_j8_fu{border-radius:25px}",
  map: null
};
const ItemBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  const toastStore = getToastStore();
  let mbMemo = $mb && $mb.mb_memo ? JSON.parse($mb.mb_memo) : {};
  let { itemName } = $$props;
  let { itemLogo } = $$props;
  let itemMemo = mbMemo[itemName] && mbMemo[itemName].memo ? mbMemo[itemName].memo : "";
  let itemTag = mbMemo[itemName] && mbMemo[itemName].tag ? mbMemo[itemName].tag : "";
  const setMbMemo = async (itemName2, memo, isTag = false) => {
    if (!memo) {
      const t = {
        message: "지갑주소가 입력되지 않았습니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
      return false;
    }
    const params = { itemName: itemName2, memo, isTag };
    const data = await accessApi("eetimes/setMbMemo", params);
    if (data.msg === "success") {
      const t = {
        message: "저장되었습니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
      resetMb($mb.mb_id);
    }
  };
  if ($$props.itemName === void 0 && $$bindings.itemName && itemName !== void 0)
    $$bindings.itemName(itemName);
  if ($$props.itemLogo === void 0 && $$bindings.itemLogo && itemLogo !== void 0)
    $$bindings.itemLogo(itemLogo);
  $$result.css.add(css$1);
  $$unsubscribe_mb();
  return `<div class="p-3 mb-6 variant-ghost walletBox s-DJxrql_j8_fu"><img src="${"./images/" + escape(itemLogo, true) + ".jpg"}" alt="logo" class="mb-2 coin_logo s-DJxrql_j8_fu"> <form><label class="label"><div class="grid-cols-12 input-group input-group-divider"><input type="text" class="col-span-10" placeholder="지갑주소"${add_attribute("value", itemMemo, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-2",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbMemo(itemName, itemMemo)
    },
    {},
    {}
  )}</div></label></form> <form>${itemName === "XRP" ? `<label class="mt-2 label"><div class="grid-cols-12 input-group input-group-divider"><input type="text" class="col-span-10" placeholder="D-Tag"${add_attribute("value", itemTag, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-2",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbMemo(itemName, itemTag, true)
    },
    {},
    {}
  )}</div></label>` : ``}</form> </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.s-skbfwBJ_DR9l{text-align:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  const toastStore = getToastStore();
  let mbName = $mb ? $mb.mb_name : "";
  let mbHp = $mb ? $mb.mb_hp : "";
  let mbEmail = $mb ? $mb.mb_email : "";
  const bankInfo = $mb.mb_bank.split(" ") || ["", "", ""];
  let mbBank0 = bankInfo[0];
  let mbBank1 = bankInfo[1];
  let mbBank2 = bankInfo[2];
  let mbPassword = "";
  const setMbInfo = async (fld, val) => {
    if (!val || !(mbBank0 && mbBank1 && mbBank2)) {
      const t = {
        message: "회원정보가 입력되지 않았습니다.",
        timeout: 1500
      };
      toastStore.trigger(t);
      return false;
    }
    if (fld === "mb_email" && !getEmailMatch(mbEmail))
      return false;
    const params = { fld, val };
    const data = await accessApi("member/setMbInfo", params);
    if (data.msg === "exist_email") {
      const t = {
        message: "이미 등록된 이메일입니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
      return false;
    }
    if (data.msg === "success") {
      const t = {
        message: "회원정보가 저장되었습니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
      resetMb($mb.mb_id);
    }
    if (fld === "mb_password") {
      mbPassword = "";
    }
  };
  $$result.css.add(css);
  $$unsubscribe_mb();
  return `<div><form class="mb-4"><label class="label mt-2"><div class="input-group input-group-divider grid-cols-12"><input type="text" class="col-span-9 s-skbfwBJ_DR9l" placeholder="회원 이름"${add_attribute("value", mbName, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-3",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbInfo("mb_name", mbName)
    },
    {},
    {}
  )}</div></label></form> <form class="mb-4"><label class="label"><div class="input-group input-group-divider grid-cols-12"><input type="tel" class="col-span-9 s-skbfwBJ_DR9l" placeholder="전화번호"${add_attribute("value", mbHp, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-3",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbInfo("mb_hp", mbHp)
    },
    {},
    {}
  )}</div></label></form> <form class="mb-4"><label class="label"><div class="input-group input-group-divider grid-cols-12"><input type="email" class="col-span-9 s-skbfwBJ_DR9l" placeholder="이메일"${add_attribute("value", mbEmail, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-3",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbInfo("mb_email", mbEmail)
    },
    {},
    {}
  )}</div></label> <div class="flex flex-col"><small class="ms-3 text-surface-300">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 이메일은 비밀번호 분실시 인증수단입니다.</small> <small class="ms-3 text-surface-300">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 사용중인 이메일을 입력하세요.</small></div></form> <form class="mb-6"><label class="label"><div class="input-group input-group-divider grid-cols-12"><input type="text" class="col-span-5 s-skbfwBJ_DR9l" placeholder="은행명"${add_attribute("value", mbBank0, 0)}> <input type="number" class="col-span-7 s-skbfwBJ_DR9l" placeholder="은행계좌 (숫자만)"${add_attribute("value", mbBank1, 0)}></div> <div class="input-group input-group-divider grid-cols-12"><input type="text" class="col-span-9 s-skbfwBJ_DR9l" placeholder="계좌주"${add_attribute("value", mbBank2, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-3",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbInfo("mb_bank", mbBank0 + " " + mbBank1 + " " + mbBank2)
    },
    {},
    {}
  )}</div></label></form> <form class="mb-8"><label class="label"><div class="input-group input-group-divider grid-cols-12"><input type="text" class="col-span-9 s-skbfwBJ_DR9l" placeholder="비밀번호 변경"${add_attribute("value", mbPassword, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      addClass: "variant-filled-secondary col-span-3",
      iconNameS: "pen",
      iconNameAlt: "pen",
      onClick: () => setMbInfo("mb_password", mbPassword)
    },
    {},
    {}
  )}</div></label></form> ${validate_component(ItemBox, "ItemBox").$$render($$result, { itemName: "USDT", itemLogo: "coin_usdt" }, {}, {})} </div>`;
});
export {
  Page as default
};
