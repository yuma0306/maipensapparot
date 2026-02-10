<script lang="ts">
	import Card from '../Card/Card.svelte';
	import FlexColumn from '../FlexColumn/FlexColumn.svelte';
	import Stack from '../Stack/Stack.svelte';
	import Typography from '../Typography/Typography.svelte';
	import VoiceButton from '../VoiceButton/VoiceButton.svelte';

	type Props = {
		japanese: string;
		thai: string;
		showAnswer: boolean;
	};

	let { japanese, thai, showAnswer }: Props = $props();
</script>

<Card variant="div" borderColor="gray" hasBorderLeft={false}>
	<Stack size={2} variant="div">
		<Typography size={4} variant="p" color="primary" weight="bold" align="center">
			{japanese}
		</Typography>
		<FlexColumn gap={1} variant="div" alignItems="stretch" justifyContent="center">
			<VoiceButton text={thai} />
			<button onclick={() => (showAnswer = !showAnswer)} class="button" aria-label="回答を見る">
				{showAnswer ? '🙈 回答を隠す' : '👀 回答を見る'}
			</button>
		</FlexColumn>
		{#if showAnswer}
			<Typography size={3} variant="p" color="gray" weight="normal" align="center">
				{thai}
			</Typography>
		{/if}
	</Stack>
</Card>

<style>
	.button {
		background: var(--color-primary-10);
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		transition: opacity var(--transition);
		font-weight: 700;
		&:hover {
			opacity: var(--opacity);
		}
	}
	@media (min-width: 640px) {
		.button {
			border-radius: calc(var(--border-radius) * 1px);
			padding: calc(var(--spacing-1) * 1px);
			font-size: calc(var(--font-size-2) * 1px);
			cursor: pointer;
		}
	}
	@media (max-width: 639px) {
		.button {
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			padding: calc(var(--calc-sp) * var(--spacing-1));
			font-size: calc(var(--calc-sp) * var(--font-size-2));
		}
	}
</style>
