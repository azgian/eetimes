<script lang="ts">
	import { page } from '$app/stores';
	import { isLoggedIn } from '$lib/api/store';
	import IconXi from '$lib/components/IconXi.svelte';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	const pageRouteId = String($page.route.id).split('/');
	const baseUrl = pageRouteId[1];
	const tabsArr = [
		{ link: baseUrl, name: '개인정보처리방침', mbLv: 0 },
		{ link: 'termsOfUse', name: '이용약관', mbLv: 0 }
	];
	let gotoUrl = $isLoggedIn ? '/' : '/login';
</script>

<div id="logo-box" class="flex justify-center">
	<a href={gotoUrl}>
		<img src="/images/logo.png" alt="logo" />
	</a>
</div>
<div class="flex justify-between items-center my-4">
	<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
</div>
<div class="text-surface-200">
	<slot />
</div>
<div class="flex justify-between items-center mt-8">
	<TabMenuBox {tabsArr} {baseUrl} currUrl={$page.params.slug} />
</div>
<div class="text-center text-surface-500 home">
	<a href={gotoUrl}><IconXi iconName="home" fontSize="2.5rem" /></a>
</div>

<style>
	#logo-box {
		width: 310px;
		margin: 15px auto;
	}
	#logo-box img {
		width: 60px;
		border-radius: 25%;
	}
	.home {
		margin: 50px;
	}
</style>
