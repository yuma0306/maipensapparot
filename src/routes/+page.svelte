<script lang="ts">
	import { situations } from '$lib/data/situations';
</script>

<h1>Learn Thai</h1>
<p>シチュエーションを選んで学習を始めましょう</p>

<div class="situation-list">
	{#each situations as situation}
		<a href="/situations/{situation.id}" class="situation-card">
			<h2>{situation.title}</h2>
			<p>{situation.description}</p>
			<span>{situation.phrases.length} フレーズ</span>
		</a>
	{/each}
</div>
