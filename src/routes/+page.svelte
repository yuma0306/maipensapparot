<script lang="ts">
	import type { PageData } from './$types';
	import CardImageList from '$lib/components/CardImageList/CardImageList.svelte';
	import { siteData } from '$lib/const/siteData';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';
	import CardImage from '$lib/components/CardImage/CardImage.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import { paths } from '$lib/const/paths';
	import Break from '$lib/components/Break/Break.svelte';

	let { data }: { data: PageData } = $props();
	const situations = $derived(data.situations);
</script>

<Stack size={4} variant="section">
	<Typography size={4} variant="h1" color="secondary" weight="bold" align="center">
		{siteData.title}へ<Break media="onlySp" />ようこそ
	</Typography>
	<Typography size={2} variant="p" color="dark" weight="normal" align="center">
		シチュエーションを選んで学習を始めましょう
	</Typography>
</Stack>
<Spacer size={6} variant="div" />
<CardImageList>
	{#each situations as situation}
		<CardImage
			variant="a"
			href={paths.situation(situation.id)}
			id={situation.id}
			title={situation.title}
			description={situation.description}
			thumbnail={situation.thumbnail}
		/>
	{/each}
</CardImageList>
