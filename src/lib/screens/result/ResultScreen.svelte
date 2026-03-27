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

<div class="flex w-full justify-between bg-pink-500 px-4 py-8 lg:px-8 xl:px-88">
	<h2 class="text-3xl font-semibold text-white">Result Personality Quiz</h2>
	<div class="flex gap-4">
		<a href="/">
			<button
				class="flex items-center gap-2 rounded-xl border border-white px-8 py-2 text-white hover:bg-white hover:text-pink-500"
				><Home /> Return</button
			>
		</a>

		<button
			class="text-indigo flex items-center gap-2 rounded-xl bg-white px-8 py-2 hover:bg-gray-300"
		>
			<Share2 /> Share Quiz</button
		>
	</div>
</div>
<div id="home" style="background-color: {colors.lightBlue};" class="px-4 py-20 lg:px-8 xl:px-16">
	<div class="items-left flex flex-col-reverse justify-center p-6 md:gap-32 lg:flex-row">
		<div class="flex min-w-2xl flex-col gap-4">
			<div
				style="color: {colors.darkIndigo}"
				class="text-left text-lg font-semibold tracking-tight text-balance md:text-3xl"
			>
				Quizizz Analysis
			</div>
			<div
				style="background-color: {colors.shadesWhite}; color: {colors.darkIndigo};"
				class="flex items-center gap-4 rounded-xl p-4 text-justify text-xl shadow-sm"
			>
				<div class="flex h-[500px] w-full flex-col items-center justify-center">
					<Radar {data} {options} />
					<div class="font-semibold">
						<p>Based on the results of the quiz you completed, it states that you :</p>

						<ul class="list-disc pl-5">
							{#each labels as item, i}
								<li>{dataAnswer[i]}% {item}</li>
							{/each}
						</ul>
						<p>
							These results provide a general overview of your personality traits based on your
							answers.
						</p>
					</div>
				</div>
				<div class="self-stretch border-l border-pink-500"></div>
				<div class="flex flex-col gap-4">
					<div class="h-80 w-full max-w-xs md:h-110 md:max-w-lg">
						<img
							src="/assets/images/img_result_quiz.png"
							alt="img"
							class="h-full w-full rounded-2xl object-cover"
						/>
					</div>

					<div
						style="color: {colors.darkIndigo}"
						class="text-left text-lg font-semibold tracking-tight text-balance md:text-xl"
					>
						Review
					</div>
					{#each labels as item, i}
						<ProgressRow label={item} value={dataAnswer[i]} max={quiz?.questions.length} />
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div class="items-left flex flex-col-reverse justify-center p-6 md:gap-32 lg:flex-row">
		<div class="flex min-w-2xl flex-col gap-4">
			<div
				style="color: {colors.darkIndigo}"
				class="text-left text-lg font-semibold tracking-tight text-balance md:text-3xl"
			>
				Detailed Results
			</div>
			<div class="flex min-w-2xl flex-col gap-4">
				<div
					style="background-color: {colors.shadesWhite}; color: {colors.darkIndigo};"
					class="flex flex-col gap-4 rounded-xl p-4 text-justify text-xl shadow-sm"
				>
					{#each quiz?.questions as item, i}
						<div class="flex gap-4">
							<div class="flex flex-col gap-4">
								<div class="font-semibold">Question No. {i + 1}</div>
								<div class="max-w-4xl">{item.question}</div>
								<div class="flex flex-col gap-4">
									{#each item.options as opt}
										<label>
											<input type="radio" bind:group={item.answer} value={opt.score} disabled />
											{opt.text}
										</label>
									{/each}
								</div>
							</div>
							<div class="self-stretch border-l border-pink-500"></div>
							<div class="rounded-3xl bg-white p-4">
								<div class="h-80 w-full max-w-xs md:h-110 md:max-w-sm">
									<img src={item.image} alt="img" class="h-full w-full rounded-2xl object-cover" />
								</div>
							</div>
						</div>
						<hr />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
