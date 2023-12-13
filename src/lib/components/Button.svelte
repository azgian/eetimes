<script lang="ts">
	import IconXi from '$lib/components/IconXi.svelte';
	import GoogleSpin from '$lib/components/GoogleSpin.svelte';
	export let btnClass: string = 'btn';
	export let addClass: string = '';
	export let btnText: string = '';
	export let btnTextAlt: string = '';
	export let gsSize: string = '1.5rem';
	export let showGs = false;
	export let iconNameS: string = '';
	export let iconNameE: string = '';
	export let iconNameAlt: string = '';
	export let showAlt = false;
	export let btnDisabled = false;
	// export let fontSize: string = '1rem';
	export let btnType: 'button' | 'submit' | 'reset' = 'button';
	export let onClick: Function;
	export const actClick = () => {
		if (btnTextAlt) showAlt = !showAlt;
		if (onClick) onClick();
	};
</script>

<button class="{btnClass} {addClass}" on:click={actClick} type={btnType} disabled={btnDisabled}>
	{#if showGs}
		<GoogleSpin size={gsSize} />
	{/if}
	{#if iconNameS}
		{#if !showAlt}
			<IconXi iconName={iconNameS} addClass="m2-2" />
		{:else}
			<IconXi iconName={iconNameAlt} addClass="m2-2" />
		{/if}
	{/if}
	{#if btnText}
		<span class="mx-2">
			{#if !showAlt}
				{btnText}
			{:else}
				{btnTextAlt}
			{/if}
		</span>
	{/if}
	{#if iconNameE}
		{#if !showAlt}
			<IconXi iconName={iconNameE} />
		{:else}
			<IconXi iconName={iconNameAlt} />
		{/if}
	{/if}
</button>
