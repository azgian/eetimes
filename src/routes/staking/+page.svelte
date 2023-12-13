<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import { mb } from '$lib/api/store';
	import { scale } from 'svelte/transition';
	import StakingDetail from './StakingDetail.svelte';
	let mbItemsList: any[] = [];
	const getMbItemsList = async () => {
		const params = {
			mbId: $mb.mb_id
		};
		const data = await accessApi('eetimes/getMbItemsList', params);
		mbItemsList = data;
	};
	getMbItemsList();
</script>

<div in:scale={{ duration: 150 }}>
	{#each mbItemsList as mbItem}
		<StakingDetail {mbItem} />
	{/each}
</div>
