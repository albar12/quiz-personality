<script lang="ts">
	import { resultStore } from '$lib';
	import ResultScreen from '$lib/screens/result/ResultScreen.svelte';
	$: result = $resultStore;
</script>

<ResultScreen quiz={result} />
