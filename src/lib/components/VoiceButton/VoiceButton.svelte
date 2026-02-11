<script lang="ts">
	import type { Phrase } from '$lib/types';
	import SoundIcon from '../Icon/SoundIcon.svelte';

	type Props = {
		text: Phrase['thai'];
	};

	let { text }: Props = $props();

	function speak(text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'th-TH';
		speechSynthesis.speak(utterance);
	}
</script>

<button onclick={() => speak(text)} class="button">
	<SoundIcon />
</button>

<style>
	.button {
		display: grid;
		place-content: center;
		background-color: var(--color-primary-10);
		border: 1px solid var(--color-primary);
		line-height: 1;
	}
	@media (min-width: 640px) {
		.button {
			cursor: pointer;
			padding: calc(var(--spacing-1) * 1px);
			border-radius: calc(var(--border-radius) * 1px);
		}
	}
	@media (max-width: 639px) {
		.button {
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			padding: calc(var(--calc-sp) * var(--spacing-1));
		}
	}
</style>
