<script lang="ts">
	import { page } from '$app/stores';
	import { resetTimer } from '$lib/config';
	import { scale } from 'svelte/transition';
	import { mb } from '$lib/api/store';
	export let tabsArr: { link: string; name: string; mbLv: number }[];
	export let currUrl: string;
	export let baseUrl: string;
</script>

<div id="tabMenuBox" in:scale={{ duration: 150 }} class="flex justify-center">
	<div class="tabMenuBox btn-group variant-ringed">
		{#each tabsArr as tab}
			{@const isBaseUrl = $page.url.pathname === '/' + baseUrl ? baseUrl + '/' : ''}
			{@const tabLink = tab.link === baseUrl ? './' : tab.link}
			{@const isCurrUrl = !currUrl ? './' : currUrl}
			{#if ($mb && $mb.mb_level >= tab.mbLv) || !tab.mbLv}
				<a
					href={isBaseUrl + tabLink}
					class="btn {tabLink === isCurrUrl ? 'variant-ghost-tertiary' : ''}"
					on:click={resetTimer}
					>{tab.name}
				</a>
			{/if}
		{/each}
	</div>
</div>

<style>
	#tabMenuBox {
		margin-bottom: 15px;
	}
</style>
