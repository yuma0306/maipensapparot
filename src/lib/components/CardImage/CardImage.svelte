<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	type CommonProps = {
		id: string;
		title: string;
		description: string;
		image?: string;
	};

	type CardLinkProps = {
		variant: 'a';
	} & CommonProps &
		HTMLAnchorAttributes;

	type CardDivProps = {
		variant: 'div';
	} & CommonProps &
		HTMLAttributes<HTMLDivElement>;

	type CardProps = CardLinkProps | CardDivProps;

	let props: CardProps = $props();
</script>

<svelte:element this={props.variant} class="card" {...props}>
	<div class="card__head">
		<img class="card__image" src={props.image ?? `/images/${props.id}.jpg`} alt={props.title} />
	</div>
	<p class="card__title">{props.title}</p>
	<p class="card__description">{props.description}</p>
</svelte:element>

<style>
	.card {
		display: grid;
		grid-template-rows: subgrid;
		row-gap: calc(var(--spacing-2) * 1px);
		grid-row: span 4;
		background-color: var(--color-white);
		border-radius: calc(var(--border-radius) * 1px);
		box-shadow: var(--shadow);
		border: 1px solid var(--color-gray);
		overflow: hidden;
		&:hover {
			.card__image {
				scale: var(--scale);
			}
		}
	}
	.card__head {
		overflow: hidden;
	}
	.card__image {
		position: relative;
		display: block;
		object-fit: cover;
		aspect-ratio: 2;
		transition: scale var(--transition);
	}
	.card__title {
		color: var(--color-secondary);
		font-weight: bold;
		font-size: calc(var(--font-size-2) * 1px);
		padding-inline: calc(var(--spacing-1) * 1px);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.card__description {
		color: var(--color-primary);
		font-size: calc(var(--font-size-1) * 1px);
		padding-inline: calc(var(--spacing-1) * 1px);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
