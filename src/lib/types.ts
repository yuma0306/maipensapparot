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

interface Thumbnail {
	url: string;
	height: number;
	width: number;
}

export interface Situation {
	id: string;
	title: string;
	description: string;
	thumbnail: Thumbnail;
	phrases: Phrase[];
}

export interface LessonResult {
	phrase: Phrase;
	correct: boolean;
}
