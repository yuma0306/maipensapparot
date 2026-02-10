<script lang="ts">
	type Props = {
		onclick: () => void;
	};

	let { onclick }: Props = $props();
</script>

<button {onclick} class="skip">スキップ</button>

<style>
	.skip {
		position: absolute;
		background-color: var(--color-primary);
		color: var(--color-white);
		font-weight: 700;
		cursor: pointer;
	}
	@media (min-width: 640px) {
		.skip {
			left: calc(var(--spacing-2) * 1px);
			bottom: calc(var(--spacing-5) * 1px);
			padding: calc(var(--spacing-2) * 1px);
			font-size: calc(var(--font-size-1) * 1px);
			border-radius: calc(var(--border-radius) * 1px);
		}
	}
	@media (max-width: 639px) {
		.skip {
			left: calc(var(--calc-sp) * var(--spacing-2));
			bottom: calc(var(--calc-sp) * var(--spacing-5));
			padding: calc(var(--spacing-2) * var(--calc-sp));
			font-size: calc(var(--calc-sp) * var(--font-size-1));
			border-radius: calc(var(--calc-sp) * var(--border-radius));
		}
	}
</style>
