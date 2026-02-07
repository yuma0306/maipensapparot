export interface Word {
	thai: string;
	meaning: string;
}

export interface Phrase {
	id: string;
	thai: string;
	japanese: string;
	words: Word[];
}

export interface Situation {
	id: string;
	title: string;
	description: string;
	phrases: Phrase[];
}

export interface LessonResult {
	phrase: Phrase;
	correct: boolean;
}
