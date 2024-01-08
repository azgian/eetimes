<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import { scale } from 'svelte/transition';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import IconXi from '$lib/components/IconXi.svelte';
	import { onMount } from 'svelte';
	import { getConfig } from '$lib/config';
	import { writableConfig } from '$lib/api/store';
	const toastStore = getToastStore();
	let val: string;
	let r1: string;
	let r2: string;
	let maxUsdt: string;
	let maxKrw: string;
	onMount(async () => {
		writableConfig.set(await getConfig());
		r1 = $writableConfig.rewards ? $writableConfig.rewards.split(',')[0] : '';
		r2 = $writableConfig.rewards ? $writableConfig.rewards.split(',')[1] : '';
		maxKrw = $writableConfig.max_rate ? $writableConfig.max_rate.split(',')[0] : '';
		maxUsdt = $writableConfig.max_rate ? $writableConfig.max_rate.split(',')[1] : '';
	});
	const setConfig = async (fld: string, val: string) => {
		if (fld === 'rewards') {
			val = r1 + ',' + r2;
		}
		if (fld === 'max_rate') {
			val = maxKrw + ',' + maxUsdt;
		}
		const params = {
			fld,
			val
		};
		console.log('params: ', params);
		const data = await accessApi('eetimes/setConfig', params);
		if (data.msg === 'success') {
			const t: ToastSettings = {
				message: `설정되었습니다.`,
				timeout: 3000
			};
			toastStore.trigger(t);
		}
	};
</script>

<div in:scale={{ duration: 150 }}>
	<form class="mb-4">
		<label class="label">
			<small class="text-surface-300 ms-2"
				><IconXi iconName="wallet"></IconXi> 추천보상율 설정</small
			>
			<div class="input-group input-group-divider grid-cols-12">
				<input type="number" step="0.01" class="col-span-4" placeholder="1대" bind:value={r1} />
				<input type="number" step="0.01" class="col-span-4" placeholder="2대" bind:value={r2} />
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-4"
					btnText="설정"
					iconNameS="pen"
					onClick={() => setConfig('rewards', val)}
				/>
			</div>
		</label>
	</form>
	<form class="mb-4">
		<label class="label">
			<small class="text-surface-300 ms-2"
				><IconXi iconName="wallet"></IconXi> 월수익 상한선 설정</small
			>
			<div class="input-group input-group-divider grid-cols-12">
				<input type="number" step="0.01" class="col-span-4" placeholder="KRW" bind:value={maxKrw} />
				<input
					type="number"
					step="0.01"
					class="col-span-4"
					placeholder="USDT"
					bind:value={maxUsdt}
				/>
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-4"
					btnText="설정"
					iconNameS="pen"
					onClick={() => setConfig('max_rate', val)}
				/>
			</div>
		</label>
	</form>
</div>

<style>
	input {
		text-align: center;
	}
</style>
