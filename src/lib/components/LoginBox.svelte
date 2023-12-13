<script lang="ts">
	import { mb, isLoggedIn } from '$lib/api/store';
	import { accessApi } from '$lib/api/access';
	import { scale } from 'svelte/transition';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';
	import { getEmailMatch } from '$lib/config';
	import IconXi from './IconXi.svelte';
	let signId = '';
	let mbPassword = '';
	let mbPassword2 = '';
	let isSignUp = false;
	let btnDisabledSetSign = false;
	let showGsSetSign = false;
	$: btnClassAlt = isSignUp ? 'variant-filled-primary' : 'variant-filled-secondary';
	$: btnTextAlt = isSignUp ? '회원가입' : '로그인';
	const regex = /^[A-Za-z0-9]+$/;
	const setSign = async () => {
		let params = {};
		if (isSignUp) {
			//회원가입
			if (!(signId && mbPassword && mbPassword2)) {
				const t: ToastSettings = {
					message: '입력하지 않은 회원정보가 있습니다.',
					timeout: 1500
				};
				toastStore.trigger(t);
				return false;
			}
			if (signId.length < 4 || signId.length > 20) {
				const t: ToastSettings = {
					message: '아이디는 4자 이상 20자 이하로 입력해주세요.',
					timeout: 1500
				};
				toastStore.trigger(t);
				return false;
			}
			if (!regex.test(signId)) {
				const t: ToastSettings = {
					message: '회원 아이디는 영문, 숫자만 가능합니다.',
					timeout: 1500
				};
				toastStore.trigger(t);
				return false;
			}
			if (mbPassword !== mbPassword2) {
				const t: ToastSettings = {
					message: '비밀번호가 일치하지 않습니다.',
					timeout: 1500
				};
				toastStore.trigger(t);
				return false;
			}
			if (mbPassword.length < 6) {
				const t: ToastSettings = {
					message: '비밀번호는 6자 이상 입력해주세요.',
					timeout: 1500
				};
				toastStore.trigger(t);
				return false;
			}
			params = {
				signId,
				mbPassword,
				mbPassword2,
				isSignUp
			};
		} else {
			if (!(signId && mbPassword)) {
				const t: ToastSettings = {
					message: '입력하지 않은 회원정보가 있습니다.',
					timeout: 1500
				};
				toastStore.trigger(t);
				return false;
			}
			params = {
				signId,
				mbPassword
			};
		}
		btnDisabledSetSign = showGsSetSign = true;
		const data = await accessApi('auth/setSign', params);
		// if (dev) console.log('data: ', data);
		if (data.msg === 'exist_id') {
			const t: ToastSettings = {
				message: '이미 가입되어 있는 아이디입니다.',
				timeout: 1500
			};
			toastStore.trigger(t);
			btnDisabledSetSign = showGsSetSign = false;
			return false;
		}
		if (data.msg === 'not_match') {
			const t: ToastSettings = {
				message: '인증되지 않은 아이디와 비밀번호입니다.',
				timeout: 1500
			};
			toastStore.trigger(t);
			btnDisabledSetSign = showGsSetSign = false;
			return false;
		}
		if (data.msg === 'sign_up') {
			const t: ToastSettings = {
				message: '회원가입을 축하드립니다.',
				timeout: 1500
			};
			toastStore.trigger(t);
		}
		if (data.msg === 'login') {
			const t: ToastSettings = {
				message: '로그인 되었습니다.',
				timeout: 1500
			};
			toastStore.trigger(t);
		}
		btnDisabledSetSign = showGsSetSign = false;
		mb.set(data.mb);
		isLoggedIn.set(true);
		goto('/');
	};
	let signEmail = '';
	let sendPw = false;
	let btnDisabledFindPw = false;
	let showGsFindPw = false;
	const findPw = async () => {
		if (!getEmailMatch(signEmail)) return false;
		const params = {
			signEmail
		};
		btnDisabledFindPw = showGsFindPw = true;
		const data = await accessApi('auth/findPw', params);
		// if (dev) console.log('data: ', data);
		if (data.msg === 'not_exist_email') {
			const t: ToastSettings = {
				message: '등록되지 않은 이메일입니다.',
				timeout: 1500
			};
			toastStore.trigger(t);
			btnDisabledFindPw = showGsFindPw = false;
			return false;
		}
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: '임시 비밀번호가 발송되었습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			showGsFindPw = false;
			sendPw = true;
		}
	};
