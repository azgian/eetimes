import { c as create_ssr_component, e as escape } from "./ssr.js";
const IconXi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { iconName } = $$props;
  let { addClass = "" } = $$props;
  let { fontSize = "1rem" } = $$props;
  if ($$props.iconName === void 0 && $$bindings.iconName && iconName !== void 0)
    $$bindings.iconName(iconName);
  if ($$props.addClass === void 0 && $$bindings.addClass && addClass !== void 0)
    $$bindings.addClass(addClass);
  if ($$props.fontSize === void 0 && $$bindings.fontSize && fontSize !== void 0)
    $$bindings.fontSize(fontSize);
  return `<i class="${"xi xi-" + escape(iconName, true) + " " + escape(addClass, true)}" style="${"font-size:" + escape(fontSize, true) + ";"}"></i>`;
});
export {
  IconXi as I
};
