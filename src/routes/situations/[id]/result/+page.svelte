<script lang="ts">
	import { lessonResults } from '$lib/stores';
	import type { LessonResult } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { situation } = data;

	let results: LessonResult[] = $state([]);

	lessonResults.subscribe((value) => {
		results = value;
	});

	const correctCount = $derived(results.filter((r) => r.correct).length);
	const totalCount = $derived(results.length);
</script>

<h1>結果 — {situation.title}</h1>

{#if results.length === 0}
	<p>結果データがありません。レッスンを先に受けてください。</p>
	<a href="/situations/{situation.id}">シチュエーション詳細に戻る</a>
{:else}
	<div class="score">
		<p>スコア: {correctCount} / {totalCount}</p>
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
