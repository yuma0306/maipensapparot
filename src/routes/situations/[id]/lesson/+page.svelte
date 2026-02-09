<script lang="ts">
	import type { LessonResult } from '$lib/types';
	import type { PageProps } from './$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import SpeakButton from '$lib/components/SpeakButton/SpeakButton.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import ListItem from '$lib/components/ListItem/ListItem.svelte';
	import { paths } from '$lib/constants/paths';

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
	<Stack size={2} variant="section">
		<Stack size={1} variant="div">
			<Typography size={1} variant="p" color="dark" weight="bold" align="center">
				{currentIndex + 1} / {total}
			</Typography>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {(currentIndex / total) * 100}%"></div>
			</div>
		</Stack>

		<div class="question-card">
			<Typography size={4} variant="p" color="primary" weight="bold" align="center">
				{currentPhrase.japanese}
			</Typography>
			<div class="question-actions">
				<SpeakButton text={currentPhrase.thai} />
				<button
					onclick={() => (showAnswer = !showAnswer)}
					class="listen-button"
					aria-label="回答を見る"
				>
					{showAnswer ? '🙈 回答を隠す' : '👀 回答を見る'}
				</button>
			</div>
			{#if showAnswer}
				<Typography size={3} variant="p" color="gray" weight="normal" align="center">
					{currentPhrase.thai}
				</Typography>
			{/if}
		</div>

		<Stack size={1} variant="div">
			<div class="input-wrapper" class:correct-input={isCorrect}>
				{#if isCorrect}
					<span class="correct-mark">⭕</span>
				{/if}
				<input
					type="text"
					class="text-input"
					bind:value={userInput}
					oninput={handleInput}
					placeholder="タイ語を入力..."
					lang="th"
					disabled={isCorrect}
				/>
			</div>

			{#if !isCorrect}
				<button onclick={skipPhrase} class="skip-button">スキップ（不正解扱い）</button>
			{/if}

			{#if isCorrect}
				<button onclick={advance} class="next-button">次へ進む</button>
			{/if}
		</Stack>
	</Stack>
{:else}
	<Stack size={1} variant="section">
		<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
			結果 — {situation.title}
		</Typography>
		<div class="score-card">
			<Typography size={1} variant="p" color="dark" weight="bold" align="center">スコア</Typography>
			<Typography size={5} variant="p" color="secondary" weight="bold" align="center">
				{correctCount}
				<Typography size={5} variant="span" color="dark" weight="normal" align="center">
					/
				</Typography>
				{total}
			</Typography>
		</div>
	</Stack>

	<Spacer size={2} variant="div" />

	<Stack size={1} variant="section">
		<Stack size={1} variant="div">
			{#each results as result}
				<div class="result-card" class:correct={result.correct} class:incorrect={!result.correct}>
					<span class="result-mark">{result.correct ? '⭕' : '❌'}</span>
					<div class="result-content">
						<div class="thai">
							<Typography size={2} variant="span" color="primary" weight="bold" align="left">
								{result.phrase.thai}
							</Typography>
							<SpeakButton text={result.phrase.thai} />
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
	</Stack>

	<Spacer size={2} variant="div" />

	<Button href={paths.situation(situation.id)}>シチュエーション詳細に戻る</Button>
{/if}

<style>
	.progress-bar {
		height: 6px;
		background-color: var(--color-primary-10);
		border-radius: 3px;
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		background-color: var(--color-secondary);
		border-radius: 3px;
		transition: width var(--transition);
	}
	.question-card {
		display: grid;
		justify-items: center;
		row-gap: calc(var(--spacing-1) * 1px);
		padding: calc(var(--spacing-2) * 1px) calc(var(--spacing-1) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
		border: 1px solid var(--color-gray);
		text-align: center;
	}
	.question-actions {
		display: flex;
		gap: calc(var(--spacing-1) * 1px);
		justify-content: center;
		flex-wrap: wrap;
	}
	.listen-button {
		padding: calc(var(--spacing-1) * 1px);
		font-size: calc(var(--font-size-2) * 1px);
		background: var(--color-primary-10);
		border: 1px solid var(--color-gray);
		border-radius: calc(var(--border-radius) * 1px);
		cursor: pointer;
		color: var(--color-dark);
		transition: background-color var(--transition);
		&:hover {
			background-color: var(--color-primary-5);
		}
	}
	.input-wrapper {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-1) * 1px);
		border: 2px solid var(--color-gray);
		border-radius: calc(var(--border-radius) * 1px);
		transition:
			border-color var(--transition),
			background-color var(--transition);
		&:focus-within {
			border-color: var(--color-secondary);
		}
	}
	.input-wrapper.correct-input {
		border-color: var(--color-success);
		background-color: color-mix(in srgb, var(--color-success) 5%, #fff);
	}
	.correct-mark {
		padding-left: calc(var(--spacing-1) * 1px);
		font-size: calc(var(--font-size-3) * 1px);
		flex-shrink: 0;
	}
	.text-input {
		width: 100%;
		padding: calc(var(--spacing-1) * 1px);
		font-size: calc(var(--font-size-2) * 1px);
		border: none;
		border-radius: calc(var(--border-radius) * 1px);
		outline: none;
		background: transparent;
		font-family: var(--font-family);
	}
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
	.skip-button {
		width: 100%;
		padding: calc(var(--spacing-1) * 1px);
		font-size: calc(var(--font-size-1) * 1px);
		font-weight: 700;
		border: 2px solid var(--color-dark);
		border-radius: calc(var(--border-radius) * 1px);
		background: none;
		color: var(--color-dark);
		cursor: pointer;
		transition:
			background-color var(--transition),
			color var(--transition);
		&:hover {
			background-color: var(--color-primary);
			color: var(--color-white);
		}
	}
	.score-card {
		text-align: center;
		padding: calc(var(--spacing-2) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
		border: 1px solid var(--color-gray);
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
