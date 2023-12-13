<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { accessApi } from '$lib/api/access';
	import { scrollToId } from '$lib/config';
	import { scale } from 'svelte/transition';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	let itName: string;
	let it_name: string;
	let itPeriod = '';
	let itRate = '';
	let itId: number;
	let itWallet = '';
	let itTag = '';
	let bank = '';
	let btnDisabledSetItem = false;
	let showGsSetItem = false;
	let showDelete = false;
	let showBank=false;

	const setItem = async () => {
		if (!itName) {
			const t: ToastSettings = {
				message: `아이템 이름은 필수입력입니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			return false;
		}
		btnDisabledSetItem = showGsSetItem = true;

		const params = {
			itId,
			itName,
			it_name,
			itPeriod,
			itWallet,
			bank,
			itRate
		};
		const data = await accessApi('eetimes/setItem', params);
		btnDisabledSetItem = showGsSetItem = false;
		if (data.msg === 'success') {
			let messageTxt = itId ? '수정' : '등록';
			const t: ToastSettings = {
				message: `아이템이 ${messageTxt}되었습니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			setRefresh();
			getItemList();
		}
	};
	const setRefresh = () => {
		itId = 0;
		itName = '';
		it_name = '';
		itPeriod = '';
		itRate = '';
		itWallet = '';
		bank = '';
		btnDisabledSetItem = showGsSetItem = showDelete = showBank = false;
	};
	let itemList: any[] = [];
	const getItemList = async () => {
		const data = await accessApi('eetimes/getItemList');
		itemList = data;
	};
	getItemList();

	const updateItem = (
		_itId: number,
		_itName: string,
		_it_name: string,
		_itWallet: string,
		_bank:string,
		_itPeriod: any,
		_itRate: any
	) => {
		itId = _itId;
		itName = _itName;
		it_name = _it_name;
		itWallet = _itWallet;
		bank = _bank;
		itPeriod = _itPeriod;
		itRate = _itRate;
		showDelete = true;
		scrollToId('container-wrap');
		if (itName === 'KRW') showBank = true;
		else showBank = false;
	};

	const deleteItem = async (itId: number) => {
		if (!confirm('삭제하시겠습니까?')) return false;
		const params = {
			itId
		};
		const data = await accessApi('eetimes/deleteItem', params);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: `아이템이 삭제되었습니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			getItemList();
			setRefresh();
		}
	};
	$: setItemAddClass = showDelete ? 'variant-filled-primary' : 'variant-filled-secondary';
</script>

<div in:scale={{ duration: 150 }}>
	<form>
		<input type="hidden" bind:value={itId} />
		<div class="grid-cols-10 mb-2 input-group input-group-divider">
			<input class="col-span-5" type="text" bind:value={itName} placeholder="아이템 이름" />
			<input class="col-span-5" type="text" bind:value={it_name} placeholder="한글 이름" />
		</div>
		{#if showBank}
		<input class="mb-2 input" type="text" bind:value={bank} placeholder="은행계좌" />
		{:else}
		<input class="mb-2 input" type="text" bind:value={itWallet} placeholder="아이템 지갑주소" />
		{/if}
		<div class="grid-cols-10 mb-2 input-group input-group-divider">
			<input type="number" bind:value={itRate} placeholder="보상율(%) / 1day" class="col-span-5" />
			<input
				type="number"
				bind:value={itPeriod}
				placeholder="기간 (day)"
				class="col-span-5"
				required
			/>
		</div>
		<div class="flex justify-between mt-2">
			<div>
				{#if showDelete}
					<Button
						addClass="variant-filled-error"
						iconNameS="trash"
						btnText="삭제"
						onClick={() => deleteItem(itId)}
					/>
				{/if}
			</div>
			<div class="flex justify-end">
				<Button
					addClass="variant-filled-surface btn-icon me-4"
					iconNameS="refresh"
					onClick={setRefresh}
				/>
				<Button
					onClick={setItem}
					addClass={setItemAddClass}
					showAlt={showDelete}
					btnText="등록"
					btnTextAlt="수정"
					iconNameS="upload"
					iconNameAlt="upload"
					btnDisabled={btnDisabledSetItem}
					showGs={showGsSetItem}
				/>
			</div>
		</div>
	</form>

	<div class="mt-6 table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>아이템</th>
					<th>지갑주소<br>은행계좌</th>
					<th>보상율 / 기간</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each itemList as item}
					{#if item.it_name}
						<tr>
							<td>{item.it_name}<br />{item._it_name}</td>
							<td>
								{item.it_name==='USDT'?item.it_wallet:''}
								{item.it_name==='KRW'?item.bank:''}
							</td>
							<td>{item.it_rate * 1}<br />{item.it_period}</td>
							<td
								><Button
									addClass="btn-icon btn-icon-sm"
									iconNameS="cog"
									onClick={() =>
										updateItem(
											item.it_id,
											item.it_name,
											item._it_name,
											item.it_wallet,
											item.bank,
											item.it_period,
											item.it_rate
										)}
								/></td
							>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	th,
	td {
		text-align: center;
		vertical-align: middle;
	}
	input {
		text-align: center;
	}
	@media (max-width: 800.98px) {
		thead {
			display: none;
		}
	}
</style>
