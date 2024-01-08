<script lang="ts">
	import { page } from '$app/stores';
	import { accessApi } from '$lib/api/access';
	import Button from '$lib/components/Button.svelte';
	import LoginBox from '$lib/components/LoginBox.svelte';
	import { onMount } from 'svelte';
	let isUid: boolean;
	const checkUid = async () => {
		const params = {
			uid: $page.params.uid
		};
		const data = await accessApi('auth/checkUid', params);
		isUid = data.msg === 'ok' ? true : false;
	};
	onMount(async () => {
		await checkUid();
	});
	let reId = '';
	const gotoSign = () => {
		location.href = reId;
	};
</script>

{#if isUid}
	<LoginBox />
{:else}
	<div class="text-surface-300 text-center wrap">
		유효하지 않은 주소입니다.
		<form>
			<div class="input-group input-group-divider grid-cols-12 mt-3">
				<input
					type="number"
					bind:value={reId}
					placeholder="추천아이디를 입력하세요."
					class="col-span-7"
				/>
				<Button
					btnType="submit"
					addClass="variant-filled-secondary col-span-5"
					btnText="이동"
					onClick={gotoSign}
				/>
			</div>
		</form>
	</div>
{/if}

<style>
	.wrap {
		max-width: 400px;
		width: 80%;
		margin: 100px auto 0;
	}
	input {
		text-align: center;
	}
</style>
