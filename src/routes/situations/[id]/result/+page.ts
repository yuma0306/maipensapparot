import { getSituationById } from '$lib/data/situations';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const situation = getSituationById(params.id);

	if (!situation) {
		error(404, 'シチュエーションが見つかりません');
	}

	return { situation };
};
