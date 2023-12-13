<script lang="ts">
	import { page } from '$app/stores';
	import { resetTimer, sys7Lv } from '$lib/config';
	import { mb } from '$lib/api/store';
	import IconXi from '$lib/components/IconXi.svelte';
	const menuList = [
		{ slug: 'home', name: 'Home', icon: 'home', lv: 2 },
		// { slug: 'news', name: 'News', icon: 'paper-o', lv: 2 },
		{ slug: 'staking', name: 'Staking', icon: 'server', lv: 2 },
		{ slug: 'myInfo', name: 'MyInfo', icon: 'user-o', lv: 2 },
		{ slug: 'sys', name: 'Sys', icon: 'cog', lv: sys7Lv }
	];
</script>

<div id="menu-wrap">
	<nav id="menu-box">
		{#each menuList as siteMenu, i}
			{#if $mb && $mb.mb_level >= siteMenu.lv}
				<a href="/{i === 0 ? '' : siteMenu.slug}" on:click={resetTimer}>
					<li
						class={(i === 0 && $page.url.pathname === '/') ||
						$page.url.pathname.startsWith('/' + siteMenu.slug)
							? 'current'
							: undefined}
					>
						<IconXi iconName={siteMenu.icon} fontSize="30px" />
						<div class="menuName">
							{siteMenu.name}
						</div>
					</li>
				</a>
			{/if}
		{/each}
	</nav>
</div>

<style>
	#menu-wrap {
		position: fixed;
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: column;
		align-items: end;
		width: 320px;
		height: 100vh;
		background: #151547;
		z-index: 9;
		padding-top: 95px;
	}
	#menu-box {
		width: 220px;
	}
	#menu-box a {
		text-decoration: none;
	}
	#menu-box li {
		position: relative;
		list-style-type: none;
		height: 50px;
		line-height: 50px;
		padding-right: 15px;
		text-align: right;
		border-radius: 25px 0 0 25px;
		color: #60cdf8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 15px;
		font-size: 1.5rem;
	}
	#menu-box li:hover {
		text-decoration: none;
		background: rgba(73, 73, 245, 0.3);
	}
	#menu-box li.current {
		background: rgba(73, 73, 245, 0.8);
		color: #151547;
	}
	@media (max-width: 1020.98px) {
		#menu-wrap {
			position: fixed;
			left: 0px;
			bottom: 0px;
			top: auto;
			width: 100%;
			height: 60px;
			padding-top: 0;
		}
		#menu-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		#menu-box a {
			flex-grow: 1;
			height: 100%;
		}
		#menu-box li {
			height: 100%;
			line-height: 10%;
			text-align: center;
			border-radius: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 0.75rem;
		}
		#menu-box li .menuName {
			position: absolute;
			bottom: 8px;
			left: 0px;
			width: 100%;
			text-align: center;
		}
	}
	@media (max-width: 300px) {
		.menuName {
			visibility: hidden;
		}
	}
</style>
