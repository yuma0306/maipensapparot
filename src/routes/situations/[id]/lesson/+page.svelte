<script lang="ts">
	import type { LessonResult } from '$lib/types';
	import type { PageProps } from '../$types';

	let props: PageProps = $props();
	const situation = $derived(props.data.situation);
	const phrases = $derived(situation.phrases);
	const total = $derived(phrases.length);

	let currentIndex = $state(0);
	let userInput = $state('');
	let results: LessonResult[] = $state([]);
	let isWrong = $state(false);

	const currentPhrase = $derived(phrases[currentIndex]);
	const isFinished = $derived(currentIndex >= total);
	const correctCount = $derived(results.filter((r) => r.correct).length);

	function checkInput() {
		if (userInput === currentPhrase.thai) {
			results.push({ phrase: currentPhrase, correct: true });
			advance();
		} else if (userInput.length >= currentPhrase.thai.length) {
			isWrong = true;
		}
	}

	function skipPhrase() {
		results.push({ phrase: currentPhrase, correct: false });
		advance();
	}

	function advance() {
		currentIndex++;
		userInput = '';
		isWrong = false;
	}

	function handleInput() {
		isWrong = false;
		checkInput();
	}
</script>

{#if !isFinished}
	<div class="lesson">
		<div class="progress">
			{currentIndex + 1} / {total}
		</div>

		<div class="question">
			<p class="japanese-prompt">{currentPhrase.japanese}</p>
		</div>

		<div class="input-area">
			<input
				type="text"
				bind:value={userInput}
				oninput={handleInput}
				placeholder="タイ語を入力..."
				lang="th"
			/>
		</div>

		{#if isWrong}
			<p class="wrong-message">不一致です。もう一度試すか、スキップしてください。</p>
			<p class="hint">正解: {currentPhrase.thai}</p>
		{/if}

		<button onclick={skipPhrase} class="skip-button">スキップ（不正解扱い）</button>
	</div>
{:else}
	<h1>結果 — {situation.title}</h1>

	<div class="score">
		<p>スコア: {correctCount} / {total}</p>
	</div>

	<div class="result-list">
		{#each results as result}
			<div class="result-card">
				<span class="result-mark">{result.correct ? '⭕' : '❌'}</span>
				<div class="result-content">
					<p class="thai">{result.phrase.thai}</p>
					<p class="japanese">{result.phrase.japanese}</p>
					<div class="words">
						<ul>
							{#each result.phrase.words as word}
								<li><strong>{word.thai}</strong> — {word.meaning}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<a href="/situations/{situation.id}" class="back-button">シチュエーション詳細に戻る</a>
{/if}
