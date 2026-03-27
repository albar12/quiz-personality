<script lang="ts">
	import { colors } from '$lib/constants/colors';
	import type { QuizType } from '$lib/types';
	import { Radar } from 'svelte-chartjs';
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		RadialLinearScale,
		PointElement,
		LineElement,
		Filler
	} from 'chart.js';
	import { Home, Share2 } from 'lucide-svelte';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import type { ChartOptions } from 'chart.js';
	import { ProgressRow } from '$lib';
	import html2canvas from 'html2canvas';

	let captureEl: HTMLDivElement;

	async function handleCapture(): Promise<void> {
		if (!captureEl) return;

		const canvas = await html2canvas(captureEl, {
			scale: 2,
			onclone: (doc) => {
				doc.querySelectorAll('*').forEach((el) => {
					const element = el as HTMLElement;
					const style = window.getComputedStyle(element);

					// FIX OKLCH → fallback aman
					if (style.color.includes('oklch')) {
						element.style.color = '#1e293b'; // dark slate
					}
					if (style.backgroundColor.includes('oklch')) {
						element.style.backgroundColor = '#ffffff';
					}
					if (style.borderColor.includes('oklch')) {
						element.style.borderColor = '#e5e7eb';
					}
				});
			}
		});

		const image: string = canvas.toDataURL('image/png');

		const link: HTMLAnchorElement = document.createElement('a');
		link.href = image;
		link.download = 'result.png';
		link.click();
	}

	Chart.register(
		Title,
		Tooltip,
		Legend,
		RadialLinearScale,
		PointElement,
		LineElement,
		Filler,
		ChartDataLabels // Tambahkan ini
	);

	Chart.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

	export let quiz: QuizType | null;

	const labels: string[] = quiz != null ? quiz.traits.map((e) => e.label) : [];

	const dataAnswer =
		quiz != null
			? quiz?.traits.map((trait) => {
					// Cari jawaban user di setiap pertanyaan yang labelnya cocok dengan trait ini
					const totalPointForTrait = quiz.questions.reduce((sum, question) => {
						// Jika pertanyaan memiliki jawaban dan label jawabannya sama dengan trait saat ini
						if (question.answer && question.answer.label === trait.key) {
							return sum + question.answer.point;
						}
						return sum;
					}, 0);

					return totalPointForTrait * 10;
				})
			: [];

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Result',
				data: dataAnswer,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)'
			}
		]
	};

	const options: ChartOptions<'radar'> = {
		responsive: true,
		maintainAspectRatio: true,
		aspectRatio: 1,
		layout: { padding: 30 },
		scales: {
			r: {
				suggestedMin: 0,
				suggestedMax: 100,
				ticks: { display: false }
			}
		},
		plugins: {
			// @ts-ignore - Tambahkan ini jika TS masih komplain tentang datalabels
			datalabels: {
				anchor: 'end' as const, // Paksa menjadi literal type
				align: 'top' as const, // Paksa menjadi literal type
				color: colors.darkIndigo,
				font: {
					weight: 'bold',
					size: 14
				},
				offset: 5
			},
			legend: {
				display: true
			}
		}
	};
</script>

<div
	class="flex w-full flex-col items-center justify-between gap-4 bg-pink-500 px-4 py-8 md:flex-row lg:px-8 xl:px-88"
>
	<h2 class="text-3xl font-semibold text-white">Result Personality Quiz</h2>
	<div class="flex gap-4">
		<a href="/">
			<button
				class="flex items-center gap-2 rounded-xl border border-white px-8 py-2 text-white hover:bg-white hover:text-pink-500"
				><Home /> <span class="hidden md:inline"> Return</span></button
			>
		</a>

		<button
			on:click={() => handleCapture()}
			class="text-indigo flex items-center gap-2 rounded-xl bg-white px-8 py-2 hover:bg-gray-300"
		>
			<Share2 /> <span class="hidden md:inline"> Share Quiz</span></button
		>
	</div>
</div>
<div id="home" style="background-color: {colors.lightBlue};" class="px-4 py-10 lg:px-8 xl:px-88">
	<div class="flex flex-col gap-8">
		<h2 style="color: {colors.darkIndigo}" class="text-2xl font-bold md:text-3xl">
			Personality Quiz Analysis
		</h2>

		<div
			bind:this={captureEl}
			style="background-color: {colors.shadesWhite}; color: {colors.darkIndigo};"
			class="flex flex-col items-center gap-8 rounded-xl p-4 shadow-sm md:p-8 lg:flex-row lg:items-stretch"
		>
			<div class="flex w-full flex-col items-center justify-center lg:w-1/2">
				<div class="h-[300px] w-full md:h-[500px]">
					<Radar {data} {options} />
				</div>

				<div class="mt-6 text-sm font-medium md:text-base">
					<p class="mb-2">Based on the results of the quiz you completed, it states that you:</p>
					<ul class="mb-2 list-disc space-y-1 pl-5">
						{#each labels as item, i}
							<li>{dataAnswer[i]}% {item}</li>
						{/each}
					</ul>
					<p class="mb-2">
						These results provide a general overview of your personality traits based on your
						answers.
					</p>
				</div>
			</div>

			<div class="my-4 hidden border-l border-pink-500 lg:block"></div>
			<div class="block w-full border-t border-pink-500 lg:hidden"></div>

			<div class="flex w-full flex-col gap-6 lg:w-1/2">
				<div class="mx-auto h-64 w-full max-w-sm md:h-80 lg:max-w-full">
					<img
						src="/assets/images/img_result_quiz.png"
						alt="img"
						class="h-full w-full rounded-2xl object-cover shadow-md"
					/>
				</div>

				<div>
					<h3 class="mb-4 text-xl font-bold">Review</h3>
					<div class="space-y-3">
						{#each labels as item, i}
							<ProgressRow label={item} value={dataAnswer[i]} max={quiz?.questions.length} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-16 flex flex-col gap-8">
		<h2 style="color: {colors.darkIndigo}" class="text-2xl font-bold md:text-3xl">
			Detailed Results
		</h2>

		<div
			style="background-color: {colors.shadesWhite}; color: {colors.darkIndigo};"
			class="flex flex-col gap-8 rounded-xl p-4 shadow-sm md:p-8"
		>
			{#each quiz?.questions as item, i}
				<div class="flex flex-col-reverse gap-6 lg:flex-row lg:items-start">
					<div class="flex flex-1 flex-col gap-4">
						<div class="text-lg font-bold text-pink-600">Question No. {i + 1}</div>
						<div class="text-lg leading-relaxed font-medium md:text-xl">{item.question}</div>

						<div class="mt-2 flex flex-col gap-2">
							{#each item.options as opt}
								<label
									class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3"
								>
									<input
										type="radio"
										bind:group={item.answer}
										value={opt.score}
										disabled
										class="h-4 w-4 accent-pink-500"
									/>
									<span class="text-base">{opt.text}</span>
								</label>
							{/each}
						</div>
					</div>

					<div class="hidden self-stretch border-l border-pink-200 lg:block"></div>

					<div class="w-full flex-shrink-0 lg:w-72">
						<div class="h-52 w-full md:h-64 lg:h-52">
							<img
								src={item.image}
								alt="img"
								class="h-full w-full rounded-2xl object-cover shadow-sm"
							/>
						</div>
					</div>
				</div>

				{#if quiz != null && i !== quiz!.questions.length - 1}
					<hr class="border-gray-100" />
				{/if}
			{/each}
		</div>
	</div>
</div>
