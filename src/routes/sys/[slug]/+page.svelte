<script lang="ts">
	import { page } from '$app/stores';
	import Reward from './Reward.svelte';
	import Item from './Item.svelte';
</script>

{#if $page.params.slug === 'reward'}
	<Reward />
{/if}
{#if $page.params.slug === 'item'}
	<Item />
{/if}
