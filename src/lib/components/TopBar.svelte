<script lang="ts">
	import { resetTimer } from '$lib/config';
	import { mb } from '$lib/api/store';
	import { lvNameElm } from '$lib/config';
	import IconXi from '$lib/components/IconXi.svelte';
</script>

<div class="flex justify-between">
	<a href="/" on:click={resetTimer}>
		<div id="logo-box" class="flex justify-center">
			<img src="/images/logo.png" alt="logo" />
		</div>
	</a>
	<div id="user-box" class="flex flex-col justify-center">
		<div class="flex items-center justify-start mb-1">
			<IconXi iconName="profile" fontSize="35px" />
			<span class="user-name">{$mb?.mb_name ? $mb?.mb_name : ''}</span>
			<span class="user-level">{@html $mb?.mb_level ? lvNameElm(Number($mb?.mb_level)) : ''}</span>
		</div>
	</div>
</div>

<style>
	#logo-box {
		width: 310px;
	}
	#logo-box img {
		width: 60px;
		border-radius: 25%;
	}
	#user-box {
		font-size: 2rem;
		width: 400px;
	}
	#user-box .user-name {
		margin-left: 10px;
		font-size: 0.95rem;
	}
	#user-box .user-level {
		margin-left: 5px;
		font-size: 1rem;
	}
	@media (max-width: 400.98px) {
		#user-box {
			max-width: 400px;
		}
	}
	@media (max-width: 1020.98px) {
		#logo-box {
			display: none;
		}
	}
</style>
