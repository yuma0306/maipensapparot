<script lang="ts">
	import type { PageData } from './$types';
	import CardImageList from '$lib/components/CardImageList/CardImageList.svelte';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import CardImage from '$lib/components/CardImage/CardImage.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import { paths } from '$lib/constants/paths';
	import Inner from '$lib/components/Inner/Inner.svelte';

	let { data }: { data: PageData } = $props();
	const situations = $derived(data.situations);
	const exams = $derived(data.exams);
</script>

<Inner>
	<Stack size={3} variant="section">
		<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
			🍍สวัสดีครับ🍍
		</Typography>
		<Typography size={2} variant="p" color="dark" weight="normal" align="center">
			シチュエーションを選んで学習を始めましょう
		</Typography>
		<CardImageList>
			{#each situations as situation}
				<CardImage id={situation.id} href={paths.situation(situation.id)} title={situation.title} />
			{/each}
		</CardImageList>
	</Stack>
	<Stack size={3} variant="section">
		<Typography size={4} variant="h2" color="secondary" weight="bold" align="center">
			試験
		</Typography>
		<Typography size={2} variant="p" color="dark" weight="normal" align="center">
			試験を選んで学習を始めましょう
		</Typography>
		<CardImageList>
			{#each exams as exam}
				<CardImage id={exam.id} href={paths.exam(exam.id)} title={exam.title} />
			{/each}
		</CardImageList>
	</Stack>
</Inner>
