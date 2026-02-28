<script lang="ts">
	import type { ExamQuestion } from '$lib/types';
	import Card from '$lib/components/Card/Card.svelte';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import FlexColumn from '$lib/components/FlexColumn/FlexColumn.svelte';
	import VoiceButton from '$lib/components/VoiceButton/VoiceButton.svelte';
	import CopyButton from '$lib/components/CopyButton/CopyButton.svelte';
	import ToggleRevealButton from '$lib/components/ToggleRevealButton/ToggleRevealButton.svelte';

	type Props = {
		question: ExamQuestion;
		onSelect: (optionIndex: number) => void;
		selectedIndex?: number;
	};

	let { question, onSelect, selectedIndex }: Props = $props();

	const showResult = $derived(selectedIndex !== undefined);
	let showQuestionMeaning = $state(false);
	let showOptionMeaning = $state<Record<number, boolean>>({});

	function toggleQuestionMeaning() {
		showQuestionMeaning = !showQuestionMeaning;
	}

	function toggleOptionMeaning(i: number) {
		showOptionMeaning = { ...showOptionMeaning, [i]: !showOptionMeaning[i] };
	}
</script>

<Card variant="div" borderColor="gray" hasBorderLeft={false}>
	<Stack size={2} variant="div">
		<Stack size={1} variant="div">
			<Typography size={4} variant="p" color="primary" weight="bold" align="center">
				{question.title}
			</Typography>
			<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="center">
				{#if question.title}
					<VoiceButton text={question.title} />
					<CopyButton text={question.title} />
				{/if}
				<ToggleRevealButton
					expanded={showQuestionMeaning}
					showLabel="👀 訳を見る"
					hideLabel="🙈 訳を隠す"
					ariaLabel="訳を見る"
					onclick={toggleQuestionMeaning}
				/>
			</FlexColumn>
			{#if showQuestionMeaning}
				<Typography size={2} variant="p" color="dark" weight="normal" align="center">
					{question.meaning}
				</Typography>
			{/if}
		</Stack>
		<ul class="options">
			{#each question.options as option, i}
				<li class="option-row">
					<div class="option-main">
						<button
							type="button"
							class="option-button"
							class:correct={showResult && option.isCorrect}
							class:incorrect={showResult && selectedIndex === i && !option.isCorrect}
							disabled={showResult}
							onclick={() => onSelect(i)}
						>
							<span class="option-number">{i + 1}.</span>
							<span class="option-text">{option.option}</span>
						</button>
					</div>
					<FlexColumn
						gap={1}
						variant="div"
						alignItems="center"
						justifyContent="start"
						isWrap={true}
					>
						{#if option.option}
							<VoiceButton text={option.option} />
							<CopyButton text={option.option} />
						{/if}
						<ToggleRevealButton
							expanded={showOptionMeaning[i]}
							showLabel="👀 訳を見る"
							hideLabel="🙈 訳を隠す"
							ariaLabel="訳を見る"
							onclick={(e) => {
								e.stopPropagation();
								toggleOptionMeaning(i);
							}}
						/>
					</FlexColumn>
					{#if showOptionMeaning[i]}
						<Typography size={2} variant="p" color="dark" weight="normal" align="left">
							{option.meaning}
						</Typography>
					{/if}
				</li>
			{/each}
		</ul>
	</Stack>
</Card>

<style>
	.options {
		display: grid;
		list-style: none;
		padding: 0;
		margin: 0;
		row-gap: calc(var(--spacing-2) * 1px);
	}
	@media (max-width: 639px) {
		.options {
			row-gap: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
	.option-button {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-2) * 1px);
		width: 100%;
		padding: calc(var(--spacing-2) * 1px);
		text-align: left;
		background-color: var(--color-primary-10);
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		cursor: pointer;
		transition: opacity var(--transition);
	}
	.option-button:hover {
		opacity: var(--opacity);
	}
	.option-button:active {
		opacity: var(--opacity);
	}
	.option-button:disabled {
		cursor: default;
	}
	.option-button.correct {
		background-color: var(--color-success);
		border-color: var(--color-success);
		color: var(--color-white);
	}
	.option-button.incorrect {
		background-color: var(--color-warning);
		border-color: var(--color-warning);
		color: var(--color-white);
	}
	@media (min-width: 640px) {
		.option-button {
			border-radius: calc(var(--border-radius) * 1px);
			font-size: calc(var(--font-size-2) * 1px);
		}
	}
	@media (max-width: 639px) {
		.option-button {
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			padding: calc(var(--calc-sp) * var(--spacing-2));
			font-size: calc(var(--calc-sp) * var(--font-size-2));
		}
	}
	.option-number {
		flex-shrink: 0;
		font-weight: bold;
	}
	.option-text {
		flex: 1;
	}
	.option-row {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-2) * 1px);
	}
	.option-main {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: calc(var(--spacing-2) * 1px);
		flex: 1;
		min-width: 0;
	}
	@media (max-width: 639px) {
		.option-main {
			gap: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
	@media (max-width: 639px) {
		.option-row {
			gap: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
</style>
