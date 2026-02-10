<script lang="ts">
	import '$lib/styles/reset.css';
	import '$lib/styles/app.css';
	import Wrapper from '$lib/components/Wrapper/Wrapper.svelte';
	import Main from '$lib/components/Main/Main.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import { siteData } from '$lib/constants/siteData';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href={`https://${siteData.domain}`} />
	<title>{siteData.siteName}</title>
	<meta name="description" content={siteData.commonMetaData.description} />
	<meta property="og:title" content={siteData.siteName} />
	<meta
		property="og:description"
		content="マイペンサッパロットは、タイ語とタイ文字タイピングを学習するためのサイトです。"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://${siteData.domain}`} />
</svelte:head>

<Wrapper>
	<Header />
	<Main>
		{@render children()}
	</Main>
	<Footer />
</Wrapper>
