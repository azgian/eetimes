import { i as setContext, j as split_css_unit, c as create_ssr_component, e as escape, d as add_attribute, k as compute_slots, l as add_styles, v as validate_store, s as subscribe, h as each, f as validate_component, o as null_to_empty } from "../../chunks/ssr.js";
import { m as mb, i as isLoggedIn } from "../../chunks/store.js";
import { w as writable } from "../../chunks/index.js";
import { i as initializeToastStore, p as prefersReducedMotionStore, g as getToastStore } from "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
import { l as lvNameElm, g as goto, d as sys7Lv } from "../../chunks/config.js";
import { I as IconXi } from "../../chunks/IconXi.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const storePopup = writable(void 0);
const DRAWER_STORE_KEY = "drawerStore";
function initializeDrawerStore() {
  const drawerStore = drawerService();
  return setContext(DRAWER_STORE_KEY, drawerStore);
}
function drawerService() {
  const { subscribe: subscribe2, set, update } = writable({});
  return {
    subscribe: subscribe2,
    set,
    update,
    /** Open the drawer. */
    open: (newSettings) => update(() => {
      return { open: true, ...newSettings };
    }),
    /** Close the drawer. */
    close: () => update((d) => {
      d.open = false;
      return d;
    })
  };
}
const MODAL_STORE_KEY = "modalStore";
function initializeModalStore() {
  const modalStore = modalService();
  return setContext(MODAL_STORE_KEY, modalStore);
}
function modalService() {
  const { subscribe: subscribe2, set, update } = writable([]);
  return {
    subscribe: subscribe2,
    set,
    update,
    /** Append to end of queue. */
    trigger: (modal) => update((mStore) => {
      mStore.push(modal);
      return mStore;
    }),
    /**  Remove first item in queue. */
    close: () => update((mStore) => {
      if (mStore.length > 0)
        mStore.shift();
      return mStore;
    }),
    /** Remove all items from queue. */
    clear: () => set([])
  };
}
function initializeStores() {
  initializeModalStore();
  initializeToastStore();
  initializeDrawerStore();
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [xValue, xUnit] = split_css_unit(x);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u}`
  };
}
const cBase = "flex flex-col";
const cRowMain = "grid items-center";
const cRowHeadline = "";
const cSlotLead = "flex-none flex justify-between items-center";
const cSlotDefault = "flex-auto";
const cSlotTrail = "flex-none flex items-center space-x-4";
const AppBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesRowMain;
  let classesRowHeadline;
  let classesSlotLead;
  let classesSlotDefault;
  let classesSlotTrail;
  let $$slots = compute_slots(slots);
  let { background = "bg-surface-100-800-token" } = $$props;
  let { border = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { shadow = "" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { gridColumns = "grid-cols-[auto_1fr_auto]" } = $$props;
  let { gap = "gap-4" } = $$props;
  let { regionRowMain = "" } = $$props;
  let { regionRowHeadline = "" } = $$props;
  let { slotLead = "" } = $$props;
  let { slotDefault = "" } = $$props;
  let { slotTrail = "" } = $$props;
  let { label = "" } = $$props;
  let { labelledby = "" } = $$props;
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.gridColumns === void 0 && $$bindings.gridColumns && gridColumns !== void 0)
    $$bindings.gridColumns(gridColumns);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.regionRowMain === void 0 && $$bindings.regionRowMain && regionRowMain !== void 0)
    $$bindings.regionRowMain(regionRowMain);
  if ($$props.regionRowHeadline === void 0 && $$bindings.regionRowHeadline && regionRowHeadline !== void 0)
    $$bindings.regionRowHeadline(regionRowHeadline);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0)
    $$bindings.slotLead(slotLead);
  if ($$props.slotDefault === void 0 && $$bindings.slotDefault && slotDefault !== void 0)
    $$bindings.slotDefault(slotDefault);
  if ($$props.slotTrail === void 0 && $$bindings.slotTrail && slotTrail !== void 0)
    $$bindings.slotTrail(slotTrail);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  classesBase = `${cBase} ${background} ${border} ${spacing} ${padding} ${shadow} ${$$props.class ?? ""}`;
  classesRowMain = `${cRowMain} ${gridColumns} ${gap} ${regionRowMain}`;
  classesRowHeadline = `${cRowHeadline} ${regionRowHeadline}`;
  classesSlotLead = `${cSlotLead} ${slotLead}`;
  classesSlotDefault = `${cSlotDefault} ${slotDefault}`;
  classesSlotTrail = `${cSlotTrail} ${slotTrail}`;
  return `<div class="${"app-bar " + escape(classesBase, true)}" data-testid="app-bar" role="toolbar"${add_attribute("aria-label", label, 0)}${add_attribute("aria-labelledby", labelledby, 0)}> <div class="${"app-bar-row-main " + escape(classesRowMain, true)}"> ${$$slots.lead ? `<div class="${"app-bar-slot-lead " + escape(classesSlotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="${"app-bar-slot-default " + escape(classesSlotDefault, true)}">${slots.default ? slots.default({}) : ``}</div>  ${$$slots.trail ? `<div class="${"app-bar-slot-trail " + escape(classesSlotTrail, true)}">${slots.trail ? slots.trail({}) : ``}</div>` : ``}</div>  ${$$slots.headline ? `<div class="${"app-bar-row-headline " + escape(classesRowHeadline, true)}">${slots.headline ? slots.headline({}) : ``}</div>` : ``}</div>`;
});
const cBaseAppShell = "w-full h-full flex flex-col overflow-hidden";
const cContentArea = "w-full h-full flex overflow-hidden";
const cPage = "flex-1 overflow-x-hidden flex flex-col";
const cSidebarLeft = "flex-none overflow-x-hidden overflow-y-auto";
const cSidebarRight = "flex-none overflow-x-hidden overflow-y-auto";
const AppShell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesHeader;
  let classesSidebarLeft;
  let classesSidebarRight;
  let classesPageHeader;
  let classesPageContent;
  let classesPageFooter;
  let classesFooter;
  let $$slots = compute_slots(slots);
  let { scrollbarGutter = "auto" } = $$props;
  let { regionPage = "" } = $$props;
  let { slotHeader = "z-10" } = $$props;
  let { slotSidebarLeft = "w-auto" } = $$props;
  let { slotSidebarRight = "w-auto" } = $$props;
  let { slotPageHeader = "" } = $$props;
  let { slotPageContent = "" } = $$props;
  let { slotPageFooter = "" } = $$props;
  let { slotFooter = "" } = $$props;
  if ($$props.scrollbarGutter === void 0 && $$bindings.scrollbarGutter && scrollbarGutter !== void 0)
    $$bindings.scrollbarGutter(scrollbarGutter);
  if ($$props.regionPage === void 0 && $$bindings.regionPage && regionPage !== void 0)
    $$bindings.regionPage(regionPage);
  if ($$props.slotHeader === void 0 && $$bindings.slotHeader && slotHeader !== void 0)
    $$bindings.slotHeader(slotHeader);
  if ($$props.slotSidebarLeft === void 0 && $$bindings.slotSidebarLeft && slotSidebarLeft !== void 0)
    $$bindings.slotSidebarLeft(slotSidebarLeft);
  if ($$props.slotSidebarRight === void 0 && $$bindings.slotSidebarRight && slotSidebarRight !== void 0)
    $$bindings.slotSidebarRight(slotSidebarRight);
  if ($$props.slotPageHeader === void 0 && $$bindings.slotPageHeader && slotPageHeader !== void 0)
    $$bindings.slotPageHeader(slotPageHeader);
  if ($$props.slotPageContent === void 0 && $$bindings.slotPageContent && slotPageContent !== void 0)
    $$bindings.slotPageContent(slotPageContent);
  if ($$props.slotPageFooter === void 0 && $$bindings.slotPageFooter && slotPageFooter !== void 0)
    $$bindings.slotPageFooter(slotPageFooter);
  if ($$props.slotFooter === void 0 && $$bindings.slotFooter && slotFooter !== void 0)
    $$bindings.slotFooter(slotFooter);
  classesBase = `${cBaseAppShell} ${$$props.class ?? ""}`;
  classesHeader = `${slotHeader}`;
  classesSidebarLeft = `${cSidebarLeft} ${slotSidebarLeft}`;
  classesSidebarRight = `${cSidebarRight} ${slotSidebarRight}`;
  classesPageHeader = `${slotPageHeader}`;
  classesPageContent = `${slotPageContent}`;
  classesPageFooter = `${slotPageFooter}`;
  classesFooter = `${slotFooter}`;
  return `<div id="appShell"${add_attribute("class", classesBase, 0)} data-testid="app-shell"> ${$$slots.header ? `<header id="shell-header" class="${"flex-none " + escape(classesHeader, true)}">${slots.header ? slots.header({}) : ``}</header>` : ``}  <div class="${"flex-auto " + escape(cContentArea, true)}"> ${$$slots.sidebarLeft ? `<aside id="sidebar-left"${add_attribute("class", classesSidebarLeft, 0)}>${slots.sidebarLeft ? slots.sidebarLeft({}) : ``}</aside>` : ``}  <div id="page" class="${escape(regionPage, true) + " " + escape(cPage, true)}"${add_styles({ "scrollbar-gutter": scrollbarGutter })}> ${$$slots.pageHeader ? `<header id="page-header" class="${"flex-none " + escape(classesPageHeader, true)}">${slots.pageHeader ? slots.pageHeader({}) : `(slot:header)`}</header>` : ``}  <main id="page-content" class="${"flex-auto " + escape(classesPageContent, true)}">${slots.default ? slots.default({}) : ``}</main>  ${$$slots.pageFooter ? `<footer id="page-footer" class="${"flex-none " + escape(classesPageFooter, true)}">${slots.pageFooter ? slots.pageFooter({}) : `(slot:footer)`}</footer>` : ``}</div>  ${$$slots.sidebarRight ? `<aside id="sidebar-right"${add_attribute("class", classesSidebarRight, 0)}>${slots.sidebarRight ? slots.sidebarRight({}) : ``}</aside>` : ``}</div>  ${$$slots.footer ? `<footer id="shell-footer" class="${"flex-none " + escape(classesFooter, true)}">${slots.footer ? slots.footer({}) : ``}</footer>` : ``}</div>`;
});
const cWrapper = "flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none";
const cSnackbar = "flex flex-col gap-y-2";
const cToast = "flex justify-between items-center pointer-events-auto";
const cToastActions = "flex items-center space-x-2";
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesWrapper;
  let classesSnackbar;
  let classesToast;
  let filteredToasts;
  let $toastStore, $$unsubscribe_toastStore;
  let $prefersReducedMotionStore, $$unsubscribe_prefersReducedMotionStore;
  validate_store(prefersReducedMotionStore, "prefersReducedMotionStore");
  $$unsubscribe_prefersReducedMotionStore = subscribe(prefersReducedMotionStore, (value) => $prefersReducedMotionStore = value);
  const toastStore = getToastStore();
  validate_store(toastStore, "toastStore");
  $$unsubscribe_toastStore = subscribe(toastStore, (value) => $toastStore = value);
  let { position = "b" } = $$props;
  let { max = 3 } = $$props;
  let { background = "variant-filled-secondary" } = $$props;
  let { width = "max-w-[640px]" } = $$props;
  let { color = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-x-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-lg" } = $$props;
  let { zIndex = "z-[888]" } = $$props;
  let { buttonAction = "btn variant-filled" } = $$props;
  let { buttonDismiss = "btn-icon btn-icon-sm variant-filled" } = $$props;
  let { buttonDismissLabel = "✕" } = $$props;
  let { transitions = !$prefersReducedMotionStore } = $$props;
  let { transitionIn = fly } = $$props;
  let { transitionInParams = { duration: 250 } } = $$props;
  let { transitionOut = fly } = $$props;
  let { transitionOutParams = { duration: 250 } } = $$props;
  let cPosition;
  let cAlign;
  switch (position) {
    case "t":
      cPosition = "justify-center items-start";
      cAlign = "items-center";
      break;
    case "b":
      cPosition = "justify-center items-end";
      cAlign = "items-center";
      break;
    case "l":
      cPosition = "justify-start items-center";
      cAlign = "items-start";
      break;
    case "r":
      cPosition = "justify-end items-center";
      cAlign = "items-end";
      break;
    case "tl":
      cPosition = "justify-start items-start";
      cAlign = "items-start";
      break;
    case "tr":
      cPosition = "justify-end items-start";
      cAlign = "items-end";
      break;
    case "bl":
      cPosition = "justify-start items-end";
      cAlign = "items-start";
      break;
    case "br":
      cPosition = "justify-end items-end";
      cAlign = "items-end";
      break;
  }
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.buttonAction === void 0 && $$bindings.buttonAction && buttonAction !== void 0)
    $$bindings.buttonAction(buttonAction);
  if ($$props.buttonDismiss === void 0 && $$bindings.buttonDismiss && buttonDismiss !== void 0)
    $$bindings.buttonDismiss(buttonDismiss);
  if ($$props.buttonDismissLabel === void 0 && $$bindings.buttonDismissLabel && buttonDismissLabel !== void 0)
    $$bindings.buttonDismissLabel(buttonDismissLabel);
  if ($$props.transitions === void 0 && $$bindings.transitions && transitions !== void 0)
    $$bindings.transitions(transitions);
  if ($$props.transitionIn === void 0 && $$bindings.transitionIn && transitionIn !== void 0)
    $$bindings.transitionIn(transitionIn);
  if ($$props.transitionInParams === void 0 && $$bindings.transitionInParams && transitionInParams !== void 0)
    $$bindings.transitionInParams(transitionInParams);
  if ($$props.transitionOut === void 0 && $$bindings.transitionOut && transitionOut !== void 0)
    $$bindings.transitionOut(transitionOut);
  if ($$props.transitionOutParams === void 0 && $$bindings.transitionOutParams && transitionOutParams !== void 0)
    $$bindings.transitionOutParams(transitionOutParams);
  classesWrapper = `${cWrapper} ${cPosition} ${zIndex} ${$$props.class || ""}`;
  classesSnackbar = `${cSnackbar} ${cAlign} ${padding}`;
  classesToast = `${cToast} ${width} ${color} ${padding} ${spacing} ${rounded} ${shadow}`;
  filteredToasts = Array.from($toastStore).slice(0, max);
  $$unsubscribe_toastStore();
  $$unsubscribe_prefersReducedMotionStore();
  return `${$toastStore.length ? ` <div class="${"snackbar-wrapper " + escape(classesWrapper, true)}" data-testid="snackbar-wrapper"> <div class="${"snackbar " + escape(classesSnackbar, true)}">${each(filteredToasts, (t, i) => {
    return `<div${add_attribute("role", t.hideDismiss ? "alert" : "alertdialog", 0)} aria-live="polite"> <div class="${"toast " + escape(classesToast, true) + " " + escape(t.background ?? background, true) + " " + escape(t.classes ?? "", true)}" data-testid="toast"><div class="text-base"><!-- HTML_TAG_START -->${t.message}<!-- HTML_TAG_END --></div> ${t.action || !t.hideDismiss ? `<div class="${"toast-actions " + escape(cToastActions, true)}">${t.action ? `<button${add_attribute("class", buttonAction, 0)}><!-- HTML_TAG_START -->${t.action.label}<!-- HTML_TAG_END --></button>` : ``} ${!t.hideDismiss ? `<button${add_attribute("class", buttonDismiss, 0)} aria-label="Dismiss toast">${escape(buttonDismissLabel)}</button>` : ``} </div>` : ``}</div> </div>`;
  })}</div></div>` : ``}`;
});
const TopBar_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "#logo-box.s-1A9ZzL5WMUXo.s-1A9ZzL5WMUXo{width:310px}#logo-box.s-1A9ZzL5WMUXo img.s-1A9ZzL5WMUXo{width:60px;border-radius:25%}#user-box.s-1A9ZzL5WMUXo.s-1A9ZzL5WMUXo{font-size:2rem;width:400px}#user-box.s-1A9ZzL5WMUXo .user-name.s-1A9ZzL5WMUXo{margin-left:10px;font-size:0.95rem}#user-box.s-1A9ZzL5WMUXo .user-level.s-1A9ZzL5WMUXo{margin-left:5px;font-size:1rem}@media(max-width: 400.98px){#user-box.s-1A9ZzL5WMUXo.s-1A9ZzL5WMUXo{max-width:400px}}@media(max-width: 1020.98px){#logo-box.s-1A9ZzL5WMUXo.s-1A9ZzL5WMUXo{display:none}}",
  map: null
};
const TopBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  $$result.css.add(css$3);
  $$unsubscribe_mb();
  return `<div class="flex justify-between"><a href="/"><div id="logo-box" class="flex justify-center s-1A9ZzL5WMUXo"><img src="/images/logo.png" alt="logo" class="s-1A9ZzL5WMUXo"></div></a> <div id="user-box" class="flex flex-col justify-center s-1A9ZzL5WMUXo"><div class="flex items-center justify-start mb-1">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "profile", fontSize: "35px" }, {}, {})} <span class="user-name s-1A9ZzL5WMUXo">${escape($mb?.mb_name ? $mb?.mb_name : "")}</span> <span class="user-level s-1A9ZzL5WMUXo"><!-- HTML_TAG_START -->${$mb?.mb_level ? lvNameElm(Number($mb?.mb_level)) : ""}<!-- HTML_TAG_END --></span></div></div> </div>`;
});
const LogoutTimer_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "#logout-box.s-Pbd9-qLcHRdz{font-size:1.5rem;display:flex;align-items:center}#btnTimer.s-Pbd9-qLcHRdz{display:flex;align-items:center}.timer.s-Pbd9-qLcHRdz{font-size:1.25rem;margin-left:5px}#btnIconLogout.s-Pbd9-qLcHRdz{margin-left:10px}.icon-logout.s-Pbd9-qLcHRdz{min-width:40px;max-width:40px}",
  map: null
};
const logoutLimitedTime = 600;
const LogoutTimer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const toastStore = getToastStore();
  let logoutTime = logoutLimitedTime;
  const setLogoutTimer = (time) => {
    if (time < 1)
      setLogout();
    if (time === 60 || time === 30 || time === 10) {
      const t = {
        message: `${time}초 후 로그아웃 됩니다.<br>
                로그인 시간을 연장하시려면 [시간 연장] 버튼을 클릭하세요.`,
        timeout: 5e3,
        action: {
          label: "시간 연장",
          response: () => timerReset()
        }
      };
      toastStore.trigger(t);
    }
    let min, _min, sec, _sec;
    min = parseInt(String(time / 60));
    sec = time % 60;
    _min = min > 9 ? min : String("0" + min);
    _sec = sec > 9 ? sec : String("0" + sec);
    return _min + ":" + _sec;
  };
  let logoutTimer;
  const timerReset = () => {
    logoutTime = logoutLimitedTime;
  };
  const setLogout = () => {
    clearInterval(logoutTimer);
    isLoggedIn.set(false);
    goto("/login");
  };
  $$result.css.add(css$2);
  return `<div id="logout-box" class="s-Pbd9-qLcHRdz"><button id="btnTimer" class="s-Pbd9-qLcHRdz">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "time" }, {}, {})} <span class="timer s-Pbd9-qLcHRdz">${escape(setLogoutTimer(logoutTime))}</span></button> <button id="btnIconLogout" class="s-Pbd9-qLcHRdz"><img src="./images/icon_logout.png" class="icon-logout s-Pbd9-qLcHRdz" alt="logout"></button> </div>`;
});
const menuBox_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "#menu-wrap.s-9sS_fX8PNv9F.s-9sS_fX8PNv9F{position:fixed;top:0px;left:0px;display:flex;flex-direction:column;align-items:end;width:320px;height:100vh;background:#151547;z-index:9;padding-top:95px}#menu-box.s-9sS_fX8PNv9F.s-9sS_fX8PNv9F{width:220px}#menu-box.s-9sS_fX8PNv9F a.s-9sS_fX8PNv9F{text-decoration:none}#menu-box.s-9sS_fX8PNv9F li.s-9sS_fX8PNv9F{position:relative;list-style-type:none;height:50px;line-height:50px;padding-right:15px;text-align:right;border-radius:25px 0 0 25px;color:#60cdf8;display:flex;justify-content:space-between;align-items:center;padding-left:15px;font-size:1.5rem}#menu-box.s-9sS_fX8PNv9F li.s-9sS_fX8PNv9F:hover{text-decoration:none;background:rgba(73, 73, 245, 0.3)}#menu-box.s-9sS_fX8PNv9F li.current.s-9sS_fX8PNv9F{background:rgba(73, 73, 245, 0.8);color:#151547}@media(max-width: 1020.98px){#menu-wrap.s-9sS_fX8PNv9F.s-9sS_fX8PNv9F{position:fixed;left:0px;bottom:0px;top:auto;width:100%;height:60px;padding-top:0}#menu-box.s-9sS_fX8PNv9F.s-9sS_fX8PNv9F{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;height:100%}#menu-box.s-9sS_fX8PNv9F a.s-9sS_fX8PNv9F{flex-grow:1;height:100%}#menu-box.s-9sS_fX8PNv9F li.s-9sS_fX8PNv9F{height:100%;line-height:10%;text-align:center;border-radius:0;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:0.75rem}#menu-box.s-9sS_fX8PNv9F li .menuName.s-9sS_fX8PNv9F{position:absolute;bottom:8px;left:0px;width:100%;text-align:center}}@media(max-width: 300px){.menuName.s-9sS_fX8PNv9F.s-9sS_fX8PNv9F{visibility:hidden}}",
  map: null
};
const MenuBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mb, $$unsubscribe_mb;
  let $page, $$unsubscribe_page;
  validate_store(mb, "mb");
  $$unsubscribe_mb = subscribe(mb, (value) => $mb = value);
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const menuList = [
    {
      slug: "home",
      name: "Home",
      icon: "home",
      lv: 2
    },
    // { slug: 'news', name: 'News', icon: 'paper-o', lv: 2 },
    {
      slug: "staking",
      name: "Staking",
      icon: "server",
      lv: 2
    },
    {
      slug: "myInfo",
      name: "MyInfo",
      icon: "user-o",
      lv: 2
    },
    {
      slug: "sys",
      name: "Sys",
      icon: "cog",
      lv: sys7Lv
    }
  ];
  $$result.css.add(css$1);
  $$unsubscribe_mb();
  $$unsubscribe_page();
  return `<div id="menu-wrap" class="s-9sS_fX8PNv9F"><nav id="menu-box" class="s-9sS_fX8PNv9F">${each(menuList, (siteMenu, i) => {
    return `${$mb && $mb.mb_level >= siteMenu.lv ? `<a href="${"/" + escape(i === 0 ? "" : siteMenu.slug, true)}" class="s-9sS_fX8PNv9F"><li class="${escape(
      null_to_empty(i === 0 && $page.url.pathname === "/" || $page.url.pathname.startsWith("/" + siteMenu.slug) ? "current" : void 0),
      true
    ) + " s-9sS_fX8PNv9F"}">${validate_component(IconXi, "IconXi").$$render(
      $$result,
      {
        iconName: siteMenu.icon,
        fontSize: "30px"
      },
      {},
      {}
    )} <div class="menuName s-9sS_fX8PNv9F">${escape(siteMenu.name)} </div></li> </a>` : ``}`;
  })}</nav> </div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".paddingLeft320.s-7IPF32Wcq3s8{padding-left:320px}#container-wrap.s-7IPF32Wcq3s8{position:relative;width:100%}#container-box.s-7IPF32Wcq3s8{position:relative;max-width:800px;width:100%;height:100%;padding:15px;padding-bottom:50px;margin:0 auto}@media(max-width: 1020.98px){.paddingLeft320.s-7IPF32Wcq3s8{padding-left:0px}#container-box.s-7IPF32Wcq3s8{padding-bottom:100px}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $isLoggedIn, $$unsubscribe_isLoggedIn;
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => value);
  validate_store(isLoggedIn, "isLoggedIn");
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => $isLoggedIn = value);
  storePopup.set({
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow
  });
  initializeStores();
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_isLoggedIn();
  return `${validate_component(Toast, "Toast").$$render($$result, { position: "t" }, {}, {})} ${validate_component(AppShell, "AppShell").$$render(
    $$result,
    {
      regionPage: "relative",
      slotPageHeader: "sticky top-0 z-10",
      slotSidebarLeft: "bg-surface-900",
      slotPageFooter: "bg-surface-900 z-10"
    },
    {},
    {
      pageHeader: () => {
        return `${$isLoggedIn ? `${validate_component(AppBar, "AppBar").$$render(
          $$result,
          {
            gridColumns: "grid-cols-3",
            slotDefault: "place-self-center",
            slotTrail: "place-content-end"
          },
          {},
          {
            trail: () => {
              return `${$isLoggedIn ? `${validate_component(LogoutTimer, "LogoutTimer").$$render($$result, {}, {}, {})}` : ``} `;
            },
            lead: () => {
              return `${validate_component(TopBar, "TopBar").$$render($$result, {}, {}, {})}`;
            }
          }
        )}` : ``} `;
      },
      default: () => {
        return `<div class="${escape(null_to_empty($isLoggedIn ? "paddingLeft320" : ""), true) + " s-7IPF32Wcq3s8"}"><div id="container-wrap" class="s-7IPF32Wcq3s8"><div id="container-box" class="s-7IPF32Wcq3s8">${slots.default ? slots.default({}) : ``}</div> </div></div> ${$isLoggedIn ? `${validate_component(MenuBox, "MenuBox").$$render($$result, {}, {}, {})}` : ``}`;
      }
    }
  )}`;
});
export {
  Layout as default
};
