<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import { resetMb } from '$lib/api/access';
	import { mb } from '$lib/api/store';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	let mbMemo = $mb && $mb.mb_memo ? JSON.parse($mb.mb_memo) : {};
	export let itemName: string;
	export let itemLogo: string;
	let itemMemo = mbMemo[itemName] && mbMemo[itemName].memo ? mbMemo[itemName].memo : '';
	let itemTag = mbMemo[itemName] && mbMemo[itemName].tag ? mbMemo[itemName].tag : '';
	const setMbMemo = async (itemName: string, memo: any, isTag = false) => {
		if (!memo) {
			const t: ToastSettings = {
				message: '지갑주소가 입력되지 않았습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			return false;
		}
		const params = {
			itemName,
			memo,
			isTag
		};
		// console.log('setMbMemo params: ', params);
		const data = await accessApi('eetimes/setMbMemo', params);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: '저장되었습니다.',
				timeout: 3000
			};
			toastStore.trigger(t);
			resetMb($mb.mb_id);
		}
	};
</script>

<div class="p-3 mb-6 variant-ghost walletBox">
	<img src="./images/{itemLogo}.jpg" alt="logo" class="mb-2 coin_logo" />
	<form>
		<label class="label">
			<div class="grid-cols-12 input-group input-group-divider">
				<input type="text" class="col-span-10" bind:value={itemMemo} placeholder="지갑주소" />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-2"
					iconNameS="pen"
					iconNameAlt="pen"
					onClick={() => setMbMemo(itemName, itemMemo)}
				/>
			</div>
		</label>
	</form>
	<form>
		{#if itemName === 'XRP'}
			<label class="mt-2 label">
				<div class="grid-cols-12 input-group input-group-divider">
					<input type="text" class="col-span-10" bind:value={itemTag} placeholder="D-Tag" />
					<Button
						btnType="submit"
						addClass="variant-filled-secondary col-span-2"
						iconNameS="pen"
						iconNameAlt="pen"
						onClick={() => setMbMemo(itemName, itemTag, true)}
					/>
				</div>
			</label>
		{/if}
	</form>
</div>

<style>
	.coin_logo {
		width: 120px;
		border-radius: 25px;
	}
	.walletBox {
		border-radius: 25px;
	}
</style>