</script>

<div in:scale={{ duration: 150 }}>
	<div class="logo-box">
		<img src="/images/logo.png" alt="logo" />
	</div>
	<div class="text-center wrap">
		<form>
			<label class="label">
				<span>ID</span>
				<input
					class="input"
					type="text"
					placeholder="아이디 (4자 이상, 영문, 숫자)"
					bind:value={signId}
					pattern="[A-Za-z0-9]+"
					required
				/>
			</label>
			<label class="mt-3 label">
				<span>PASSWORD</span>
				<input
					class="input"
					type="password"
					placeholder="비밀번호 (6자 이상)"
					bind:value={mbPassword}
					required
				/>
				{#if isSignUp}
					<input
						class="input"
						type="password"
						placeholder="비밀번호 확인"
						bind:value={mbPassword2}
						required
					/>
				{/if}
			</label>
			{#if sendPw}
				<small class="mb-3 text-warning-300"
					><IconXi iconName="info" /> 로그인후 비밀번호를 변경하세요..</small
				>
			{/if}
			<div class="flex justify-between mt-4">
				<label class="flex mt-2 space-x-2 items-bottom ms-2">
					<input class="checkbox" type="checkbox" bind:checked={isSignUp} />
					<p>회원가입</p>
				</label>
				<Button addClass={btnClassAlt} btnType="submit" btnText={btnTextAlt} onClick={setSign} />
			</div>
		</form>
		{#if !isSignUp}
			<div id="findPw" class="px-3 py-5 variant-ghost">
				<form>
					<label class="label">
						<div class="grid-cols-12 input-group input-group-divider">
							<input
								type="email"
								class="col-span-7"
								bind:value={signEmail}
								placeholder="가입 이메일"
							/>
							<Button
								btnType="submit"
								btnText="비번 찾기"
								addClass="variant-filled-warning col-span-5"
								iconNameS="search"
								onClick={findPw}
								showGs={showGsFindPw}
								btnDisabled={btnDisabledFindPw}
							/>
						</div>
					</label>
					<small class="text-surface-300"
						><IconXi iconName="info" /> 이메일로 임시 비밀번호를 발송해드립니다.</small
					>
				</form>
			</div>
		{/if}

		<div id="prvBox">
			<h1>11Times.com</h1>
			<div class="mt-3 text-surface-400">
				<a href="/guide">개인정보처리방침</a>
				|
				<a href="/guide/termsOfUse">이용약관</a>
			</div>
		</div>
		<br /><br />
		<div class="m-4 text-center text-surface-300">
			(주)이클로저 | 대표자: 김세현<br />
			대표번호: 070-8648-1179 | FAX: 0504-388-3911<br />
			대표메일: clozer@kakako.com<br />
			서울 강남구 역삼로19길 29, 3층<br />
			사업자등록번호: 607-87-02019<br />
			통신판매신고번호: 2021-서울강남-01001
		</div>
	</div>
</div>

<style>
	h1 {
		@apply text-surface-300;
		font-size: 1.5rem;
	}
	.wrap {
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
	}
	.logo-box {
		margin: 50px auto;
		width: 250px;
		text-align: center;
	}
	.logo-box img {
		width: 50%;
		border-radius: 25%;
		margin: 0 auto;
	}
	input {
		text-align: center;
	}
	span {
		@apply text-surface-300;
	}
	#findPw {
		border-radius: 5px;
		margin-top: 80px;
	}
	#prvBox {
		margin-top: 100px;
	}
</style>
