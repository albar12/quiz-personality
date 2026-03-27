<script lang="ts">
	export let label: string;
	export let value: number; // Skor saat ini
	export let max: number = 100; // Skor maksimal

	// Hitung persentase untuk lebar bar
	$: percentage = value;
</script>

<div class="relative mb-2 flex h-10 w-full items-center overflow-hidden rounded-lg bg-[#FCE7F3]">
	<div
		class="absolute top-0 left-0 h-full bg-[#E91E63] transition-all duration-1000 ease-out"
		style="width: {percentage}%"
	></div>

	<div class="pointer-events-none relative z-10 flex w-full items-center justify-between px-4">
		<span class="text-sm font-semibold {percentage > 20 ? 'text-white' : 'text-[#1A1A40]'}">
			{label} ({value})
		</span>

		<span class="text-sm font-semibold text-[#1A1A40]">
			{max * 10}
		</span>
	</div>
</div>
