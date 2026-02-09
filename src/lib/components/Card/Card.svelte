<script lang="ts">
	import type { Phrase } from '$lib/types';
	import ListItem from '../ListItem/ListItem.svelte';
	import Stack from '../Stack/Stack.svelte';
	import Typography from '../Typography/Typography.svelte';
	import SpeakButton from '../SpeakButton/SpeakButton.svelte';

	type CardProps = {
		phrase: Phrase;
		borderColor: 'gray' | 'success' | 'danger';
		hasBorderLeft: boolean;
	};

	let { phrase, borderColor, hasBorderLeft }: CardProps = $props();
</script>

<li class="card" data-border-left={hasBorderLeft} data-border-color={borderColor}>
	<Stack size={1} variant="dl">
		<dt class="header">
			<Typography size={4} variant="p" color="primary" weight="bold" align="left">
				{phrase.thai}
			</Typography>
			<SpeakButton text={phrase.thai} />
		</dt>
		<Typography size={2} variant="dd" color="dark" weight="normal" align="left">
			{phrase.japanese}
		</Typography>
	</Stack>
	<div class="footer">
		<Stack size={2} variant="ul">
			{#each phrase.words as word}
				<ListItem symbol="none">
					<div class="inner">
						<Typography size={2} variant="span" color="dark" weight="bold" align="left">
							{word.thai}
						</Typography>
						<Typography size={2} variant="span" color="dark" weight="normal" align="left">
							{word.meaning}
						</Typography>
						<SpeakButton text={word.thai} />
					</div>
				</ListItem>
			{/each}
		</Stack>
	</div>
</li>

<style>
	.card {
		position: relative;
		display: grid;
		align-items: center;
		background-color: var(--color-white);
		&[data-border-color='gray'] {
			border: 1px solid var(--color-gray);
		}
		&[data-border-color='success'] {
			border: 1px solid var(--color-success);
		}
		&[data-border-color='danger'] {
			border: 1px solid var(--color-danger);
		}
	}
	@media (min-width: 640px) {
		.card {
			grid-template-columns: 1fr 1fr;
			row-gap: calc(var(--spacing-4) * 1px);
			padding: calc(var(--spacing-2) * 1px);
			column-gap: calc(var(--spacing-2) * 1px);
			border-radius: calc(var(--border-radius) * 1px);
			box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
			&[data-border-left='true'] {
				border-left-width: calc(var(--spacing-1) * 1px);
			}
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
	@media (max-width: 639px) {
		.card {
			grid-template-rows: auto 1fr;
			row-gap: calc(var(--spacing-4) * var(--calc-sp));
			padding: calc(var(--spacing-2) * var(--calc-sp));
			column-gap: calc(var(--spacing-2) * var(--calc-sp));
			border-radius: calc(var(--border-radius) * var(--calc-sp));
			box-shadow: 0 0 calc(var(--spacing-1) * var(--calc-sp)) var(--color-gray);
			border-left-width: calc(var(--spacing-1) * var(--calc-sp));
		}
	}
	.header {
		display: flex;
		align-items: center;
	}
	@media (min-width: 640px) {
		.header {
			column-gap: calc(var(--spacing-1) * 1px);
		}
	}
	@media (max-width: 639px) {
		.header {
			column-gap: calc(var(--calc-sp) * var(--spacing-1));
		}
	}
	@media (max-width: 639px) {
		.footer {
			position: relative;
			&::before {
				content: '';
				position: absolute;
				top: calc(-1 * var(--spacing-2) * var(--calc-sp));
				left: 0;
				width: 100%;
				height: 1px;
				background-color: var(--color-gray);
			}
		}
	}
	.footer {
		position: relative;
	}
	.inner {
		display: flex;
		align-items: center;
		column-gap: calc(var(--spacing-1) * 1px);
	}
	@media (min-width: 640px) {
		.inner {
			column-gap: calc(var(--spacing-1) * 1px);
		}
	}
	@media (max-width: 639px) {
		.inner {
			column-gap: calc(var(--calc-sp) * var(--spacing-1));
		}
	}
</style>
