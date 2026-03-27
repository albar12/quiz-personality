<script lang="ts">
	import { Navbar } from '$lib';
	import { page } from '$app/stores';
	$: hideNavbar = $page.data?.hideNavbar;
</script>

{#if !hideNavbar}
	<Navbar />
{/if}

<main>
	<slot />
</main>
