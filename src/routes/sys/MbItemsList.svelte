<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import MbItemDetail from './MbItemDetail.svelte';
	export let mbId: string;
	let mbItemsList: any[] = [];
	const getMbItemsList = async () => {
		const params = {
			mbId
		};
		const data = await accessApi('eetimes/getMbItemsList', params);
		mbItemsList = data;
	};
	getMbItemsList();
</script>

{#each mbItemsList as item}
	<MbItemDetail _id={item._id} />
{/each}
