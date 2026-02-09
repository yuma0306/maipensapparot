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

<Stack size={6} variant="section">
	<a href="/" class="back-link">ホームに戻る</a>
	<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
		{situation.title}
	</Typography>
	<Typography size={2} variant="p" color="dark" weight="normal" align="left">
		{situation.description}
	</Typography>
	<Stack size={5} variant="ul">
		{#each situation.phrases as phrase}
			<Card {phrase} />
		{/each}
	</Stack>
	<Button href={`${paths.lesson(situation.id).toString()}`}>レッスンをスタート</Button>
</Stack>

<style>
	.back-link {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
