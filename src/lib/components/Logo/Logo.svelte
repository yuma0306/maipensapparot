<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
	import { siteData } from '$lib/const/siteData';

	type H1Props = {
		variant: 'h1';
	} & HTMLAttributes<HTMLHeadingElement>;

	type LinkProps = {
		variant: 'a';
	} & HTMLAnchorAttributes;

	type LogoProps = H1Props | LinkProps;

	let props: LogoProps = $props();
</script>

<svelte:element this={props.variant} class="logo" {...props}>{siteData.title}</svelte:element>

<style>
	@media (min-width: 640px) {
		.logo {
			font-size: calc(var(--font-size-3) * 1px);
			color: var(--color-white);
		}
	}
	@media (max-width: 639px) {
		.logo {
			font-size: calc(var(--calc-sp) * var(--font-size-3));
			color: var(--color-white);
		}
	}
</style>
