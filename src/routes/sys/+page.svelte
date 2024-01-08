<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import IconXi from '$lib/components/IconXi.svelte';
	import { scale } from 'svelte/transition';
	import MbItemsList from './MbItemsList.svelte';
	import ReqMbDetail from './ReqMbDetail.svelte';
	import { searchMbList } from '$lib/api/store';
	import { addCommas } from '$lib/config';
	import { onMount } from 'svelte';
	import SearchMbList from '$lib/components/SearchMbList.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import Button from '$lib/components/Button.svelte';
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

	const deleteMb = async (mbId: string) => {
		if (!confirm('회원계정을 삭제하시겠습니까?')) return false;
		const params = {
			mbId
		};
		const data = await accessApi('member/deleteMb', params);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: '회원계정이 삭제되었습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			const mbsBox = document.querySelector(`.mbs-box[data-mbId="${mbId}"]`);
			if (mbsBox) mbsBox.remove();
		}
	};
</script>

<SearchMbList />

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
					<div>
						<Button
							addClass="variant-ghost btn-icon btn-icon-sm"
							btnType="button"
							iconNameS="trash-o"
							onClick={() => deleteMb(_mb.mb_id)}
						/>
					</div>
				</div>
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
