<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import IconXi from '$lib/components/IconXi.svelte';
	import { scale, slide } from 'svelte/transition';
	import MbItemsList from './MbItemsList.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import ReqMbDetail from './ReqMbDetail.svelte';
	import { searchMbList } from '$lib/api/store';
	import { addCommas } from '$lib/config';
	import { onMount } from 'svelte';
	const toastStore = getToastStore();
	let mbsList: any[] = [];
	let nextMbsList: any[] = [];
	const getMbsList = async (start: number, limit: number) => {
		const params = {
			start,
			limit
		};
		const data = await accessApi('member/getMbsList', params);
		mbsList = data;
	};
	getMbsList(1, 15);
	let reqMbList: any[] = [];
	const reqMbItemList = async () => {
		const data = await accessApi('eetimes/reqMbItemList');
		// if (dev) console.log('reqMbItemList data: ', data);
		reqMbList = data;
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: '신청되었습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
		}
	};
	reqMbItemList();
	searchMbList.set([]);
	let totalCnt: number;
	const getTotalCnt = async () => {
		const data = await accessApi('member/getTotalCnt');
		totalCnt = data.totalCnt;
	};
	getTotalCnt();
	let nextPaging: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(() => {
			const start = mbsList.length + 1;
			if (start > totalCnt) return;
			getMbsList(start, 15);
		});
		observer.observe(nextPaging);
	});
	$: mbsList = [...mbsList, ...nextMbsList];
</script>

{#if $searchMbList.length > 0}
	<div class="mb-6" transition:slide>
		<IconXi iconName="search" />
		<small class="text-surface-300">검색명단: ({$searchMbList.length})</small>
		{#each $searchMbList as mb}
			<div class="mb-2 variant-ghost-primary mbs-box">
				<h3 class="p-2 variant-ghost-secondary ps-4">
					<span class="mt-1 me-2">
						<IconXi iconName="user-circle" />
						{mb.mb_name ? mb.mb_name : mb.mb_id}
					</span>
					<span class="mt-1 badge variant-ringed-primary me-2">
						<IconXi iconName="mobile" addClass="me-2" />
						{mb.mb_hp ? mb.mb_hp : ''}
					</span>
					<span class="mt-1 badge variant-ringed-primary">
						<IconXi iconName="mail" addClass="me-2" />
						{mb.mb_email ? mb.mb_email : ''}
					</span>
				</h3>
				<MbItemsList mbId={mb.mb_id} />
			</div>
		{/each}
	</div>
{/if}

<div in:scale={{ duration: 150 }}>
	{#if reqMbList.length > 0}
		<div class="mb-6">
			<IconXi iconName="check-circle-o" />
			<small class="text-surface-300">신청대기: ({reqMbList.length})</small>
			{#each reqMbList as req}
				<ReqMbDetail {req} />
			{/each}
		</div>
	{/if}
	{#if mbsList}
		<IconXi iconName="user-circle" />
		<small class="text-surface-300">회원명단: ({totalCnt ? addCommas(totalCnt) : ''})</small>
		{#each mbsList as _mb}
			<div class="pb-1 mb-3 variant-ghost mbs-box">
				<h3 class="p-2 variant-ghost-secondary ps-4">
					<span class="mt-1 me-2">
						<IconXi iconName="user-circle" />
						{_mb.mb_name ? _mb.mb_name : _mb.mb_id}
					</span>
					<span class="mt-1 badge variant-ringed-primary me-2">
						<IconXi iconName="mobile" addClass="me-2" />
						{_mb.mb_hp ? _mb.mb_hp : ''}
					</span>
					<span class="mt-1 badge variant-ringed-primary">
						<IconXi iconName="mail" addClass="me-2" />
						{_mb.mb_email ? _mb.mb_email : ''}
					</span>
				</h3>
				<MbItemsList mbId={_mb.mb_id} />
			</div>
		{/each}
		<div bind:this={nextPaging} />
	{/if}
</div>

<style>
	.mbs-box {
		border-radius: 5px;
	}
	h3 {
		border-radius: 5px 5px 0 0;
	}
</style>
