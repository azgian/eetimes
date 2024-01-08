<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import { mb } from '$lib/api/store';
	import IconXi from '$lib/components/IconXi.svelte';
	import SearchMbList from '$lib/components/SearchMbList.svelte';
	import { addCommas } from '$lib/config';
	import { onMount } from 'svelte';
	let mbsList: any[] = [];
	let nextMbsList: any[] = [];
	let reId = $mb.uid ? $mb.uid : '';
	const getMbsList = async (start: number, limit: number) => {
		const params = {
			start,
			limit,
			reId
		};
		const data = await accessApi('member/getMbsList', params);
		if (start > 1) nextMbsList = data;
		else mbsList = data;
	};
	getMbsList(1, 15);
	let totalCnt: number;
	const getTotalCnt = async () => {
		const params = {
			reId
		};
		const data = await accessApi('member/getTotalCnt', params);
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

<SearchMbList />

{#if mbsList}
	<IconXi iconName="user-circle" />
	<small class="text-surface-300">회원명단: ({totalCnt ? addCommas(totalCnt) : ''})</small>
	{#each mbsList as _mb}
		<div class="variant-ghost mb-3 mbs-box pb-1" data-mbId={_mb.mb_id}>
			<div class="variant-ghost-secondary p-2 name-box flex justify-between">
				<div class="mt-1">
					<span>
						<IconXi iconName="user-circle" />
						{_mb.mb_name ? _mb.mb_name : _mb.mb_id}
					</span>
					<span class="badge variant-ringed-primary">
						<IconXi iconName="mobile" />{_mb.mb_hp ? _mb.mb_hp : ''}
					</span>
					<span class="badge variant-ringed-primary">
						<IconXi iconName="mail" />{_mb.mb_email ? _mb.mb_email : ''}
					</span>
				</div>
				<div></div>
			</div>
		</div>
	{/each}
	<div bind:this={nextPaging} />
{/if}
