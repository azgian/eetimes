<script lang="ts">
	import { accessApi } from '$lib/api/access'; //, setMbTolocal
	import { getEmailMatch } from '$lib/config';
	import { dev } from '$app/environment';
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import AlertBox from '$lib/components/AlertBox.svelte';
	import { scale } from 'svelte/transition';
	import { popup, getToastStore } from '@skeletonlabs/skeleton';
	import type { PopupSettings, ToastSettings } from '@skeletonlabs/skeleton';
	import { isLoggedIn, mb } from '$lib/api/store';
	const toastStore = getToastStore();
	const popupInfo: PopupSettings = {
		event: 'click',
		target: 'popupInfo',
		placement: 'top'
	};
	let isRegister = false;
	let isSendCode = false;
	let showReqCodeGs = false;
	let btnDisabledReqCode = false;
	let disabledInputEmail = false;
	let mbId: string;
	let email: string;
	let initCode: string;
	let numberCode = '';
	const reqCode = async () => {
		if (!getEmailMatch(email)) return false;
		disabledInputEmail = btnDisabledReqCode = showReqCodeGs = true;
		const params = {
			email,
			isRegister
		};
		const data = await accessApi('auth/reqCode', params);
		initCode = data.initCode;
		mbId = data.mbId;
		// if (dev) console.log('D data: ', data);
		showReqCodeGs = false;
		if (initCode === 'non') {
			let toastMessage = isRegister
				? '회원가입된 이메일입니다.'
				: '등록되지 않은 이메일입니다.<br />올바른 이메일을 확인하시거나 회원가입 하시기 바랍니다.';
			const t: ToastSettings = {
				message: toastMessage,
				timeout: 5000
			};
			toastStore.trigger(t);
			disabledInputEmail = btnDisabledReqCode = false;
		}
	};
	let getAuth = false;
	const sendCode = async () => {
		const params = {
			initCode,
			numberCode,
			isRegister,
			email,
			mbId
		};
		const data = await accessApi('auth/sendCode', params);
		isSendCode = data.is_send_code;
		getAuth = data.get_auth;
		// console.log('data::: ', data);
		if (!getAuth) setRefresh();
		else {
			mb.set(data.mb);
			isLoggedIn.set(true);
		}
	};
	let altTxt = '로그인';
	let altClass = 'variant-filled-primary';
	const chkRegister = (event: any) => {
		if (event.target.checked) {
			altTxt = '회원가입';
			altClass = 'variant-filled-warning';
		} else {
			altTxt = '로그인';
			altClass = 'variant-filled-primary';
		}
		setRefresh();
	};
	const setRefresh = () => {
		initCode = '';
		numberCode = '';
		disabledInputEmail = btnDisabledReqCode = showReqCodeGs = false;
	};
</script>

<div class="wrap-box" in:scale={{ duration: 150 }}>
	<div class="logo-box">
		<img src="/images/logo_stipple.png" alt="logo" />
	</div>
	<form>
		<div class="flex mb-4">
			<label class="flex items-center space-x-3">
				<input
					class="checkbox setDisabled"
					type="checkbox"
					bind:checked={isRegister}
					on:change={chkRegister}
				/>
				<h4 class="text-surface-400">회원가입</h4>
			</label>
			<button use:popup={popupInfo} type="button" class="ms-6">
				<IconXi iconName="help" fontSize="30px" addClass="text-secondary-500" />
			</button>
			<div class="card p-4 variant-filled-secondary shadow-xl" data-popup="popupInfo">
				<div>회원가입을 원하시면 체크하세요.</div>
				<div class="arrow variant-filled-secondary" />
			</div>
		</div>

		<input
			class="input setDisabled"
			bind:value={email}
			on:change={setRefresh}
			type="email"
			placeholder="이메일을 입력하세요."
			disabled={disabledInputEmail}
			required
		/>
		<div class="flex justify-center mt-4">
			<Button
				addClass={altClass}
				btnText="{altTxt} 인증코드 받기"
				iconNameS="mail"
				iconNameAlt="mail"
				onClick={reqCode}
				showGs={showReqCodeGs}
				btnDisabled={btnDisabledReqCode}
				btnType="submit"
			/>
		</div>
	</form>
	{#if initCode && initCode !== 'non'}
		<div class="mt-4" in:scale={{ duration: 150 }}>
			<span class="text-surface-500">이메일로 받은 인증코드를 입력하세요.</span>
			<form>
				<div class="input-group input-group-divider grid-cols-3">
					<input bind:value={initCode} readonly />
					<input
						class="col-span-2"
						bind:value={numberCode}
						type="number"
						placeholder="인증코드 (숫자만 입력)"
						required
					/>
				</div>
				<div class="flex justify-between mt-4">
					<Button
						addClass="variant-filled-surface btn-icon"
						iconNameS="refresh"
						iconNameAlt="refresh"
						onClick={setRefresh}
					/>
					<Button
						addClass="variant-filled-secondary"
						btnText="인증코드 확인"
						iconNameS="check-circle"
						iconNameAlt="check-circle"
						onClick={sendCode}
						btnType="submit"
					/>
				</div>
			</form>
		</div>
	{/if}
	{#if isSendCode}
		{@const btnAction = `<a class="btn variant-filled-tertiary" href="./office/info">회원이름 설정하기</a>`}
		{#if !getAuth}
			<div class="mt-4" in:scale={{ duration: 150 }}>
				<AlertBox message="인증코드가 일치하지 않습니다.<br />인증절차를 다시 시작하세요." />
			</div>
		{/if}
	{/if}
</div>

<style>
	.wrap-box {
		margin: 10px auto 0;
		max-width: 450px;
		width: 90%;
	}
	.wrap-box .logo-box {
		margin: 0 auto 30px;
		width: 250px;
	}
	.wrap-box .logo-box img {
		width: 100%;
		border-radius: 50%;
	}
	input {
		text-align: center;
	}
</style>
