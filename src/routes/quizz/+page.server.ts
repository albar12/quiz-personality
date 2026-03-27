import { quizData } from '$lib/types/data/quizz_data'
import { quizFromJson } from '$lib/types/quizz/quizz'

export function load() {
    let quizType = quizFromJson(quizData);

    return {
        hideNavbar: true,
        quizType: quizType
    };
}