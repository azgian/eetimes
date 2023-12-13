<script lang="ts">
	import '../app.postcss';
	import { isLoggedIn, mb } from '$lib/api/store';
	import { initializeStores, AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import TopBar from '$lib/components/TopBar.svelte';
	import LogoutTimer from '$lib/components/LogoutTimer.svelte';
	import MenuBox from '$lib/components/menuBox.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	onMount(() => {
		if (
			!$isLoggedIn &&
			$page.route.id !== '/login' &&
			$page.route.id !== '/guide' &&
			$page.route.id !== '/guide/termsOfUse'
		)
			goto('/login');
		else if ($isLoggedIn && $page.route.id === '/login') goto('/');
	});
</script>

<Toast position="t" />

<AppShell
	regionPage="relative"
	slotPageHeader="sticky top-0 z-10"
	slotSidebarLeft="bg-surface-900"
	slotPageFooter="bg-surface-900 z-10"
>
	<svelte:fragment slot="pageHeader">
		{#if $isLoggedIn}
			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
				<svelte:fragment slot="lead">
					<TopBar />
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if $isLoggedIn}
						<LogoutTimer />
					{/if}
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<div class={$isLoggedIn ? 'paddingLeft320' : ''}>
		<div id="container-wrap">
			<div id="container-box">
				<slot />
			</div>
			<!-- <br />
			<br />
			<pre>
				{JSON.stringify($page.route.id, null, 2)}
				{JSON.stringify($mb, null, 2)}
				{JSON.stringify($isLoggedIn, null, 2)}
			</pre> -->
		</div>
	</div>
	{#if $isLoggedIn}
		<MenuBox />
	{/if}
</AppShell>

<style>
	.paddingLeft320 {
		padding-left: 320px;
	}
	#container-wrap {
		position: relative;
		width: 100%;
	}
	#container-box {
		position: relative;
		max-width: 800px;
		width: 100%;
		height: 100%;
		padding: 15px;
		padding-bottom: 50px;
		margin: 0 auto;
	}
	@media (max-width: 1020.98px) {
		.paddingLeft320 {
			padding-left: 0px;
		}
		#container-box {
			padding-bottom: 100px;
		}
	}
</style>
