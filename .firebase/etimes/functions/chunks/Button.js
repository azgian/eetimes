import { c as create_ssr_component, e as escape, d as add_attribute, f as validate_component } from "./ssr.js";
import { I as IconXi } from "./IconXi.js";
const GoogleSpin_svelte_svelte_type_style_lang = "";
const css = {
  code: ".s-qcTugh9EuXsq{overflow:hidden;position:relative;text-indent:-9999px;display:inline-block;background:#f86;border-radius:50%;transform:rotateZ(90deg);transform-origin:50% 50%;animation:s-qcTugh9EuXsq-plus-loader-background var(--duration) infinite ease-in-out}.s-qcTugh9EuXsq::after{background:#f86;border-radius:50% 0 0 50%;content:'';position:absolute;right:50%;top:0;width:50%;height:100%;transform-origin:100% 50%;animation:s-qcTugh9EuXsq-plus-loader-top var(--duration) infinite linear}.s-qcTugh9EuXsq::before{background:#fc6;border-radius:50% 0 0 50%;content:'';position:absolute;right:50%;top:0;width:50%;height:100%;transform-origin:100% 50%;animation:s-qcTugh9EuXsq-plus-loader-bottom var(--duration) infinite linear}.pause-animation.s-qcTugh9EuXsq,.pause-animation.s-qcTugh9EuXsq::before,.pause-animation.s-qcTugh9EuXsq::after{animation-play-state:paused}@keyframes s-qcTugh9EuXsq-plus-loader-top{2.5%{background:#f86;transform:rotateY(0deg);animation-timing-function:ease-in}13.75%{background:#ff430d;transform:rotateY(90deg);animation-timing-function:step-start}13.76%{background:#ffae0d;transform:rotateY(90deg);animation-timing-function:ease-out}25%{background:#fc6;transform:rotateY(180deg)}27.5%{background:#fc6;transform:rotateY(180deg);animation-timing-function:ease-in}41.25%{background:#ffae0d;transform:rotateY(90deg);animation-timing-function:step-start}41.26%{background:#2cc642;transform:rotateY(90deg);animation-timing-function:ease-out}50%{background:#6d7;transform:rotateY(0deg)}52.5%{background:#6d7;transform:rotateY(0deg);animation-timing-function:ease-in}63.75%{background:#2cc642;transform:rotateY(90deg);animation-timing-function:step-start}63.76%{background:#1386d2;transform:rotateY(90deg);animation-timing-function:ease-out}75%{background:#4ae;transform:rotateY(180deg)}77.5%{background:#4ae;transform:rotateY(180deg);animation-timing-function:ease-in}91.25%{background:#1386d2;transform:rotateY(90deg);animation-timing-function:step-start}91.26%{background:#ff430d;transform:rotateY(90deg);animation-timing-function:ease-in}100%{background:#f86;transform:rotateY(0deg);animation-timing-function:step-start}}@keyframes s-qcTugh9EuXsq-plus-loader-bottom{0%{background:#fc6;animation-timing-function:step-start}50%{background:#fc6;animation-timing-function:step-start}75%{background:#4ae;animation-timing-function:step-start}100%{background:#4ae;animation-timing-function:step-start}}@keyframes s-qcTugh9EuXsq-plus-loader-background{0%{background:#f86;transform:rotateZ(180deg)}25%{background:#f86;transform:rotateZ(180deg);animation-timing-function:step-start}27.5%{background:#6d7;transform:rotateZ(90deg)}50%{background:#6d7;transform:rotateZ(90deg);animation-timing-function:step-start}52.5%{background:#6d7;transform:rotateZ(0deg)}75%{background:#6d7;transform:rotateZ(0deg);animation-timing-function:step-start}77.5%{background:#f86;transform:rotateZ(270deg)}100%{background:#f86;transform:rotateZ(270deg);animation-timing-function:step-start}}",
  map: null
};
const GoogleSpin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let styles;
  let { size = "40px" } = $$props;
  let { duration = "3s" } = $$props;
  let { pause = false } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  $$result.css.add(css);
  styles = [`width: ${size}`, `height: ${size}`].join(";");
  return `<div class="${["spinner spinner--google s-qcTugh9EuXsq", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"--duration: " + escape(duration, true) + "; " + escape(styles, true)}"></div>`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { btnClass = "btn" } = $$props;
  let { addClass = "" } = $$props;
  let { btnText = "" } = $$props;
  let { btnTextAlt = "" } = $$props;
  let { gsSize = "1.5rem" } = $$props;
  let { showGs = false } = $$props;
  let { iconNameS = "" } = $$props;
  let { iconNameE = "" } = $$props;
  let { iconNameAlt = "" } = $$props;
  let { showAlt = false } = $$props;
  let { btnDisabled = false } = $$props;
  let { btnType = "button" } = $$props;
  let { onClick } = $$props;
  const actClick = () => {
    if (btnTextAlt)
      showAlt = !showAlt;
    if (onClick)
      onClick();
  };
  if ($$props.btnClass === void 0 && $$bindings.btnClass && btnClass !== void 0)
    $$bindings.btnClass(btnClass);
  if ($$props.addClass === void 0 && $$bindings.addClass && addClass !== void 0)
    $$bindings.addClass(addClass);
  if ($$props.btnText === void 0 && $$bindings.btnText && btnText !== void 0)
    $$bindings.btnText(btnText);
  if ($$props.btnTextAlt === void 0 && $$bindings.btnTextAlt && btnTextAlt !== void 0)
    $$bindings.btnTextAlt(btnTextAlt);
  if ($$props.gsSize === void 0 && $$bindings.gsSize && gsSize !== void 0)
    $$bindings.gsSize(gsSize);
  if ($$props.showGs === void 0 && $$bindings.showGs && showGs !== void 0)
    $$bindings.showGs(showGs);
  if ($$props.iconNameS === void 0 && $$bindings.iconNameS && iconNameS !== void 0)
    $$bindings.iconNameS(iconNameS);
  if ($$props.iconNameE === void 0 && $$bindings.iconNameE && iconNameE !== void 0)
    $$bindings.iconNameE(iconNameE);
  if ($$props.iconNameAlt === void 0 && $$bindings.iconNameAlt && iconNameAlt !== void 0)
    $$bindings.iconNameAlt(iconNameAlt);
  if ($$props.showAlt === void 0 && $$bindings.showAlt && showAlt !== void 0)
    $$bindings.showAlt(showAlt);
  if ($$props.btnDisabled === void 0 && $$bindings.btnDisabled && btnDisabled !== void 0)
    $$bindings.btnDisabled(btnDisabled);
  if ($$props.btnType === void 0 && $$bindings.btnType && btnType !== void 0)
    $$bindings.btnType(btnType);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  if ($$props.actClick === void 0 && $$bindings.actClick && actClick !== void 0)
    $$bindings.actClick(actClick);
  return `<button class="${escape(btnClass, true) + " " + escape(addClass, true)}"${add_attribute("type", btnType, 0)} ${btnDisabled ? "disabled" : ""}>${showGs ? `${validate_component(GoogleSpin, "GoogleSpin").$$render($$result, { size: gsSize }, {}, {})}` : ``} ${iconNameS ? `${!showAlt ? `${validate_component(IconXi, "IconXi").$$render($$result, { iconName: iconNameS, addClass: "m2-2" }, {}, {})}` : `${validate_component(IconXi, "IconXi").$$render($$result, { iconName: iconNameAlt, addClass: "m2-2" }, {}, {})}`}` : ``} ${btnText ? `<span class="mx-2">${!showAlt ? `${escape(btnText)}` : `${escape(btnTextAlt)}`}</span>` : ``} ${iconNameE ? `${!showAlt ? `${validate_component(IconXi, "IconXi").$$render($$result, { iconName: iconNameE }, {}, {})}` : `${validate_component(IconXi, "IconXi").$$render($$result, { iconName: iconNameAlt }, {}, {})}`}` : ``}</button>`;
});
export {
  Button as B
};
