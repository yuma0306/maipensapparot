<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Situation } from '$lib/types';
	import type { Component } from 'svelte';
	import EatingIcon from '$lib/components/Icon/EatingIcon.svelte';
	import KrakenIcon from '$lib/components/Icon/KrakenIcon.svelte';

	type Props = {
		id: Situation['id'];
		title: Situation['title'];
	} & HTMLAnchorAttributes;

	let { id, title, ...restProps }: Props = $props();

	const iconMap: Record<string, Component> = {
		eating: EatingIcon
	};

	const Icon = $derived(iconMap[id] ?? KrakenIcon);
</script>

<a class="card" {...restProps}>
	<Icon />
	<p class="card__title">{title}</p>
</a>

<style>
	.card {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 2;
		place-content: center;
		place-items: center;
		background-color: var(--color-white);
		border: 1px solid var(--color-gray);
		overflow: hidden;
	}
	.card__title {
		color: var(--color-secondary);
		font-weight: bold;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		align-self: start;
	}
	@media (min-width: 640px) {
		.card {
			border-radius: calc(var(--border-radius) * 1px);
			box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
			padding: calc(var(--spacing-2) * 1px);
		}
		.card__title {
			font-size: calc(var(--font-size-3) * 1px);
		}
	}
	@media (max-width: 639px) {
		.card {
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			box-shadow: 0 0 calc(var(--calc-sp) * var(--spacing-1)) var(--color-gray);
			padding: calc(var(--calc-sp) * var(--spacing-2));
		}
		.card__title {
			font-size: calc(var(--calc-sp) * var(--font-size-3));
		}
	}
</style>
