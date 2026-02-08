<script lang="ts">
	import type { Phrase } from '$lib/types';

	type SpeakButtonProps = {
		text: Phrase['thai'];
	};

	let props: SpeakButtonProps = $props();

	function speak(text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = 'th-TH';
		speechSynthesis.speak(utterance);
	}
</script>

<button onclick={() => speak(props.text)} class="button">再生</button>

<style>
	.button {
		background-color: var(--color-secondary-10);
		color: var(--color-secondary);
		border: 1px solid var(--color-secondary);
		transition: opacity var(--transition);
		line-height: 1;
		&:hover {
			opacity: var(--opacity);
		}
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
