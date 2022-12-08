<script>
	import imageStatic from './image.png';
	const languages = import.meta.glob('./data/*.json');

	export let lang;

	const url = new URL('./data/de.json', import.meta.url);
	const urlWithParameter = new URL(`./data/${lang}.json`, import.meta.url);
</script>

<p>Globbing</p>

<div>Keys: {Object.keys(languages).length}</div>
{#if Object.keys(languages).length == 0}
	<div class="error">Expected 2 keys.</div>
{/if}

{#each Object.keys(languages) as key}
	<div>Key: {key}</div>
	{#await languages[key]()}
		Loading JSON
	{:then json}
		<div>Value: {json.value}</div>
	{:catch e}
		Failed to load JSON ({key})
		<div class="error">Error: {e.message}</div>
	{/await}
{/each}

<p>URL + fetch without parameter</p>
<div>URL: {url}</div>
{#await fetch(url).then(r => r.json())}
	Fetching JSON
{:then json}
	<div>Value: {json.value}</div>
{:catch e}
	Failed to fetch JSON
	<div class="error">Error: {e.message}</div>
{/await}

<p>URL + fetch with parameter</p>
<div>URL: {urlWithParameter}</div>
{#await fetch(urlWithParameter).then(r => r.json())}
	Fetching JSON
{:then json}
	<div>Value: {json.value}</div>
{:catch e}
	Failed to fetch JSON
	<div class="error">Error: {e.message}</div>
{/await}

<p>Dynamic import without parameter</p>
{#await import('./data/de.json').then(m => m.default)}
	Importing JSON
{:then json}
	<div>Value: {json.value}</div>
{:catch e}
	Failed to import JSON (./data/de.json)
	<div class="error">Error: {e.message}</div>
{/await}

<p>Dynamic import with parameter</p>
{#await import(`./data/${lang}.json`).then(m => m.default)}
	Importing JSON
{:then json}
	<div>Value: {json.value}</div>
{:catch e}
	Failed to import JSON (./data/{lang}.json)
	<div class="error">Error: {e.message}</div>
{/await}

<p>CSS url(...) reference</p>
<div class="bg-img" />

<p>&lt;img src&gt; reference</p>
<img src={imageStatic} alt="" />

<style>
	p { font-weight: bold; }

	.error { color: red; }

	.bg-img {
		width: 100px;
		height: 100px;
		background-image: url('./image.png');
		background-size: 100px;
	}
	img {
		width: 100px;
		height: 100px;
	}
</style>
