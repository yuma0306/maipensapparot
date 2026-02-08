<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { situation } = data;

	function speak(text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'th-TH';
		speechSynthesis.speak(utterance);
	}
</script>

<a href="/">&larr; ホームに戻る</a>

<h1>{situation.title}</h1>
<p>{situation.description}</p>

<div class="phrase-list">
	{#each situation.phrases as phrase}
		<div>
			<span class="thai">{phrase.thai}</span>
			<button onclick={() => speak(phrase.thai)} aria-label="音声再生">🔊</button>
			<p class="japanese">{phrase.japanese}</p>
			<div class="words">
				<h4>単語解説</h4>
				<ul>
					{#each phrase.words as word}
						<li><strong>{word.thai}</strong> — {word.meaning}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>

<a href="/situations/{situation.id}/lesson" class="start-button">レッスンをスタート</a>
