<script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import { addCommas, getItemPrice } from '$lib/config';
	import { onMount } from 'svelte';
	export let mbItem: any = {};
	let currPrice: number;
	let accumReward: number;
	let accumItem: number;
	let startDate = new Date(mbItem.start_day); // Replace with your start date
	let today = new Date();
	let diffInTime = today.getTime() - startDate.getTime();
	let diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
	onMount(async () => {
		currPrice = await getItemPrice(mbItem.item_name);
		accumReward = (diffInDays * mbItem.amount * currPrice * mbItem.rate) / 100;
		accumItem = (diffInDays * mbItem.amount * mbItem.rate) / 100;
	});
</script>

<div class="p-3 mb-4 variant-ghost walletBox">
	<div class="flex justify-between">
		{#if mbItem.item_name}
			<img
				src="./images/coin_{mbItem.item_name.toLowerCase()}.jpg"
				alt="logo"
				class="coin_logo me-3"
			/>
		{/if}
		<div>
			{#if mbItem.start_day === '0000-00-00'}
				<span class="badge variant-filled-tertiary">접수대기중</span>
			{/if}
		</div>
	</div>
	<div class="table-container mt-2">
		<table class="table table-hover">
			<tr>
				<th>기간</th>
				<td>
					{mbItem.start_day !== '0000-00-00' ? mbItem.start_day : ''}
					{mbItem.end_day !== '0000-00-00' ? ' ~ ' + mbItem.end_day : ''}
					({mbItem.period}일)
				</td>
			</tr>
			<tr>
				<th>보상율</th>
				<td>{@html mbItem.rate ? mbItem.rate * 1 + ' <small>% / Daily</small>' : ''}</td>
			</tr>
			<tr>
				<th>스테이킹<br />수량</th>
				<td class="text-primary-300">
					{@html mbItem.amount
						? '<strong>' +
						  addCommas(mbItem.amount) +
						  '</strong> <small class="text-surface-100">' +
						  mbItem.item_name +
						  '</small>'
						: ''}
					<strong class="ms-2 text-success-300"
						>(<IconXi iconName="won" fontSize="0.8rem" />
						{addCommas(Math.round(currPrice * mbItem.amount))})</strong
					>
				</td>
			</tr>
			<tr>
				<th>누적<br />보상수량</th>
				<td class="text-primary-300">
					{diffInDays ? diffInDays : '0'}일째<br />
					{@html accumItem
						? '<strong>' +
						  addCommas(Math.round(accumItem * 100) / 100) +
						  '</strong> <small class="text-surface-100">' +
						  mbItem.item_name +
						  '</small>'
						: '0'}
					{#if accumReward}
						<span class="ms-2 text-success-300">
							(<IconXi iconName="won" fontSize="0.8rem" />
							<strong>{addCommas(accumReward)}</strong>)
						</span>
					{/if}
				</td>
			</tr>
		</table>
	</div>
</div>

<style>
	.walletBox {
		border-radius: 10px;
	}
	.coin_logo {
		width: 120px;
		border-radius: 25px;
	}
	tr {
		@apply variant-ghost;
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
</style>
