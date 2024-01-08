<script lang="ts">
	import { mb, isLoggedIn } from '$lib/api/store';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	import SearchMbForm from '$lib/components/SearchMbForm.svelte';
	import { page } from '$app/stores';
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '내 정보', mbLv: 2 },
		{ link: 'members', name: '회원명단', mbLv: 2 }
	];
</script>

{#if $isLoggedIn}
	<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
	<div>
		{#if $page.params.slug === 'members'}
			<SearchMbForm reId={$mb?.uid} />
		{/if}
	</div>
	<slot />
{/if}
