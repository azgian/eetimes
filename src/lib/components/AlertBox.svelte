<script lang="ts">
	import IconXi from './IconXi.svelte';
	export let iconName: string = 'info';
	export let addClass: string = '';
	export let fontSize: string = '2rem';
	export let alertClass: string = 'variant-soft-surface';
	export let title: string = '';
	export let message: string = '';
	export let actionContent: string = '';
</script>

<aside class="alert {alertClass}">
	<div>
		<IconXi {iconName} {addClass} {fontSize} />
	</div>
	<div class="alert-message">
		{#if title}
			<h3 class="h3">{title}</h3>
		{/if}
		{#if message}
			<p>{@html message}</p>
		{/if}
	</div>
	{#if actionContent}
		<div class="alert-actions">
			{@html actionContent}
		</div>
	{/if}
</aside>
