<script lang="ts">
	import { page } from '$app/stores';
	import { sys7Lv } from '$lib/config';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import SearchMbForm from '$lib/components/SearchMbForm.svelte';
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '회원', mbLv: sys7Lv },
		{ link: 'reward', name: '보상', mbLv: sys7Lv },
		{ link: 'item', name: '아이템', mbLv: sys7Lv }
	];
	import { isLoggedIn } from '$lib/api/store';
</script>

{#if $isLoggedIn}
	<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
	<div>
		{#if $page.route.id === '/sys'}
			<SearchMbForm />
		{/if}
	</div>
	<slot />
{/if}
