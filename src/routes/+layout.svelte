<script lang="ts">
	import '../reset.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Wrapper from '$lib/components/Wrapper/Wrapper.svelte';
	import Main from '$lib/components/Main/Main.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Logo from '$lib/components/Logo/Logo.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Wrapper>
	<Header>
		<Logo variant="a" href="/" />
	</Header>
	<Main>
		{@render children()}
	</Main>
	<Footer year={data.year} />
</Wrapper>
