import { createClient } from 'microcms-js-sdk';
import { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } from '$env/static/private';
import type { Situation } from './types';

const client = createClient({
	serviceDomain: MICROCMS_SERVICE_DOMAIN,
	apiKey: MICROCMS_API_KEY
});

type MicroCMSWord = {
	fieldId: string;
	thai: string;
	meaning: string;
};

type MicroCMSPhrase = {
	fieldId: string;
	thai: string;
	japanese: string;
	words: MicroCMSWord[];
};

type MicroCMSThumbnail = {
	url: string;
	height: number;
	width: number;
};

type MicroCMSSituation = {
	title: string;
	description: string;
	phrases: MicroCMSPhrase[];
	thumbnail?: MicroCMSThumbnail;
};

function transformSituation(id: string, data: MicroCMSSituation): Situation {
	return {
		id,
		title: data.title,
		description: data.description,
		thumbnail: data.thumbnail?.url,
		phrases: data.phrases.map((phrase, index) => ({
			id: `${id}-${index + 1}`,
			thai: phrase.thai,
			japanese: phrase.japanese,
			words: phrase.words.map((word) => ({
				thai: word.thai,
				meaning: word.meaning
			}))
		}))
	};
}

export async function getSituations(): Promise<Situation[]> {
	const response = await client.getList<MicroCMSSituation>({
		endpoint: 'situations'
	});
	return response.contents.map((item) => transformSituation(item.id, item));
}

export async function getSituationById(id: string): Promise<Situation | undefined> {
	try {
		const data = await client.getListDetail<MicroCMSSituation>({
			endpoint: 'situations',
			contentId: id
		});
		return transformSituation(data.id, data);
	} catch {
		return undefined;
	}
}
