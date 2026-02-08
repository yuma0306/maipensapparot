<script lang="ts">
	import { situations } from '$lib/data/situations';
	import CardList from '$lib/components/CardList/CardList.svelte';
	import { siteData } from '$lib/const/siteData';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';
	import CardImage from '$lib/components/CardImage/CardImage.svelte';
</script>

<Stack size={2} variant="section">
	<h2 class="heading">{siteData.title}へようこそ</h2>
	<p class="lead">シチュエーションを選んで学習を始めましょう</p>
</Stack>
<Spacer size={3} variant="div" />
<CardList>
	{#each situations as situation}
		<CardImage
			variant="a"
			href={`/situations/${situation.id}`}
			id={situation.id}
			title={situation.title}
			description={situation.description}
		/>
	{/each}
</CardList>

<style>
	.heading {
		font-size: calc(var(--font-size-5) * 1px);
		text-align: center;
		font-weight: 700;
		color: var(--color-secondary);
	}
	.lead {
		font-size: calc(var(--font-size-1) * 1px);
		text-align: center;
	}
</style>
