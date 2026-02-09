<script lang="ts">
	import type { PageData } from './$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import { paths } from '$lib/const/paths';
	import Button from '$lib/components/Button/Button.svelte';

	let { data }: { data: PageData } = $props();
	const situation = $derived(data.situation);
</script>

<Stack size={3} variant="section">
	<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
		{situation.title}
	</Typography>
	<Typography size={2} variant="p" color="dark" weight="normal" align="left">
		{situation.description}
	</Typography>
	<Button href={`${paths.lesson(situation.id).toString()}`}>レッスンをスタート</Button>
	<Stack size={3} variant="ul">
		{#each situation.phrases as phrase}
			<Card {phrase} hasBorderLeft={true} borderColor="gray" />
		{/each}
	</Stack>
</Stack>
