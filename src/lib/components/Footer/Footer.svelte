<script lang="ts">
	import Inner from '$lib/components/Inner/Inner.svelte';
	import { siteData } from '$lib/const/siteData';

	let { year } = $props();
</script>

<footer class="footer">
	<Inner>
		<small class="footer__text">&copy; {year} {siteData.title}</small>
	</Inner>
</footer>

<style>
	@media (min-width: 640px) {
		.footer {
			padding: calc(var(--spacing-2) * 1px);
			background-color: var(--color-primary);
			text-align: center;
			color: var(--color-white);
		}
		.footer__text {
			color: var(--color-white);
			font-size: calc(var(--font-size-1) * 1px);
		}
	}
	@media (max-width: 639px) {
		.footer {
			padding: calc(var(--calc-sp) * var(--spacing-2));
			background-color: var(--color-primary);
			text-align: center;
			color: var(--color-white);
		}
		.footer__text {
			color: var(--color-white);
			font-size: calc(var(--calc-sp) * var(--font-size-1));
		}
	}
</style>
