import { writable } from "svelte/store";
import type { QuizType } from "$lib/types/quizz";

export const resultStore = writable<QuizType | null>(null);