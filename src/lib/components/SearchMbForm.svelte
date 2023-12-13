<script lang="ts">
	import { accessApi } from '$lib/api/access';
	import { searchMbList } from '$lib/api/store';
	let searchMbName = '';
	const searchMb = async () => {
		const params = {
			searchMbName
		};
		const data = await accessApi('member/getMbsList', params);
		searchMbList.set(data);
		if (searchMbName === '') searchMbList.set([]);
	};
</script>

<div class="mb-4 ms-2">
	<input
		type="search"
		placeholder="이름, 아이디 검색"
		class="input"
		bind:value={searchMbName}
		on:keyup={searchMb}
	/>
</div>

<style>
	input {
		text-align: center;
	}
</style>
