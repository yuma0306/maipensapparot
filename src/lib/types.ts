interface Word {
	fieldId: string;
	thai: string;
	meaning: string;
}

export interface Phrase {
	fieldId: string;
	thai: string;
	japanese: string;
	words: Word[];
}

export interface Situation {
	id: string;
	title: string;
	phrases: Phrase[];
}

export interface LessonResult {
	phrase: Phrase;
	correct: boolean;
}
