<script lang="ts">
	import { addCommas, getItemPrice } from '$lib/config';
	import { onMount } from 'svelte';
	import { getConfig } from '$lib/config';
	import { writableConfig } from '$lib/api/store';
	import IconXi from '$lib/components/IconXi.svelte';
	export let mbItem: any;
	let currPrice: number;
	let accumReward: number;
	let accumItem: number;
	let startDate = new Date(mbItem.start_day); // Replace with your start date
	let today = new Date();
	let diffInTime = today.getTime() - startDate.getTime();
	let diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
	let r1: string;
	let r2: string;
	let rate: number;
	onMount(async () => {
		writableConfig.set(await getConfig());
		r1 = $writableConfig.rewards ? $writableConfig.rewards.split(',')[0] : '';
		r2 = $writableConfig.rewards ? $writableConfig.rewards.split(',')[1] : '';
		rate = mbItem.dn_lv === '1' ? Number(r1) : Number(r2);
		currPrice = await getItemPrice(mbItem.item_name);
		accumReward = (diffInDays * mbItem.amount * currPrice * rate) / 100;
		accumItem = (diffInDays * mbItem.amount * rate) / 100;
	});
</script>

<div class="px-3 pb-1">
	<strong class="text-surface-200">{diffInDays ? diffInDays : '0'}일째 -</strong>
	<span class="text-surface-300">추천보너스({mbItem.dn_lv}대): {rate}%</span>
</div>
<div class="px-3 pb-1">
	<small class="text-surface-300">누적:</small>
	{@html accumItem
		? '<strong>' +
			addCommas(Math.round(accumItem * 100) / 100) +
			'</strong> <small class="text-surface-100">' +
			mbItem.item_name +
			'</small>'
		: '0'}
	{#if accumReward && mbItem.item_name !== 'KRW'}
		<span class="ms-2 text-success-300">
			(<IconXi iconName="won" fontSize="0.8rem" />
			<strong>{addCommas(accumReward)}</strong>)
		</span>
	{/if}
</div>
