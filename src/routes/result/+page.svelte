<script lang="ts">
	import { goto } from '$app/navigation';
	import { resultStore } from '$lib';
	import ResultScreen from '$lib/screens/result/ResultScreen.svelte';
	import { onMount } from 'svelte';
	$: result = $resultStore;

	onMount(() => {
		// Cek jika data kosong, arahkan kembali ke home
		if (!result) {
			goto('/', { replaceState: true });
		}
	});
</script>

<ResultScreen quiz={result} />
