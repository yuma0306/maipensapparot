<script lang="ts">
	import type { PageData } from './$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import Card from '$lib/components/Card/Card.svelte';

	let { data }: { data: PageData } = $props();
	const situation = $derived(data.situation);
</script>

<Stack size={2} variant="section">
	<a href="/" class="back-link">ホームに戻る</a>
	<h1 class="heading">{situation.title}</h1>
	<p class="description">{situation.description}</p>
</Stack>

<Spacer size={4} variant="div" />

<Stack size={2} variant="section">
	<Typography size={3} variant="h2" color="primary" weight="bold" align="center"
		>フレーズ一覧</Typography
	>
	<Stack size={2} variant="ul">
		{#each situation.phrases as phrase}
			<Card {phrase} />
		{/each}
	</Stack>
</Stack>

<Spacer size={3} variant="div" />

<a href="/situations/{situation.id}/lesson" class="start-button">レッスンをスタート</a>

<style>
	.back-link {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
	.heading {
		font-size: calc(var(--font-size-5) * 1px);
		font-weight: 700;
		color: var(--color-secondary);
	}
	.description {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
	}
	.start-button {
		display: block;
		text-align: center;
		padding: calc(var(--spacing-2) * 1px);
		background-color: var(--color-secondary);
		color: var(--color-white);
		font-weight: 700;
		font-size: calc(var(--font-size-2) * 1px);
		border-radius: calc(var(--border-radius) * 1px);
		text-decoration: none;
		transition: opacity var(--transition);
		&:hover {
			opacity: 0.8;
		}
	}
</style>
