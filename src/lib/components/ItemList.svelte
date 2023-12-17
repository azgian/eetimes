<script lang="ts">
	import { getItemPrice } from '$lib/config';
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import ItemListDetail from './itemListDetail.svelte';
	import { scale, slide } from 'svelte/transition';
	export let itemId: number;
	let showDetail = false;
	let itemInfo: any = {};
	let itemPrice: number;
	const getItemInfo = async () => {
		const params = {
			itemId
		};
		const data = await accessApi('eetimes/getItemInfo', params);
		itemInfo = data;
		itemPrice = await getItemPrice(itemInfo.it_name);
	};
	getItemInfo();
</script>

{#if itemInfo}
	<div class="mb-4 variant-ghost itemWrap">
		<div class="flex items-center justify-between p-3 itemBox">
			{#if itemInfo.it_name}
				<div>
					<img
						src="./images/coin_{itemInfo.it_name.toLowerCase()}.jpg"
						alt="logo"
						class="coin_logo"
					/>
				</div>
			{/if}
			<div class="text-center infoBox grow">
				<span class="text-primary-300"
					>{itemInfo.it_rate ? itemInfo.it_rate * 1 : ''}<small>%</small></span
				>
				<span class="total text-primary-300">
					({itemInfo.it_rate && itemInfo.it_period
						? Math.floor(itemInfo.it_rate * itemInfo.it_period * 100) / 100
						: ''}<small>%</small>)
				</span>
				<span class="text-success-300"
					>{itemInfo.it_period ? itemInfo.it_period : ''}<small>일</small></span
				>
			</div>
			<div>
				<Button
					addClass="variant-ghost btn-icon btn-icon-sm"
					iconNameS="ellipsis-h"
					iconNameAlt="close"
					showAlt={showDetail}
					onClick={() => (showDetail = !showDetail)}
				/>
			</div>
		</div>
		{#if showDetail}
			<div in:scale={{ duration: 150 }} out:slide={{ duration: 150 }}>
				<ItemListDetail {itemInfo} {itemPrice} />
			</div>
		{/if}
	</div>
{/if}

<style>
	.itemWrap {
		border-radius: 10px;
	}
	.coin_logo {
		width: 150px;
		border-radius: 25px;
		border: solid 1px #666;
	}
	.itemBox {
		vertical-align: middle;
	}
	.infoBox span {
		margin-left: 15px;
		font-size: 2rem;
		font-weight: 700;
	}
	.infoBox span small {
		margin-left: 5px;
		font-size: 1rem;
		font-weight: 400;
		color: #ccc;
	}
	.infoBox .total {
		margin-left: 1.25px;
		font-size: 1rem;
		font-weight: 400;
	}
	@media (max-width: 468px) {
		.infoBox span {
			margin-left: 10px;
			font-size: 1.5rem;
			display: block;
		}
		.infoBox span small {
			font-size: 0.8rem;
		}
		.infoBox .total {
			font-size: 1rem;
		}
	}
	@media (max-width: 300px) {
		.coin_logo {
			width: 100px;
		}
	}
</style>
