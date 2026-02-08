<script lang="ts">
	import type { LessonResult } from '$lib/types';
	import type { PageProps } from '../$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';

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

	function speak(text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'th-TH';
		speechSynthesis.speak(utterance);
	}
</script>

{#if !isFinished}
	<Stack size={3} variant="section">
		<a href="/situations/{situation.id}" class="back-link">&larr; 戻る</a>

		<Stack size={2} variant="div">
			<p class="progress">{currentIndex + 1} / {total}</p>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {(currentIndex / total) * 100}%"></div>
			</div>
		</Stack>

		<div class="question-card">
			<p class="japanese-prompt">{currentPhrase.japanese}</p>
			<div class="question-actions">
				<button
					onclick={() => speak(currentPhrase.thai)}
					class="listen-button"
					aria-label="タイ語の音声を聞く"
				>
					🔊 発音を聞く
				</button>
				<button
					onclick={() => (showAnswer = !showAnswer)}
					class="listen-button"
					aria-label="回答を見る"
				>
					{showAnswer ? '🙈 回答を隠す' : '👀 回答を見る'}
				</button>
			</div>
			{#if showAnswer}
				<p class="answer-text">{currentPhrase.thai}</p>
			{/if}
		</div>

		<Stack size={2} variant="div">
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
	<Stack size={2} variant="section">
		<h1 class="heading">結果 — {situation.title}</h1>
		<div class="score-card">
			<p class="score-label">スコア</p>
			<p class="score-value">{correctCount} <span class="score-divider">/</span> {total}</p>
		</div>
	</Stack>

	<Spacer size={3} variant="div" />

	<Stack size={2} variant="section">
		<h2 class="sub-heading">回答一覧</h2>
		<Stack size={2} variant="div">
			{#each results as result}
				<div class="result-card" class:correct={result.correct} class:incorrect={!result.correct}>
					<span class="result-mark">{result.correct ? '⭕' : '❌'}</span>
					<div class="result-content">
						<p class="thai">
							{result.phrase.thai}
							<button
								onclick={() => speak(result.phrase.thai)}
								class="speak-button"
								aria-label="音声再生">🔊</button
							>
						</p>
						<p class="japanese">{result.phrase.japanese}</p>
						<ul class="word-list">
							{#each result.phrase.words as word}
								<li><strong>{word.thai}</strong> — {word.meaning}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</Stack>
	</Stack>

	<Spacer size={3} variant="div" />

	<a href="/situations/{situation.id}" class="back-button">シチュエーション詳細に戻る</a>
{/if}

<style>
	/* 共通 */
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
	.sub-heading {
		font-size: calc(var(--font-size-3) * 1px);
		font-weight: 700;
		color: var(--color-primary);
	}

	/* レッスン */
	.progress {
		text-align: center;
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
		font-weight: 700;
	}
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
		row-gap: calc(var(--spacing-2) * 1px);
		padding: calc(var(--spacing-3) * 1px) calc(var(--spacing-2) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: var(--shadow);
		border: 1px solid var(--color-gray);
		text-align: center;
	}
	.question-actions {
		display: flex;
		gap: calc(var(--spacing-1) * 1px);
		justify-content: center;
		flex-wrap: wrap;
	}
	.answer-text {
		font-size: calc(var(--font-size-3) * 1px);
		color: var(--color-gray);
	}
	.listen-button {
		padding: calc(var(--spacing-1) * 1px) calc(var(--spacing-2) * 1px);
		font-size: calc(var(--font-size-1) * 1px);
		background: none;
		border: 1px solid var(--color-gray);
		border-radius: calc(var(--border-radius) * 1px);
		cursor: pointer;
		color: var(--color-dark);
		transition: background-color var(--transition);
		&:hover {
			background-color: var(--color-primary-5);
		}
	}
	.japanese-prompt {
		font-size: calc(var(--font-size-4) * 1px);
		font-weight: 700;
		color: var(--color-primary);
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
		padding-left: calc(var(--spacing-2) * 1px);
		font-size: calc(var(--font-size-3) * 1px);
		flex-shrink: 0;
	}
	.text-input {
		width: 100%;
		padding: calc(var(--spacing-2) * 1px);
		font-size: calc(var(--font-size-2) * 1px);
		border: none;
		border-radius: calc(var(--border-radius) * 1px);
		outline: none;
		background: transparent;
		font-family: var(--font-family);
	}
	.next-button {
		width: 100%;
		padding: calc(var(--spacing-2) * 1px);
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
	.wrong-box {
		padding: calc(var(--spacing-2) * 1px);
		background-color: color-mix(in srgb, var(--color-danger) 8%, #fff);
		border: 1px solid var(--color-danger);
		border-radius: calc(var(--border-radius) * 1px);
	}
	.wrong-message {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-danger);
	}
	.hint {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-1) * 1px);
		font-size: calc(var(--font-size-2) * 1px);
		color: var(--color-primary);
		margin-top: 4px;
	}
	.skip-button {
		width: 100%;
		padding: calc(var(--spacing-2) * 1px);
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

	/* 結果 */
	.score-card {
		text-align: center;
		padding: calc(var(--spacing-3) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: var(--shadow);
		border: 1px solid var(--color-gray);
	}
	.score-label {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
		font-weight: 700;
	}
	.score-value {
		font-size: calc(var(--font-size-5) * 1px);
		font-weight: 700;
		color: var(--color-secondary);
	}
	.score-divider {
		color: var(--color-dark);
		font-weight: 400;
	}
	.result-card {
		display: flex;
		gap: calc(var(--spacing-2) * 1px);
		padding: calc(var(--spacing-2) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: var(--shadow);
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
		font-size: calc(var(--font-size-2) * 1px);
		font-weight: 700;
		color: var(--color-primary);
	}
	.speak-button {
		background: none;
		border: 1px solid var(--color-gray);
		border-radius: calc(var(--border-radius) * 1px);
		padding: calc(var(--spacing-1) * 0.5px) calc(var(--spacing-1) * 1px);
		cursor: pointer;
		font-size: calc(var(--font-size-1) * 1px);
		transition: background-color var(--transition);
		flex-shrink: 0;
		&:hover {
			background-color: var(--color-primary-5);
		}
	}
	.japanese {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
	}
	.word-list {
		display: grid;
		row-gap: 4px;
		padding-left: calc(var(--spacing-2) * 1px);
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
	}
	.back-button {
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
