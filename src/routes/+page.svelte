<script lang="ts">
	import { goto } from '$app/navigation';
	import { accessApi } from '$lib/api/access';
	import { mb, isLoggedIn } from '$lib/api/store';
	import Button from '$lib/components/Button.svelte';
	import IconXi from '$lib/components/IconXi.svelte';
	import ItemList from '$lib/components/ItemList.svelte';
	import LoginBox from '$lib/components/LoginBox.svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	let itemList: any[] = [];
	const getItemList = async () => {
		const data = await accessApi('eetimes/getItemList');
		itemList = data;
	};
	onMount(async () => {
		await getItemList();
	});
</script>

{#if $isLoggedIn}
	<div in:scale={{ duration: 150 }}>
		{#if !($mb.mb_name && $mb.mb_hp && $mb.mb_email)}
			<aside class="p-4 alertBox variant-ghost-primary">
				<IconXi iconName="profile" />
				<span class="me-2"> 회원이름, 전화번호, 이메일 등 회원정보를 입력하세요. </span>
				<Button
					addClass="variant-filled-secondary btn-sm"
					btnText="회원정보 입력하기"
					onClick={() => goto('/myInfo')}
				/>
			</aside>
		{/if}
		{#if itemList.length > 0}
			<div class="mt-6">
				{#each itemList as item}
					<ItemList itemId={item.it_id} />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<LoginBox />
{/if}

<style>
	.alertBox {
		border-radius: 10px;
	}
</style>
