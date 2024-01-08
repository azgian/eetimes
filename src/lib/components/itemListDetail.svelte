<script lang="ts">
	import { addCommas, getCopyText, getConfig } from '$lib/config';
	import IconXi from './IconXi.svelte';
	import Button from './Button.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { accessApi } from '$lib/api/access';
	import { mb, writableConfig } from '$lib/api/store';
	import { onMount } from 'svelte';
	onMount(async () => {
		writableConfig.set(await getConfig());
	});
	const toastStore = getToastStore();
	export let itemInfo: any = {};
	let itemName = itemInfo.it_name;
	export let itemPrice: number;
	const setCopy = (text: string) => {
		getCopyText(text);
		const t: ToastSettings = {
			message: '복사되었습니다.',
			timeout: 3000
		};
		toastStore.trigger(t);
	};
	let showReqForm = false;
	let reqAmount: number;
	let amountRate: number;
	let maxAmountRate: number;
	let _reqAmount: number;
	let _amountRate: number;
	const getRate = () => {
		if (!reqAmount) {
			const t: ToastSettings = {
				message: '금액을 입력해주세요.',
				timeout: 3000
			};
			toastStore.trigger(t);
			return false;
		}
		let minAmount = itemName === 'KRW' ? 500_000 : 400;
		let coinName = itemName === 'KRW' ? '원' : 'USDT';
		if (reqAmount < minAmount) {
			const t: ToastSettings = {
				message: `${addCommas(minAmount)} ${coinName} 이상부터 신청가능합니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			showReqForm = false;
			return false;
		}
		if (itemName === 'KRW') {
			if (reqAmount >= 500_000 && reqAmount < 1_000_000) amountRate = 4;
			else {
				let n = Math.floor(reqAmount / 1_000_000);
				amountRate = 4 + n * 0.1;
				amountRate =
					amountRate > Number($writableConfig.max_rate.split(',')[0])
						? Number($writableConfig.max_rate.split(',')[0])
						: amountRate;
			}
		} else {
			if (reqAmount >= 400 && reqAmount < 800) amountRate = 4.1;
			else {
				let n = Math.floor(reqAmount / 800);
				amountRate = 4.1 + n * 0.1;
				amountRate =
					amountRate > Number($writableConfig.max_rate.split(',')[1])
						? Number($writableConfig.max_rate.split(',')[1])
						: amountRate;
			}
		}
		_reqAmount = reqAmount;
		_amountRate = amountRate;
		showReqForm = true;
	};

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
			itemName,
			reqAmount,
			amountRate
		};
		btnDisabledReq = showGsReq = true;
		const data = await accessApi('eetimes/reqBuy', params);
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
		<string class="me-3 text-surface-300">{itemName}</string>
		<IconXi iconName="won" addClass="me-1" /><span class="text-price"
			>{addCommas(Math.floor(itemPrice * 100) / 100)}</span
		>
	</div>
{/if}

<div class="p-3">
	<div class="input-group input-group-divider grid-cols-12">
		<input
			type="number"
			placeholder="금액 ({itemName})"
			class="col-span-7"
			bind:value={reqAmount}
			on:keyup={() => {
				_reqAmount = _amountRate = 0;
			}}
		/>
		<Button
			btnType="button"
			addClass="variant-ghost-secondary col-span-5"
			btnText="보상율 확인"
			onClick={getRate}
		/>
	</div>
</div>
{#if showReqForm}
	<div class="p-3 mt-3 table-container">
		<table class="table table-compact table-interactive">
			<tbody>
				<tr>
					<td>금액</td>
					<td>월수익(30일 기준)</td>
				</tr>
				<tr class="text-primary-300">
					<td
						><strong>{addCommas(_reqAmount)} {itemName === 'NETELLER' ? 'USDT' : itemName}</strong
						></td
					>
					<td>
						<strong>{Math.round(_amountRate * 10) / 10} %</strong>
						<br /><span
							>≒ {addCommas((_reqAmount * Math.round(_amountRate * 10)) / 10 / 100)}
							{itemName === 'NETELLER' ? 'USDT' : itemName}</span
						>
					</td>
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
		{#if itemInfo.it_name === 'USDT'}
			<small>
				<IconXi iconName="info" /> 지갑주소를 복사하여 코인을 전송한 후, 신청하시면 관리자가 확인후 처리해
				드립니다.
			</small>
			<small>
				<IconXi iconName="info" /> 송금 수수료(1USDT)는 본인 부담입니다.
			</small>
		{/if}
		{#if itemInfo.it_name === 'KRW'}
			<small>
				<IconXi iconName="info" /> 계좌번호를 복사하여 이체한 후, 신청하시면 관리자가 확인후 처리해 드립니다.
			</small>
		{/if}
	</div>
{/if}

<style>
	td {
		text-align: center;
		vertical-align: middle;
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
