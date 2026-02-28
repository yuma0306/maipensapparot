type Word = {
	fieldId: string;
	thai: string;
	meaning: string;
};

export type Phrase = {
	fieldId: string;
	thai: string;
	japanese: string;
} & Partial<{
	english: string;
	words: Word[];
}>;

export type Situation = {
	id: string;
	title: string;
	phrases: Phrase[];
};

export type LessonResult = {
	phrase: Phrase;
	correct: boolean;
};

export type ExamWord = {
	fieldId: string;
	word: string;
	meaning: string;
};

type ExamOption = {
	fieldId: string;
	option: string;
	meaning: string;
	isCorrect: boolean;
	words?: ExamWord[];
};

export type ExamQuestion = {
	fieldId: string;
	title: string;
	meaning: string;
	image?: { url: string; height: number; width: number };
	words?: ExamWord[];
	options: ExamOption[];
};

export type Exam = {
	id: string;
	title: string;
	questions: ExamQuestion[];
};

export type ExamResult = {
	question: ExamQuestion;
	selectedOptionIndex: number;
	correct: boolean;
};
