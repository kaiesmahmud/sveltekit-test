<script>
	import Header from './Header.svelte';
	import "../app.css";
	import './styles.css';
	export let data
	// console.log("Layout data is",data)
	const user = data.user

	// const logOut = async()=>{
	// 	console.log("pressing log out!!")
	// 	data.user = null;
	// 	// Delete the user's cookies
	// 	await cookies.delete('userType');
  	// 	await cookies.delete('email');
  	// 	await cookies.delete('pwd');
	// 	// Redirect the user to the login page
	// 	throw redirect(302,"/");
	// }
</script>

<div class="app">
	<!-- <Header user={user} logOut={logOut}/> -->
	<Header user={user} />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
