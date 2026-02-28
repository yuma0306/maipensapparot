<script lang="ts">
	import type { ExamQuestion } from '$lib/types';
	import Card from '$lib/components/Card/Card.svelte';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import FlexColumn from '$lib/components/FlexColumn/FlexColumn.svelte';
	import VoiceButton from '$lib/components/VoiceButton/VoiceButton.svelte';
	import CopyButton from '$lib/components/CopyButton/CopyButton.svelte';
	import ToggleRevealButton from '$lib/components/ToggleRevealButton/ToggleRevealButton.svelte';
	import ExamQuizCardHead from '$lib/components/ExamQuizCardHead/ExamQuizCardHead.svelte';

	type Props = {
		question: ExamQuestion;
		onSelect: (optionIndex: number) => void;
		selectedIndex?: number;
	};

	let { question, onSelect, selectedIndex }: Props = $props();

	const showResult = $derived(selectedIndex !== undefined);
	let showOptionMeaning = $state<Record<number, boolean>>({});

	function toggleOptionMeaning(i: number) {
		showOptionMeaning = { ...showOptionMeaning, [i]: !showOptionMeaning[i] };
	}
</script>

<Card variant="div" borderColor="gray" hasBorderLeft={false}>
	<Stack size={2} variant="div">
		<ExamQuizCardHead {question} />
		<Stack size={2} variant="ul">
			{#each question.options as option, i}
				<Stack size={1} variant="li">
					<button
						type="button"
						class="option-button"
						data-correct={showResult && option.isCorrect}
						data-incorrect={showResult && selectedIndex === i && !option.isCorrect}
						disabled={showResult}
						onclick={() => onSelect(i)}
					>
						<FlexColumn gap={1} variant="span" alignItems="center" justifyContent="start" isWrap>
							<Typography size={2} variant="span" color="primary" weight="normal" align="left">
								{i + 1}.
							</Typography>
							<Typography size={2} variant="span" color="primary" weight="bold" align="left">
								{option.option}
							</Typography>
						</FlexColumn>
					</button>
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
				</Stack>
			{/each}
		</Stack>
	</Stack>
</Card>

<style>
	.option-button {
		padding: calc(var(--spacing-2) * 1px);
		color: var(--color-primary);
		cursor: pointer;
		transition: opacity var(--transition);
		background-color: var(--color-gray-10);
		&[data-correct='true'] {
			background-color: var(--color-success-10);
			border-color: var(--color-success);
			color: var(--color-white);
		}
		&[data-incorrect='true'] {
			background-color: var(--color-warning-10);
			border-color: var(--color-warning);
			color: var(--color-white);
		}
		&:disabled {
			cursor: default;
		}
		&:hover,
		&:active {
			opacity: var(--opacity);
		}
	}
	@media (min-width: 640px) {
		.option-button {
			border-radius: calc(var(--border-radius) * 1px);
			font-size: calc(var(--font-size-2) * 1px);
			border: 1px solid var(--color-gray);
			&[data-correct='true'] {
				box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-success);
			}
			&[data-incorrect='true'] {
				box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-warning);
			}
		}
	}
	@media (max-width: 639px) {
		.option-button {
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			font-size: calc(var(--calc-sp) * var(--font-size-2));
			border: calc(var(--calc-sp) * 1) solid var(--color-gray);
			&[data-correct='true'] {
				box-shadow: 0 0 calc(var(--calc-sp) * var(--spacing-1)) var(--color-success);
			}
			&[data-incorrect='true'] {
				box-shadow: 0 0 calc(var(--calc-sp) * var(--spacing-1)) var(--color-warning);
			}
		}
	}
</style>
