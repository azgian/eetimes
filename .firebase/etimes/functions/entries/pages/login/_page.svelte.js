import { c as create_ssr_component, d as add_attribute, f as validate_component } from "../../../chunks/ssr.js";
import { a as accessApi } from "../../../chunks/access.js";
import { g as getToastStore } from "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { B as Button } from "../../../chunks/Button.js";
import { a as getEmailMatch } from "../../../chunks/config.js";
import { I as IconXi } from "../../../chunks/IconXi.js";
const LoginBox_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{@apply text-surface-300;;font-size:1.5rem}.wrap.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{width:100%;max-width:400px;margin:0 auto}.logo-box.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{margin:50px auto;width:250px;text-align:center}.logo-box.s-j6oxkyFC3LNO img.s-j6oxkyFC3LNO{width:50%;border-radius:25%;margin:0 auto}input.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{text-align:center}span.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{@apply text-surface-300;}#findPw.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{border-radius:5px;margin-top:80px}#prvBox.s-j6oxkyFC3LNO.s-j6oxkyFC3LNO{margin-top:100px}",
  map: null
};
const LoginBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let btnClassAlt;
  let btnTextAlt;
  const toastStore = getToastStore();
  let signId = "";
  let mbPassword = "";
  let isSignUp = false;
  const setSign = async () => {
    {
      {
        const t = {
          message: "입력하지 않은 회원정보가 있습니다.",
          timeout: 1500
        };
        toastStore.trigger(t);
        return false;
      }
    }
  };
  let signEmail = "";
  let sendPw = false;
  let btnDisabledFindPw = false;
  let showGsFindPw = false;
  const findPw = async () => {
    if (!getEmailMatch(signEmail))
      return false;
    const params = { signEmail };
    btnDisabledFindPw = showGsFindPw = true;
    const data = await accessApi("auth/findPw", params);
    if (data.msg === "not_exist_email") {
      const t = {
        message: "등록되지 않은 이메일입니다.",
        timeout: 1500
      };
      toastStore.trigger(t);
      btnDisabledFindPw = showGsFindPw = false;
      return false;
    }
    if (data.msg === "success") {
      const t = {
        message: "임시 비밀번호가 발송되었습니다.",
        timeout: 3e3
      };
      toastStore.trigger(t);
      showGsFindPw = false;
      sendPw = true;
    }
  };
  $$result.css.add(css);
  btnClassAlt = "variant-filled-secondary";
  btnTextAlt = "로그인";
  return `<div><div class="logo-box s-j6oxkyFC3LNO"><img src="/images/logo.png" alt="logo" class="s-j6oxkyFC3LNO"></div> <div class="text-center wrap s-j6oxkyFC3LNO"><form><label class="label"><span class="s-j6oxkyFC3LNO" data-svelte-h="svelte-6mowgv">ID</span> <input class="input s-j6oxkyFC3LNO" type="text" placeholder="아이디 (4자 이상, 영문, 숫자)" pattern="[A-Za-z0-9]+" required${add_attribute("value", signId, 0)}></label> <label class="mt-3 label"><span class="s-j6oxkyFC3LNO" data-svelte-h="svelte-1dpv4tv">PASSWORD</span> <input class="input s-j6oxkyFC3LNO" type="password" placeholder="비밀번호 (6자 이상)" required${add_attribute("value", mbPassword, 0)}> ${``}</label> ${sendPw ? `<small class="mb-3 text-warning-300">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 로그인후 비밀번호를 변경하세요..</small>` : ``} <div class="flex justify-between mt-4"><label class="flex mt-2 space-x-2 items-bottom ms-2"><input class="checkbox s-j6oxkyFC3LNO" type="checkbox"${add_attribute("checked", isSignUp, 1)}> <p data-svelte-h="svelte-19zu7sd">회원가입</p></label> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      addClass: btnClassAlt,
      btnType: "submit",
      btnText: btnTextAlt,
      onClick: setSign
    },
    {},
    {}
  )}</div></form> ${`<div id="findPw" class="px-3 py-5 variant-ghost s-j6oxkyFC3LNO"><form><label class="label"><div class="grid-cols-12 input-group input-group-divider"><input type="email" class="col-span-7 s-j6oxkyFC3LNO" placeholder="가입 이메일"${add_attribute("value", signEmail, 0)}> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      btnType: "submit",
      btnText: "비번 찾기",
      addClass: "variant-filled-warning col-span-5",
      iconNameS: "search",
      onClick: findPw,
      showGs: showGsFindPw,
      btnDisabled: btnDisabledFindPw
    },
    {},
    {}
  )}</div></label> <small class="text-surface-300">${validate_component(IconXi, "IconXi").$$render($$result, { iconName: "info" }, {}, {})} 이메일로 임시 비밀번호를 발송해드립니다.</small></form></div>`} <div id="prvBox" class="s-j6oxkyFC3LNO"><h1 class="s-j6oxkyFC3LNO" data-svelte-h="svelte-l2mcf7">11Times.com</h1> <div class="mt-3 text-surface-400"><a href="/guide" data-svelte-h="svelte-lgqael">개인정보처리방침</a>
				|
				<a href="/guide/termsOfUse" data-svelte-h="svelte-lnc4t">이용약관</a></div></div> <br><br> <div class="m-4 text-center text-surface-300">(주)이클로저 | 대표자: 김세현<br>
			대표번호: 070-8648-1179 | FAX: 0504-388-3911<br>
			대표메일: clozer@kakako.com<br>
			서울 강남구 역삼로19길 29, 3층<br>
			사업자등록번호: 607-87-02019<br>
			통신판매신고번호: 2021-서울강남-01001</div></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(LoginBox, "LoginBox").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
