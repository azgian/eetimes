<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import { getCopyText } from '$lib/config';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	const toastStore = getToastStore();
	export let itemName: string;
	export let itemLogo: string;
	export let mbId: string;
	let showDetail = false;
	let showSetItem = false;
	const setCopy = (text: string) => {
		getCopyText(text);
		const t: ToastSettings = {
			message: '복사되었습니다.',
			timeout: 3000
		};
		toastStore.trigger(t);
	};
	let itemInfo: any = {};
	const getItemInfo = async () => {
		const params = {
			itemName
		};
		const data = await accessApi('eetimes/getItemInfo', params);
		itemInfo = data;
		// console.log('itemInfo: ', itemInfo);
	};
	getItemInfo();
	let mbMemo: any = {};
	const getMbInfo = async () => {
		const params = {
			mbId
		};
		const data = await accessApi('member/getMbInfo', params);
		mbMemo = data.mb.mb_memo ? JSON.parse(data.mb.mb_memo) : {};
	};
	getMbInfo();
	let startDay = new Date();
	let amount = '';
	let rate = '';
	let period = '';
	onMount(() => {
		getMbInfo();
		startDay =
			mbMemo[itemName] && mbMemo[itemName]['start_day']
				? mbMemo[itemName]['start_day']
				: new Date();
		amount = mbMemo[itemName] && mbMemo[itemName]['amount'] ? mbMemo[itemName]['amount'] : '';
		rate = mbMemo[itemName] && mbMemo[itemName]['rate'] ? mbMemo[itemName]['rate'] : '';
		period = mbMemo[itemName] && mbMemo[itemName]['period'] ? mbMemo[itemName]['period'] : '';
	});
	let btnDisabledSetItem = false;
	let showGsSetItem = false;
	const setMbItem = async () => {
		const params = {
			mbId,
			itemName,
			startDay,
			period,
			amount,
			rate
		};
		btnDisabledSetItem = showGsSetItem = true;
		const data = await accessApi('eetimes/setMbItem', params);
		btnDisabledSetItem = showGsSetItem = false;
		showSetItem = false;
		const t: ToastSettings = {
			message: '설정되었습니다.',
			timeout: 3000
		};
		toastStore.trigger(t);
		getMbInfo();
	};
</script>

<div class="p-3 mt-1 ms-1 me-1 variant-ghost">
	<div class="flex items-center justify-between">
		<img src="./images/{itemLogo}.jpg" alt="logo" class="coin_logo me-3" />
		<div class="text-center infoBox grow">
			<span class="text-primary-300"
				>{itemInfo.it_rate ? itemInfo.it_rate : ''}<small>%</small></span
			>
			<span class="text-success-300"
				>{itemInfo.it_period ? itemInfo.it_period : ''}<small>일</small></span
			>
		</div>
		<div>
			<Button
				addClass="variant-ghost btn-icon btn-icon-sm me-1"
				iconNameS="cog"
				iconNameAlt="close"
				showAlt={showSetItem}
				onClick={() => (showSetItem = !showSetItem)}
			/>
			<Button
				addClass="variant-ghost btn-icon btn-icon-sm"
				iconNameS="ellipsis-h"
				iconNameAlt="close"
				showAlt={showDetail}
				onClick={() => {
					showDetail = !showDetail;
				}}
			/>
		</div>
	</div>
	{#if showSetItem}
		<div class="mt-3">
			<form>
				<input type="date" class="input" placeholder="시작일" bind:value={startDay} />
				<input type="number" class="mt-1 input" placeholder="수량" bind:value={amount} />
				<input type="number" class="mt-1 input" placeholder="이율 (%) / 1day" bind:value={rate} />
				<input type="number" class="mt-1 input" placeholder="기간 (days)" bind:value={period} />
				<div class="flex justify-end mt-1">
					<Button
						addClass="variant-filled-secondary btn-sm mt-1"
						btnText="설정"
						iconNameS="upload"
						btnDisabled={btnDisabledSetItem}
						showGs={showGsSetItem}
						onClick={() => setMbItem()}
					/>
				</div>
			</form>
		</div>
	{/if}
	{#if showDetail}
		<div>
			<Button
				addClass="variant-filled-primary btn-sm me-2 mt-2"
				btnText={mbMemo[itemName] && mbMemo[itemName]['memo'] ? mbMemo[itemName]['memo'] : ''}
				iconNameS="documents-o"
				btnDisabled={mbMemo[itemName] && mbMemo[itemName]['memo'] ? false : true}
				onClick={() => setCopy(mbMemo[itemName]['memo'])}
			/>
			{#if itemName === 'XRP'}
				<Button
					addClass="variant-filled-primary btn-sm mt-2"
					btnText={mbMemo['_XRP']['memo'] ? mbMemo['_XRP']['memo'] : ''}
					iconNameS="documents-o"
					btnDisabled={mbMemo['_XRP']['memo'] ? false : true}
					onClick={() => setCopy(mbMemo['_XRP']['memo'])}
				/>
			{/if}
		</div>
		<div class="mt-2 table-container">
			<table class="table table-hover">
				<tr>
					<th>시작일</th>
					<td
						>{mbMemo[itemName] && mbMemo[itemName]['start_day']
							? mbMemo[itemName]['start_day']
							: ''}</td
					>
				</tr>
				<tr>
					<th>수량</th>
					<td>{mbMemo[itemName] && mbMemo[itemName]['amount'] ? mbMemo[itemName]['amount'] : ''}</td
					>
				</tr>
				<tr>
					<th>이율</th>
					<td
						>{mbMemo[itemName] && mbMemo[itemName]['rate'] ? mbMemo[itemName]['rate'] : ''} (%) / 1day</td
					>
				</tr>
				<tr>
					<th>기간</th>
					<td
						>{mbMemo[itemName] && mbMemo[itemName]['period'] ? mbMemo[itemName]['period'] : ''} 일</td
					>
				</tr>
			</table>
		</div>
	{/if}
</div>

<style>
	.coin_logo {
		width: 100px;
		border-radius: 25px;
	}
	input {
		text-align: center;
	}
	.infoBox span {
		margin-left: 5px;
		font-size: 1.5rem;
		font-weight: 700;
	}
	.infoBox span small {
		margin-left: 5px;
		font-size: 0.8rem;
		font-weight: 400;
		color: #ccc;
	}
	th {
		padding: 5px;
		width: 80px;
		font-size: 0.8rem;
		font-weight: 400;
	}
	td {
		padding: 5px;
	}
	@media (max-width: 468px) {
		.infoBox {
			display: none;
		}
	}
</style>
