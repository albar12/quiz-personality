<script lang="ts">
	import { colors, resultStore } from '$lib';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import type { QuizType } from '$lib/types/quizz/quizz';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';

	export let quiz: QuizType;

	let currentIndex = 0;
	let currentPage = 1;

	function nextClick() {
		if (currentIndex != quiz.questions.length - 1) {
			if (quiz.questions[currentIndex].answer == null) {
				Swal.fire({
					title: 'Answer has not been selected',
					text: 'Please selected the answer first',
					icon: 'warning',
					confirmButtonText: 'OK'
				});
			} else {
				currentIndex++;
				currentPage++;
			}
		}
	}

	function prevClick() {
		if (currentIndex != 0) {
			currentIndex--;
			currentPage--;
		}
	}

	function handleSelect(opt: any) {
		quiz.questions[currentIndex].answer = opt;
	}

	function submitQuizz() {
		const hasEmpty = quiz.questions.some((q) => q.answer == null);
		if (hasEmpty) {
			Swal.fire({
				title: 'There are still blank answers',
				text: 'Please complete the answer first',
				icon: 'warning',
				confirmButtonText: 'OK'
			});
		} else {
			Swal.fire({
				title: 'Are you sure you want to submit?',
				text: 'After submitting the answer, it cannot be changed again.',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Yes, submit!',
				cancelButtonText: 'Cancel'
			}).then((result) => {
				if (result.isConfirmed) {
					resultStore.set(quiz);
					goto('/result');
				}
			});
		}
	}

	function backHome() {
		Swal.fire({
			title: 'Go back?',
			text: 'Your current answers will be lost if you leave this page.',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes, go back!',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				// 👉 proses submit di sini
				goto('/');
			}
		});
	}
</script>

<div
	class="flex w-full flex-col items-center justify-between gap-4 bg-pink-500 px-4 py-8 md:flex-row lg:px-8 xl:px-88"
>
	<h2 class="text-3xl font-semibold text-white">Personality Quiz</h2>
	<div class="flex gap-4">
		<button
			on:click={() => backHome()}
			class="rounded-xl bg-yellow-500 px-8 py-2 text-white hover:bg-yellow-600">Return</button
		>
		<button
			on:click={() => submitQuizz()}
			class="text-indigo rounded-xl bg-white px-8 py-2 hover:bg-gray-300">Submit Quiz</button
		>
	</div>
</div>
<div id="home" style="background-color: {colors.lightBlue};" class="px-4 py-20 lg:px-8 xl:px-16">
	<div
		class="items-left flex flex-col-reverse justify-center gap-4 p-6 sm:mt-0 md:gap-32 lg:flex-row"
	>
		<div class="flex max-w-2xl flex-col gap-4">
			<div
				style="color: {colors.darkIndigo}"
				class="text-left text-lg font-semibold tracking-tight text-balance md:text-3xl"
			>
				Question No. {currentPage}
			</div>
			<div
				style="background-color: {colors.shadesWhite}; color: {colors.darkIndigo};"
				class="rounded-xl p-4 text-justify text-xl shadow-sm"
			>
				{quiz.questions[currentIndex].question}
			</div>
			<div
				style="background-color: {colors.shadesWhite}; color: {colors.darkIndigo};"
				class="flex flex-col gap-4 rounded-xl p-4 text-justify text-xl shadow-sm"
			>
				{#each quiz.questions[currentIndex].options as opt}
					<label>
						<input
							type="radio"
							bind:group={quiz.questions[currentIndex].answer}
							value={opt.score}
							on:change={() => handleSelect(opt.score)}
						/>
						{opt.text}
					</label>
				{/each}
			</div>
		</div>
		<div class="flex items-center justify-center rounded-3xl bg-white p-4">
			<div
				class="mx-auto flex h-80 w-full max-w-xs items-center justify-center md:h-110 md:max-w-xl lg:max-w-sm"
			>
				<img
					src={quiz.questions[currentIndex].image}
					alt="img"
					class="h-full w-full rounded-2xl object-cover"
				/>
			</div>
		</div>
	</div>
</div>
<div
	style="background-color: {colors.lightBlue};"
	class="relative z-50 flex w-full items-center justify-between px-4 py-8 lg:px-8 xl:px-88"
>
	<!-- LEFT -->
	<button
		on:click={() => prevClick()}
		class="flex w-[90px] items-center justify-center gap-2 rounded-xl bg-pink-500 px-8 py-2 text-white hover:bg-pink-600 md:w-[190px]
		{currentIndex === 0 ? 'invisible' : ''}"
	>
		<ArrowLeft /> <span class="hidden md:inline">Previously</span>
	</button>

	<!-- CENTER -->
	<div class="text-center text-xl font-semibold text-pink-500">
		{currentPage}/{quiz.questions.length}
	</div>

	<!-- RIGHT -->
	<button
		on:click={() => nextClick()}
		class="flex w-[90px] items-center justify-center gap-2 rounded-xl bg-pink-500 px-8 py-2 text-white hover:bg-pink-600 md:w-[190px]
		{currentIndex === quiz.questions.length - 1 ? 'invisible' : ''}"
	>
		<span class="hidden md:inline">Next</span>
		<ArrowRight />
	</button>
</div>
