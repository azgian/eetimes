<script lang="ts">
	import { addCommas, getCopyText } from '$lib/config';
	import IconXi from './IconXi.svelte';
	import Button from './Button.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { accessApi } from '$lib/api/access';
	import { isLoggedIn, mb } from '$lib/api/store';
	const toastStore = getToastStore();
	export let itemInfo: any = {};
	export let itemPrice: number;
	const setCopy = (text: string) => {
		getCopyText(text);
		const t: ToastSettings = {
			message: '복사되었습니다.',
			timeout: 3000
		};
		toastStore.trigger(t);
	};
	let itemName = itemInfo.it_name;
	let btnDisabledReq = false;
	let showGsReq = false;
	const reqBuy = async () => {
		if (!($mb.mb_name && $mb.mb_hp && $mb.mb_email)) {
			const t: ToastSettings = {
				message: '회원정보에 회원이름, 전화번호, 이메일 입력후에 신청가능합니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			return false;
		}
		if (!confirm('신청하시겠습니까?')) return;
		const params = {
			itemName
		};
		btnDisabledReq = showGsReq = true;
		const data = await accessApi('eetimes/reqBuy', params);
		// if (dev) console.log('data: ', data);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: '신청되었습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
		}
		btnDisabledReq = showGsReq = false;
	};
</script>

{#if itemPrice}
	<div class="flex items-center mt-3 ps-4">
		<string class="me-3 text-surface-300">{itemInfo._it_name}</string>
		<IconXi iconName="won" addClass="me-1" /><span class="text-price"
			>{addCommas(Math.floor(itemPrice * 100) / 100)}</span
		>
	</div>
{/if}

<div class="p-3 mt-3 table-container">
	<table class="table table-compact table-interactive">
		<tbody>
			<tr>
				<td>월환산 보상율</td>
				<td>보상주기</td>
			</tr>
			<tr class="text-primary-300">
				<td
					><strong>{itemInfo.it_rate ? Math.round(itemInfo.it_rate * 30 * 100) / 100 : ''} %</strong
					></td
				>
				<td><strong>매일</strong></td>
			</tr>
		</tbody>
	</table>
</div>
<div class="flex justify-between px-3 mt-3">
	<div>
		{#if itemInfo.it_wallet}
			<Button
				addClass="variant-filled-primary btn-sm mt-1"
				btnText={itemInfo.it_wallet ? 'Wallet' : '지갑주소 없음'}
				iconNameS="documents-o"
				btnDisabled={itemInfo.it_wallet ? false : true}
				onClick={() => setCopy(itemInfo.it_wallet)}
			/>
		{/if}
		{#if itemInfo.bank}
			<Button
				addClass="variant-filled-primary btn-sm mt-1"
				btnText={itemInfo.bank ? '계좌번호 복사' : '은행계좌정보없음'}
				iconNameS="documents-o"
				btnDisabled={itemInfo.bank ? false : true}
				onClick={() => setCopy(itemInfo.bank.replace(/\D/g, ''))}
			/><br />
			<small class="text-surface-300"><IconXi iconName="bank"></IconXi> {itemInfo.bank}</small>
		{/if}
	</div>
	<div>
		<form>
			<Button
				btnType="submit"
				addClass="variant-filled-secondary"
				btnText="신청"
				onClick={reqBuy}
				btnDisabled={btnDisabledReq}
				showGs={showGsReq}
			/>
		</form>
	</div>
</div>
<div class="flex flex-col p-5 text-surface-300">
	<small>
		<IconXi iconName="info" /> 참여자들이 실제로 분배 받은 보상율은 향후 변동될 수 있습니다.
	</small>
	{#if itemInfo._it_name === 'USDT'}
		<small>
			<IconXi iconName="info" /> 지갑주소를 복사하여 코인을 전송한 후, 신청하시면 관리자가 확인후 처리해
			드립니다.
		</small>
		<small>
			<IconXi iconName="info" /> 송금 수수료(1USDT)는 본인 부담입니다.
		</small>
	{/if}
	{#if itemInfo._it_name === 'KRW'}
		<small>
			<IconXi iconName="info" /> 계좌번호를 복사하여 이체한 후, 신청하시면 관리자가 확인후 처리해 드립니다.
		</small>
	{/if}
</div>

<style>
	td {
		text-align: center;
	}
	.text-price {
		font-size: 1.75rem;
		font-weight: 600;
		@apply text-surface-300;
	}
	input {
		text-align: center;
	}
</style>
