<script lang="ts">
	import { isLoggedIn } from '$lib/api/store';
</script>

{#if $isLoggedIn}
	<slot />
{/if}
