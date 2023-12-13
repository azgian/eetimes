<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import IconXi from '$lib/components/IconXi.svelte';
	import { scale, slide } from 'svelte/transition';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	export let req: any = {};
	let showDetail = false;
	let reqId = req._id;
	let reqMbId = req.mb_id;
	let reqItemName = req.item_name;
	let reqStartDay: Date = new Date();
	let reqAmount: number;
	let reqPeriod: number;
	let reqRate: number;
	let btnDisabledSetItem = false;
	let showGsSetItem = false;
	let showReqBox = true;
	const setReqMbItem = async () => {
		if (!reqStartDay || !reqAmount || !reqPeriod || !reqRate) {
			const t: ToastSettings = {
				message: `모든 항목은 필수입력입니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			return false;
		}
		const params = {
			reqId,
			reqMbId,
			reqItemName,
			reqStartDay,
			reqAmount,
			reqPeriod,
			reqRate
		};
		btnDisabledSetItem = showGsSetItem = true;
		const data = await accessApi('eetimes/setReqMbItem', params);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: `신청이 접수되었습니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			btnDisabledSetItem = showGsSetItem = true;
			showReqBox = false;
		}
	};
	const reqCancel = async () => {
		if (!confirm('신청을 취소하시겠습니까?')) return false;
		const params = {
			reqId
		};
		const data = await accessApi('stipple/reqCancel', params);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: `신청이 취소되었습니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
			showReqBox = false;
		}
	};
</script>

{#if showReqBox}
	<div class="mb-1 variant-ghost-warning mbs-box reqBox" transition:scale>
		<h3 class="flex justify-between p-2 ps-4">
			<div>
				<span class="mt-1">
					<IconXi iconName="user-circle" />
					{req.mb_name ? req.mb_name : ''}({req.mb_id})
				</span>
				<span class="mt-1 badge variant-ringed-primary me-2">
					<IconXi iconName="mobile" addClass="me-2" />
					{req.mb_hp ? req.mb_hp : ''}
				</span>
			</div>
			<div>
				<Button
					addClass="variant-ringed-warning btn-icon btn-icon-sm me-3"
					iconNameS="trash"
					onClick={reqCancel}
				/>
				<Button
					addClass="variant-ringed-warning btn-icon btn-icon-sm me-2"
					iconNameS="ellipsis-h"
					iconNameAlt="close"
					showAlt={showDetail}
					onClick={() => {
						showDetail = !showDetail;
					}}
				/>
			</div>
		</h3>
		{#if showDetail}
			<form>
				<div in:scale={{ duration: 150 }} out:slide={{ duration: 150 }} class="p-2">
					{#if req.item_name}
						<div class="flex mb-2 ms-1">
							<img src="./images/{req.coin_logo}" alt="logo" class="coin_logo" />
							<strong class="text-primary-300 ms-3">{req.it_rate} %</strong>
							<span class="text-surface-400 ms-2">/</span>
							<strong class="text-success-300 ms-2">{req.it_period} 일</strong>
						</div>
					{/if}
					<input type="hidden" bind:value={reqId} />
					<input type="hidden" bind:value={reqMbId} />
					<input type="hidden" bind:value={reqItemName} />
					<input
						class="mb-2 input input-warning"
						type="date"
						placeholder="시작일"
						bind:value={reqStartDay}
					/>
					<div class="grid-cols-12 mb-2 input-group input-warning input-group-divider">
						<input
							class="col-span-6 input-warning"
							type="number"
							placeholder="보상율 (1day)"
							bind:value={reqRate}
						/>
						<input
							class="col-span-6 input-warning"
							type="number"
							placeholder="기간"
							bind:value={reqPeriod}
						/>
					</div>
					<div class="grid-cols-12 mb-2 input-group input-warning input-group-divider">
						<input
							class="col-span-7 input-warning"
							type="number"
							placeholder="수량"
							bind:value={reqAmount}
						/>
						<Button
							btnType="submit"
							addClass="variant-filled-warning col-span-5"
							btnText="신청접수"
							onClick={setReqMbItem}
							btnDisabled={btnDisabledSetItem}
							showGs={showGsSetItem}
						/>
					</div>
				</div>
			</form>
		{/if}
	</div>
{/if}

<style>
	.reqBox {
		border-radius: 5px;
	}
	h3 {
		border-radius: 5px 5px 0 0;
		font-size: 0.85rem;
	}
	.coin_logo {
		width: 100px;
		border-radius: 25px;
	}
	input {
		text-align: center;
	}
</style>
