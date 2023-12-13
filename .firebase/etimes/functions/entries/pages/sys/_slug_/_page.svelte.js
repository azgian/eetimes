import { c as create_ssr_component, d as add_attribute, f as validate_component, h as each, e as escape } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { a as accessApi } from "../../../../chunks/access.js";
import { s as scrollToId } from "../../../../chunks/config.js";
import { g as getToastStore } from "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "th.s-SI1kHV3V4RGg,td.s-SI1kHV3V4RGg{text-align:center;vertical-align:middle}input.s-SI1kHV3V4RGg{text-align:center}@media(max-width: 800.98px){thead.s-SI1kHV3V4RGg{display:none}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let setItemAddClass;
  const toastStore = getToastStore();
  let itName;
  let it_name;
  let itPeriod = "";
  let itRate = "";
  let itId;
  let itWallet = "";
  let bank = "";
  let btnDisabledSetItem = false;
  let showGsSetItem = false;
  let showDelete = false;
  let showBank = false;
  const setItem = async () => {
    if (!itName) {
      const t = {
        message: `아이템 이름은 필수입력입니다.`,
        timeout: 3e3
      };
      toastStore.trigger(t);
      return false;
    }
    btnDisabledSetItem = showGsSetItem = true;
    const params = {
      itId,
      itName,
      it_name,
      itPeriod,
      itWallet,
      bank,
      itRate
    };
    const data = await accessApi("eetimes/setItem", params);
    btnDisabledSetItem = showGsSetItem = false;
    if (data.msg === "success") {
      let messageTxt = itId ? "수정" : "등록";
      const t = {
        message: `아이템이 ${messageTxt}되었습니다.`,
        timeout: 3e3
      };
      toastStore.trigger(t);
      setRefresh();
      getItemList();
    }
  };
  const setRefresh = () => {
    itId = 0;
    itName = "";
    it_name = "";
    itPeriod = "";
    itRate = "";
    itWallet = "";
    bank = "";
    btnDisabledSetItem = showGsSetItem = showDelete = showBank = false;
  };
  let itemList = [];
  const getItemList = async () => {
    const data = await accessApi("eetimes/getItemList");
    itemList = data;
  };
  getItemList();
  const updateItem = (_itId, _itName, _it_name, _itWallet, _bank, _itPeriod, _itRate) => {
    itId = _itId;
    itName = _itName;
    it_name = _it_name;
    itWallet = _itWallet;
    bank = _bank;
    itPeriod = _itPeriod;
    itRate = _itRate;
    showDelete = true;
    scrollToId("container-wrap");
    if (itName === "KRW")
      showBank = true;
    else
      showBank = false;
  };
  const deleteItem = async (itId2) => {
    if (!confirm("삭제하시겠습니까?"))
      return false;
    const params = { itId: itId2 };
    const data = await accessApi("eetimes/deleteItem", params);
    if (data.msg === "success") {
      const t = {
        message: `아이템이 삭제되었습니다.`,
        timeout: 3e3
      };
      toastStore.trigger(t);
      getItemList();
      setRefresh();
    }
  };
  $$result.css.add(css);
  setItemAddClass = showDelete ? "variant-filled-primary" : "variant-filled-secondary";
  return `<div><form><input type="hidden" class="s-SI1kHV3V4RGg"${add_attribute("value", itId, 0)}> <div class="grid-cols-10 mb-2 input-group input-group-divider"><input class="col-span-5 s-SI1kHV3V4RGg" type="text" placeholder="아이템 이름"${add_attribute("value", itName, 0)}> <input class="col-span-5 s-SI1kHV3V4RGg" type="text" placeholder="한글 이름"${add_attribute("value", it_name, 0)}></div> ${showBank ? `<input class="mb-2 input s-SI1kHV3V4RGg" type="text" placeholder="은행계좌"${add_attribute("value", bank, 0)}>` : `<input class="mb-2 input s-SI1kHV3V4RGg" type="text" placeholder="아이템 지갑주소"${add_attribute("value", itWallet, 0)}>`} <div class="grid-cols-10 mb-2 input-group input-group-divider"><input type="number" placeholder="보상율(%) / 1day" class="col-span-5 s-SI1kHV3V4RGg"${add_attribute("value", itRate, 0)}> <input type="number" placeholder="기간 (day)" class="col-span-5 s-SI1kHV3V4RGg" required${add_attribute("value", itPeriod, 0)}></div> <div class="flex justify-between mt-2"><div>${showDelete ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: "variant-filled-error",
      iconNameS: "trash",
      btnText: "삭제",
      onClick: () => deleteItem(itId)
    },
    {},
    {}
  )}` : ``}</div> <div class="flex justify-end">${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: "variant-filled-surface btn-icon me-4",
      iconNameS: "refresh",
      onClick: setRefresh
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      onClick: setItem,
      addClass: setItemAddClass,
      showAlt: showDelete,
      btnText: "등록",
      btnTextAlt: "수정",
      iconNameS: "upload",
      iconNameAlt: "upload",
      btnDisabled: btnDisabledSetItem,
      showGs: showGsSetItem
    },
    {},
    {}
  )}</div></div></form> <div class="mt-6 table-container"><table class="table table-hover"><thead class="s-SI1kHV3V4RGg"><tr><th class="s-SI1kHV3V4RGg" data-svelte-h="svelte-k2b4ai">아이템</th> <th class="s-SI1kHV3V4RGg">지갑주소<br>은행계좌</th> <th class="s-SI1kHV3V4RGg" data-svelte-h="svelte-156skjy">보상율 / 기간</th> <th class="s-SI1kHV3V4RGg"></th></tr></thead> <tbody>${each(itemList, (item) => {
    return `${item.it_name ? `<tr><td class="s-SI1kHV3V4RGg">${escape(item.it_name)}<br>${escape(item._it_name)}</td> <td class="s-SI1kHV3V4RGg">${escape(item.it_name === "USDT" ? item.it_wallet : "")} ${escape(item.it_name === "KRW" ? item.bank : "")}</td> <td class="s-SI1kHV3V4RGg">${escape(item.it_rate * 1)}<br>${escape(item.it_period)}</td> <td class="s-SI1kHV3V4RGg">${validate_component(Button, "Button").$$render(
      $$result,
      {
        addClass: "btn-icon btn-icon-sm",
        iconNameS: "cog",
        onClick: () => updateItem(item.it_id, item.it_name, item._it_name, item.it_wallet, item.bank, item.it_period, item.it_rate)
      },
      {},
      {}
    )}</td> </tr>` : ``}`;
  })}</tbody></table></div> </div>`;
});
export {
  Page as default
};
