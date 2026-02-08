<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/app.css';
	import Wrapper from '$lib/components/Wrapper/Wrapper.svelte';
	import Main from '$lib/components/Main/Main.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Logo from '$lib/components/Logo/Logo.svelte';
	import Inner from '$lib/components/Inner/Inner.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={'/favicon.svg'} />
</svelte:head>

<Wrapper>
	<Header>
		<Logo variant="a" href="/" />
	</Header>
	<Main>
		<Inner>
			{@render children()}
		</Inner>
	</Main>
	<Footer year={data.year} />
</Wrapper>
