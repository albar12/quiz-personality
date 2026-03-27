export interface QuizType {
    title: string
    traits: TraitsType[]
    questions: QuestionType[]
}

export function quizFromJson(json: any): QuizType {
    return {
        title: json.title,
        traits: json.traits.map(traitsFromJson),
        questions: json.questions.map(questionFromJson)
    };
}

export interface TraitsType {
    key: string
    label: string
}

export function traitsFromJson(json: any): TraitsType {
    return {
        key: json.key,
        label: json.label,
    };
}

export interface QuestionType {
    id: number
    question: string
    image: string,
    options: OptionType[]
    answer?: AnswerType
}

export function questionFromJson(json: any): QuestionType {
    return {
        id: json.id,
        question: json.question,
        options: json.options.map(optionFromJson),
        image: json.image
    };
}

export interface OptionType {
    text: string
    score: ScoreType
}

export function optionFromJson(json: any): OptionType {
    return {
        text: json.text,
        score: scoreFromJson(json.scores),
    };
}

export interface ScoreType {
    label: string
    point: number
}

export function scoreFromJson(json: any): ScoreType {
    return {
        label: json.label,
        point: json.point,
    };
}

export interface AnswerType {
    label: string
    point: number
}