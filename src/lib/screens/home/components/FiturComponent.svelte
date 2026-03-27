<script lang="ts">
	import { colors } from '$lib/constants/colors';

	export let title: string;
	export let desc: string;
	export let src: string;
</script>

<div
	style="border-color: {colors.coolGray};"
	class="flex h-[50px] w-[50px] items-center justify-center rounded-2xl bg-white p-2 shadow-sm md:h-[400px] md:w-md md:p-4"
>
	<div class="flex flex-col gap-4 text-center">
		<div class="h-20 w-full max-w-xs md:h-50 md:max-w-md">
			<img {src} alt="img" class="h-full w-full rounded-2xl object-cover" />
		</div>
		<h3 style="color: {colors.darkIndigo};" class="font-semibold">{title}</h3>
		<p style="color: {colors.darkIndigo};">{desc}</p>
	</div>
</div>
