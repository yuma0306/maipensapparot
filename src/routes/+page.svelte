<script lang="ts">
	import type { PageData } from './$types';
	import CardImageList from '$lib/components/CardImageList/CardImageList.svelte';
	import { siteData } from '$lib/constants/siteData';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import CardImage from '$lib/components/CardImage/CardImage.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import { paths } from '$lib/constants/paths';
	import Break from '$lib/components/Break/Break.svelte';
	import Inner from '$lib/components/Inner/Inner.svelte';

	let { data }: { data: PageData } = $props();
	const situations = $derived(data.situations);
</script>

<Inner>
	<Stack size={3} variant="section">
		<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
			{siteData.title}へ<Break media="onlySp" />ようこそ
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
</Inner>
