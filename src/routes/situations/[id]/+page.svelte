<script lang="ts">
	import type { PageData } from './$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';

	let { data }: { data: PageData } = $props();
	const situation = $derived(data.situation);

	function speak(text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'th-TH';
		speechSynthesis.speak(utterance);
	}
</script>

<Stack size={2} variant="section">
	<a href="/" class="back-link">ホームに戻る</a>
	<h1 class="heading">{situation.title}</h1>
	<p class="description">{situation.description}</p>
</Stack>

<Spacer size={3} variant="div" />

<Stack size={2} variant="section">
	<h2 class="sub-heading">フレーズ一覧</h2>
	<Stack size={2} variant="div">
		{#each situation.phrases as phrase}
			<div class="phrase-card">
				<div class="phrase-main">
					<div class="phrase-header">
						<span class="thai">{phrase.thai}</span>
						<button onclick={() => speak(phrase.thai)} class="speak-button" aria-label="音声再生"
							>🔊</button
						>
					</div>
					<p class="japanese">{phrase.japanese}</p>
				</div>
				<ul class="word-list">
					{#each phrase.words as word}
						<li><strong>{word.thai}</strong> — {word.meaning}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</Stack>
</Stack>

<Spacer size={3} variant="div" />

<a href="/situations/{situation.id}/lesson" class="start-button">レッスンをスタート</a>

<style>
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
	.description {
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
	}
	.sub-heading {
		font-size: calc(var(--font-size-3) * 1px);
		font-weight: 700;
		color: var(--color-primary);
	}
	.phrase-card {
		display: grid;
		row-gap: calc(var(--spacing-2) * 1px);
		padding: calc(var(--spacing-2) * 1px);
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
		border: 1px solid var(--color-gray);
	}
	@media (min-width: 640px) {
		.phrase-card {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 20px;
		}
	}
	.phrase-main {
		display: grid;
		row-gap: calc(var(--spacing-1) * 1px);
	}
	.phrase-header {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-1) * 1px);
	}
	.thai {
		font-size: calc(var(--font-size-3) * 1px);
		font-weight: 700;
		color: var(--color-primary);
	}
	.speak-button {
		background: none;
		border: 1px solid var(--color-gray);
		border-radius: calc(var(--border-radius) * 1px);
		padding: calc(var(--spacing-1) * 0.5px) calc(var(--spacing-1) * 1px);
		cursor: pointer;
		transition: background-color var(--transition);
		&:hover {
			background-color: var(--color-primary-5);
		}
	}
	.japanese {
		color: var(--color-dark);
	}
	.word-list {
		display: grid;
		row-gap: 4px;
		padding-left: calc(var(--spacing-2) * 1px);
		font-size: calc(var(--font-size-1) * 1px);
		color: var(--color-dark);
	}
	@media (min-width: 640px) {
		.word-list {
			border-left: 1px solid var(--color-gray);
			padding-left: calc(var(--spacing-3) * 1px);
		}
	}
	@media (max-width: 639px) {
		.word-list {
			border-top: 1px solid var(--color-gray);
			padding-top: calc(var(--spacing-1) * 1px);
		}
	}
	.start-button {
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
