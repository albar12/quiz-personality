<script lang="ts">
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import {
		faAddressBook,
		faAddressCard,
		faDiagramProject,
		faHome,
		faQuestion
	} from '@fortawesome/free-solid-svg-icons';
	import { colors } from '$lib/constants/colors';

	let open = false;

	function toggleSidebar() {
		open = !open;
	}
</script>

<nav
	aria-label="Global"
	style="background-color: {colors.lightBlue};"
	class="fixed top-0 left-0 flex w-full items-center justify-between px-4 py-1 lg:px-8 xl:px-88"
>
	<a href="#home"
		><img src="/assets/images/img_logo_secondary.png" alt="img" class="h-15 md:h-20" /></a
	>

	<div class="flex lg:hidden">
		<button
			type="button"
			command="show-modal"
			commandfor="mobile-menu"
			class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 font-bold text-pink-500"
			on:click={toggleSidebar}
		>
			<span class="sr-only">Open main menu</span>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				data-slot="icon"
				aria-hidden="true"
				class="size-6"
			>
				<path
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>

	<div class="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-12">
		<a href="/" class="text-xl/6 font-semibold text-indigo-900 hover:text-pink-500">Home</a>
		<a href="/quizz" class="text-xl/6 font-semibold text-indigo-900 hover:text-pink-500">Quizzes</a>
	</div>
</nav>

<!-- ================== MOBILE SIDEBAR ================== -->
{#if open}
	<!-- OVERLAY -->
	<div
		role="button"
		tabindex="0"
		class="fixed inset-0 z-40 bg-black/40 lg:hidden"
		on:click={() => (open = false)}
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (open = false)}
	></div>
{/if}

<div
	class="
        fixed top-0 left-0 z-50 h-full w-64 transform bg-white
        shadow-lg transition-transform duration-300 lg:hidden
        {open ? 'translate-x-0' : '-translate-x-full'}
    "
>
	<div class="flex flex-col gap-4 px-4 py-6 text-gray-800">
		<a
			href="/"
			class="flex items-center gap-2 text-xl/6 font-semibold text-pink-500 hover:text-pink-600"
			on:click={() => (open = false)}
		>
			<Icon data={faHome} class="h-5 w-5" />
			<div>Home</div></a
		>
		<a
			href="/quizz"
			class="flex items-center gap-2 text-xl/6 font-semibold text-pink-500 hover:text-pink-600"
			on:click={() => (open = false)}
		>
			<Icon data={faQuestion} class="h-5 w-5" />
			<div>Quizz</div></a
		>
	</div>
</div>
