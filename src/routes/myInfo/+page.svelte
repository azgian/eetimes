<script lang="ts">
	import { mb, type Mb } from '$lib/api/store';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	import IconXi from '$lib/components/IconXi.svelte';
	import Button from '$lib/components/Button.svelte';
	import { scale } from 'svelte/transition';
	import { accessApi, resetMb } from '$lib/api/access';
	import { getCopyText, getEmailMatch } from '$lib/config';
	import ItemBox from './ItemBox.svelte';
	let mbName = '';
	let mbHp = '';
	let mbEmail = '';
	let bankInfo = ['', '', ''];
	let mbBank0 = bankInfo[0];
	let mbBank1 = bankInfo[1];
	let mbBank2 = bankInfo[2];
	$: if ($mb) {
		mbName = $mb.mb_name;
		mbHp = $mb.mb_hp;
		mbEmail = $mb.mb_email;
		bankInfo = $mb.mb_bank ? $mb.mb_bank.split(' ') : ['', '', ''];
		mbBank0 = bankInfo[0];
		mbBank1 = bankInfo[1];
		mbBank2 = bankInfo[2];
	}
	let mbPassword = '';
	const setMbInfo = async (fld: keyof Mb, val: any) => {
		if (!val) {
			const t: ToastSettings = {
				message: '회원정보가 입력되지 않았습니다.',
				timeout: 1500
			};
			toastStore.trigger(t);
			return false;
		}
		if (fld === 'mb_email' && !getEmailMatch(mbEmail)) return false;
		const params = {
			fld,
			val
		};
		const data = await accessApi('member/setMbInfo', params);
		if (data.msg === 'exist_email') {
			const t = {
				message: '이미 등록된 이메일입니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			return false;
		}
		if (data.msg === 'success') {
			const t = {
				message: '회원정보가 저장되었습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			resetMb($mb.mb_id);
		}
		if (fld === 'mb_password') {
			mbPassword = '';
		}
	};
	const signUpUrl = 'https://11times.com/u/' + $mb.uid.substring(1);
	const setCopyLink = () => {
		getCopyText(signUpUrl);
		const t: ToastSettings = {
			message: '추천링크가 복사되었습니다.',
			timeout: 3000
		};
		toastStore.trigger(t);
	};
</script>

<div in:scale={{ duration: 150 }}>
	<form class="mb-4">
		<label class="label mt-2">
			<div class="input-group input-group-divider grid-cols-12">
				<input type="text" class="col-span-9" placeholder="회원 이름" bind:value={mbName} />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-3"
					iconNameS="pen"
					iconNameAlt="pen"
					onClick={() => setMbInfo('mb_name', mbName)}
				/>
			</div>
		</label>
	</form>
	<form class="mb-4">
		<label class="label">
			<div class="input-group input-group-divider grid-cols-12">
				<input type="tel" class="col-span-9" bind:value={mbHp} placeholder="전화번호" />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-3"
					iconNameS="pen"
					iconNameAlt="pen"
					onClick={() => setMbInfo('mb_hp', mbHp)}
				/>
			</div>
		</label>
	</form>

	<form class="mb-4">
		<label class="label">
			<div class="input-group input-group-divider grid-cols-12">
				<input type="email" class="col-span-9" bind:value={mbEmail} placeholder="이메일" />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-3"
					iconNameS="pen"
					iconNameAlt="pen"
					onClick={() => setMbInfo('mb_email', mbEmail)}
				/>
			</div>
		</label>
		<div class="flex flex-col">
			<small class="ms-3 text-surface-300"
				><IconXi iconName="info" /> 이메일은 비밀번호 분실시 인증수단입니다.</small
			>
			<small class="ms-3 text-surface-300"
				><IconXi iconName="info" /> 사용중인 이메일을 입력하세요.</small
			>
		</div>
	</form>

	<form class="mb-6">
		<label class="label">
			<div class="input-group input-group-divider grid-cols-12">
				<input type="text" class="col-span-5" bind:value={mbBank0} placeholder="은행명" />
				<input
					type="number"
					class="col-span-7"
					bind:value={mbBank1}
					placeholder="은행계좌 (숫자만)"
				/>
			</div>
			<div class="input-group input-group-divider grid-cols-12">
				<input type="text" class="col-span-9" bind:value={mbBank2} placeholder="계좌주" />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-3"
					iconNameS="pen"
					iconNameAlt="pen"
					onClick={() => setMbInfo('mb_bank', mbBank0 + ' ' + mbBank1 + ' ' + mbBank2)}
				/>
			</div>
		</label>
	</form>

	<form class="mb-8">
		<label class="label">
			<div class="input-group input-group-divider grid-cols-12">
				<input type="text" class="col-span-9" bind:value={mbPassword} placeholder="비밀번호 변경" />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-3"
					iconNameS="pen"
					iconNameAlt="pen"
					onClick={() => setMbInfo('mb_password', mbPassword)}
				/>
			</div>
		</label>
	</form>
	<ItemBox itemName="USDT" itemLogo="coin_usdt" />
	<div class="mt-8 flex justify-center">
		<Button
			btnType="button"
			addClass="variant-filled-secondary"
			iconNameS="files"
			btnText="추천링크 복사"
			onClick={setCopyLink}
		/>
	</div>
</div>

<style>
	input {
		text-align: center;
	}
</style>
