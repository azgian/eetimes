<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import { scale, slide } from 'svelte/transition';
	import { addCommas } from '$lib/config';
	import { onMount } from 'svelte';
	export let _id: number;
	let mbItemInfo: any = {};
	let showDetail = false;
	const getMbItemsInfo = async () => {
		const params = {
			_id
		};
		const data = await accessApi('eetimes/getMbItemsInfo', params);
		mbItemInfo = data;
	};
	onMount(() => {
		getMbItemsInfo();
	});
</script>

<div class="p-3 mt-1 ms-1 me-1 variant-ghost">
	<div class="flex items-center justify-between">
		{#if mbItemInfo.item_name}
			<img
				src="./images/coin_{mbItemInfo.item_name.toLowerCase()}.jpg"
				alt="logo"
				class="coin_logo me-3"
			/>
		{/if}
		<div class="text-center infoBox grow">
			<strong class="text-primary-300"
				>{mbItemInfo.rate ? mbItemInfo.rate * 1 : ''}<small>%</small></strong
			>
			<strong class="text-success-300"
				>{mbItemInfo.period ? mbItemInfo.period : ''}<small>일</small></strong
			>
		</div>
		<div>
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
	{#if showDetail}
		<div class="mt-2 table-container" in:scale={{ duration: 150 }} out:slide={{ duration: 150 }}>
			<table class="table table-hover" id="detailTable">
				<tr>
					<th>시작일</th>
					<td>
						{mbItemInfo.start_day ? mbItemInfo.start_day : ''}
						{mbItemInfo.end_day ? ' ~ ' + mbItemInfo.end_day : ''}
					</td>
				</tr>
				<tr>
					<th>수량</th>
					<td>{mbItemInfo.amount ? addCommas(mbItemInfo.amount) : ''}</td>
				</tr>
				<tr>
					<th>이율</th>
					<td>{mbItemInfo.rate ? mbItemInfo.rate * 1 : ''} (%) / 1day</td>
				</tr>
				<tr>
					<th>기간</th>
					<td>{mbItemInfo.period ? mbItemInfo.period : ''} 일</td>
				</tr>
				{#if mbItemInfo.memo}
					<tr>
						<th>지갑</th>
						<td>
							{mbItemInfo.memo ? mbItemInfo.memo : ''}
						</td>
					</tr>
				{/if}
				{#if mbItemInfo.tag}
					<tr>
						<th>태그</th>
						<td>
							{mbItemInfo.tag}
						</td>
					</tr>
				{/if}
			</table>
		</div>
	{/if}
</div>

<style>
	.coin_logo {
		width: 120px;
		border-radius: 25px;
	}
	#detailTable th {
		width: 80px;
		min-width: 80px;
	}
</style>
