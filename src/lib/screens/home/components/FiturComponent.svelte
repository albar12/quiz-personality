<script lang="ts">
	import { colors } from '$lib/constants/colors';

	export let title: string;
	export let desc: string;
	export let src: string;
</script>

<div
	style="border-color: {colors.coolGray};"
	class="flex w-full flex-col items-center justify-start rounded-2xl bg-white p-4 shadow-sm
	md:h-[500px] md:max-w-sm md:p-6 xl:h-[400px]"
>
	<div class="flex w-full flex-col items-center gap-4 text-center">
		<!-- IMAGE -->
		<div class="h-32 w-full max-w-xs md:h-48 md:max-w-md">
			<img {src} alt="img" class="h-full w-full rounded-2xl object-cover" />
		</div>

		<!-- TITLE -->
		<h3
			style="color: {colors.darkIndigo};"
			class="max-w-full text-lg font-semibold break-words md:text-xl"
		>
			{title}
		</h3>

		<!-- DESC -->
		<p style="color: {colors.darkIndigo};" class="max-w-full text-sm break-words md:text-base">
			{desc}
		</p>
	</div>
</div>
