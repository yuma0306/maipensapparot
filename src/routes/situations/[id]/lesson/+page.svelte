<script lang="ts">
	import { goto } from '$app/navigation';
	import { lessonResults } from '$lib/stores';
	import type { LessonResult } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { situation } = data;
	const phrases = situation.phrases;
	const total = phrases.length;

	let currentIndex = $state(0);
	let userInput = $state('');
	let results: LessonResult[] = $state([]);
	let isWrong = $state(false);

	const currentPhrase = $derived(phrases[currentIndex]);
	const isFinished = $derived(currentIndex >= total);

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

		if (currentIndex >= total) {
			lessonResults.set(results);
			goto(`/situations/${situation.id}/result`);
		}
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
				autofocus
				lang="th"
			/>
		</div>

		{#if isWrong}
			<p class="wrong-message">不一致です。もう一度試すか、スキップしてください。</p>
			<p class="hint">正解: {currentPhrase.thai}</p>
		{/if}

		<button onclick={skipPhrase} class="skip-button">スキップ（不正解扱い）</button>
	</div>
{/if}
