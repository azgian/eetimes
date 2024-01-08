<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import { mb } from '$lib/api/store';
	import IconXi from '$lib/components/IconXi.svelte';
	import { addCommas } from '$lib/config';
	import Detail from './Detail.svelte';
	let mbsList: any[] = [];
	let uId = $mb.uid ? $mb.uid : '';
	const getMbsItemList = async () => {
		const params = {
			uId
		};
		const data = await accessApi('eetimes/getMbsItemList', params);
		mbsList = data;
		console.log('mbsList', mbsList);
	};
	getMbsItemList();
</script>

{#each mbsList as mbItem}
	<div class="variant-ghost mb-3 mbs-box pb-1">
		<div class="variant-ghost-secondary p-2 name-box flex justify-between items-center">
			<span>
				<IconXi iconName="user-circle" />
				{mbItem.mb_name ? mbItem.mb_name : mbItem.mb_id}
				<small class="text-surface-300">[{mbItem.dn_lv}대]</small>
			</span>
			<small>{mbItem.start_day.substring(2)}~{mbItem.end_day.substring(2)}</small>
		</div>
		<div class="p-2 flex gap-1">
			{#if mbItem.item_name}
				<img
					src="./images/coin_{mbItem.item_name.toLowerCase()}.jpg"
					alt="logo"
					class="coin_logo me-1"
				/>
			{/if}
			<strong class="text-success-300 me-2">{addCommas(mbItem.amount)}</strong>
		</div>
		<Detail {mbItem} />
	</div>
{/each}

<style>
	.coin_logo {
		width: 80px;
		border-radius: 25px;
	}
</style>
