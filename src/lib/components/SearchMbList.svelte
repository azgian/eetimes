<script lang="ts">
	import { searchMbList } from '$lib/api/store';
	import IconXi from '$lib/components/IconXi.svelte';
	import { slide } from 'svelte/transition';
</script>

{#if $searchMbList.length > 0}
	<div class="mb-6" transition:slide>
		<IconXi iconName="search" />
		<small class="text-surface-300">검색명단: ({$searchMbList.length})</small>
		{#each $searchMbList as mb}
			<div class="mb-2 variant-ghost-primary mbs-box">
				<h3 class="p-2 variant-ghost-secondary ps-4">
					<span class="mt-1 me-1">
						<IconXi iconName="user-circle" />
						{mb.mb_name ? mb.mb_name : mb.mb_id}
					</span>
					<span class="mt-1 badge variant-ringed-primary me-1">
						<IconXi iconName="mobile" />
						{mb.mb_hp ? mb.mb_hp : ''}
					</span>
					<span class="mt-1 badge variant-ringed-primary">
						<IconXi iconName="mail" />
						{mb.mb_email ? mb.mb_email : ''}
					</span>
				</h3>
			</div>
		{/each}
	</div>
{/if}
