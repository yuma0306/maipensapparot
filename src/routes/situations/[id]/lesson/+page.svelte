<script lang="ts">
	import type { LessonResult } from '$lib/types';
	import type { PageProps } from './$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import ListItem from '$lib/components/ListItem/ListItem.svelte';
	import { paths } from '$lib/constants/paths';
	import VoiceButton from '$lib/components/VoiceButton/VoiceButton.svelte';
	import QuestionCard from '$lib/components/QuestionCard/QuestionCard.svelte';
	import Progress from '$lib/components/Progress/Progress.svelte';
	import Inner from '$lib/components/Inner/Inner.svelte';
	import SkipButton from '$lib/components/SkipButton/SkipButton.svelte';
	import ScoreCard from '$lib/components/ScoreCard/ScoreCard.svelte';
	import Input from '$lib/components/Input/Input.svelte';

	let props: PageProps = $props();
	const situation = $derived(props.data.situation);
	const phrases = $derived(situation.phrases);
	const total = $derived(phrases.length);

	let currentIndex = $state(0);
	let userInput = $state('');
	let results: LessonResult[] = $state([]);
	let isCorrect = $state(false);
	let showAnswer = $state(false);

	const currentPhrase = $derived(phrases[currentIndex]);
	const isFinished = $derived(currentIndex >= total);
	const correctCount = $derived(results.filter((r) => r.correct).length);

	function checkInput() {
		if (userInput === currentPhrase.thai) {
			results.push({ phrase: currentPhrase, correct: true });
			isCorrect = true;
		}
	}

	function skipPhrase() {
		results.push({ phrase: currentPhrase, correct: false });
		advance();
	}

	function advance() {
		currentIndex++;
		userInput = '';
		isCorrect = false;
		showAnswer = false;
	}

	function handleInput() {
		checkInput();
	}
</script>

{#if !isFinished}
	<Inner>
		<Stack size={3} variant="section">
			<Stack size={1} variant="div">
				<Typography size={1} variant="p" color="dark" weight="bold" align="center">
					{currentIndex + 1} / {total}
				</Typography>
				<Progress value={currentIndex} max={total} />
			</Stack>
			<QuestionCard japanese={currentPhrase.japanese} thai={currentPhrase.thai} {showAnswer} />
			<Stack size={1} variant="div">
				<Input {isCorrect} bind:userInput {handleInput} />
				{#if isCorrect}
					<Button onclick={advance}>次へ進む</Button>
					<button onclick={advance} class="next-button">次へ進む</button>
				{/if}
			</Stack>
		</Stack>
	</Inner>
	{#if !isCorrect}
		<SkipButton onclick={skipPhrase} />
	{/if}
{:else}
	<Inner>
		<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
			結果
		</Typography>
		<ScoreCard score={correctCount} {total} />
		<Stack size={1} variant="div">
			{#each results as result}
				<div class="result-card" class:correct={result.correct} class:incorrect={!result.correct}>
					<span class="result-mark">{result.correct ? '⭕' : '❌'}</span>
					<div class="result-content">
						<div class="thai">
							<Typography size={2} variant="span" color="primary" weight="bold" align="left">
								{result.phrase.thai}
							</Typography>
							<VoiceButton text={result.phrase.thai} />
						</div>
						<Typography size={1} variant="p" color="dark" weight="normal" align="left">
							{result.phrase.japanese}
						</Typography>
						<Stack size={1} variant="ul">
							{#each result.phrase.words as word}
								<ListItem symbol="dot">
									<strong>{word.thai}</strong> — {word.meaning}
								</ListItem>
							{/each}
						</Stack>
					</div>
				</div>
			{/each}
		</Stack>

		<Button href={paths.situation(situation.id)}>戻る</Button>
	</Inner>
{/if}

<style>
	.next-button {
		width: 100%;
		padding: calc(var(--spacing-1) * 1px);
		font-size: calc(var(--font-size-1) * 1px);
		font-weight: 700;
		border: none;
		border-radius: calc(var(--border-radius) * 1px);
		background-color: var(--color-success);
		color: var(--color-white);
		cursor: pointer;
		transition: opacity var(--transition);
		&:hover {
			opacity: 0.8;
		}
	}
	.result-card {
		display: flex;
		gap: calc(var(--spacing-1) * 1px);
		padding: calc(var(--spacing-1) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
		border: 1px solid var(--color-gray);
	}
	.result-card.correct {
		border-left: 4px solid var(--color-success);
	}
	.result-card.incorrect {
		border-left: 4px solid var(--color-danger);
	}
	.result-mark {
		font-size: calc(var(--font-size-3) * 1px);
		flex-shrink: 0;
	}
	.result-content {
		display: grid;
		row-gap: 4px;
	}
	.thai {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-1) * 1px);
	}
</style>
