<script lang="ts">
	import type { Phrase } from '$lib/types';
	import ListItem from '../ListItem/ListItem.svelte';
	import SpeakButton from '../speakButton/speakButton.svelte';
	import Stack from '../Stack/Stack.svelte';
	import Typography from '../Typography/Typography.svelte';

	type CardProps = {
		phrase: Phrase;
	};

	let props: CardProps = $props();
</script>

<li class="phrase-card">
	<Stack size={1} variant="dl">
		<dt class="phrase-header">
			<Typography size={2} variant="p" color="primary" weight="bold">
				{props.phrase.thai}
			</Typography>
			<SpeakButton text={props.phrase.thai} />
		</dt>
		<Typography size={2} variant="dd" color="dark" weight="normal">
			{props.phrase.japanese}
		</Typography>
	</Stack>
	<Stack size={1} variant="ul">
		{#each props.phrase.words as word}
			<ListItem symbol="none">
				<div class="word-inner">
					<Typography size={2} variant="span" color="dark" weight="bold">
						{word.thai}
					</Typography>
					<Typography size={2} variant="span" color="dark" weight="normal">
						{` ： ${word.meaning}`}
					</Typography>
					<SpeakButton text={word.thai} />
				</div>
			</ListItem>
		{/each}
	</Stack>
</li>

<style>
	.phrase-card {
		position: relative;
		display: grid;
		row-gap: calc(var(--spacing-2) * 1px);
		padding: calc(var(--spacing-2) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
		border: 1px solid var(--color-gray);
		border-left-width: calc(var(--spacing-1) * 1px);
	}
	@media (min-width: 640px) {
		.phrase-card {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: calc(var(--spacing-2) * 1px);
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: calc(50% - calc(var(--spacing-1) * 1px));
				width: 1px;
				height: calc(100% - calc(var(--spacing-4) * 1px));
				background-color: var(--color-gray);
				translate: 0 -50%;
			}
		}
	}
	.phrase-header {
		display: flex;
		align-items: center;
		column-gap: calc(var(--spacing-2) * 1px);
	}
	.word-inner {
		display: flex;
		align-items: center;
		column-gap: calc(var(--spacing-1) * 1px);
	}
</style>
