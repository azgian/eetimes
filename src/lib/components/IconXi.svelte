<script lang="ts">
	export let iconName: string;
	export let addClass: string = '';
	export let fontSize: string = '1rem';
</script>

<i class="xi xi-{iconName} {addClass}" style="font-size:{fontSize};" />
