<script lang="ts">
	import { page } from '$app/stores';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import SearchMbForm from '$lib/components/SearchMbForm.svelte';
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '회원', mbLv: 2 },
		{ link: 'item', name: '아이템', mbLv: 2 }
	];
</script>

<div class="flex justify-between items-center">
	<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
	<div>
		{#if $page.route.id === '/sys'}
			<SearchMbForm />
		{/if}
	</div>
</div>

<slot />
