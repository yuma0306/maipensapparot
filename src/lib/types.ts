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
