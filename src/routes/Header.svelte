<script>
	import { page } from '$app/stores';
	export let user
	// console.log("Header Data",user)

</script>

<header>
	
	<nav>
		<ul class="text-xl font-bold text-slate-800 px-5">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			{#if !user?.userType}
				<li aria-current={$page.url.pathname.startsWith('/student/login') ? 'page' : undefined}>
					<a href="/student/login">Student Login</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/teacher/login') ? 'page' : undefined}>
					<a href="/teacher/login">Teacher Login</a>
				</li>
			{/if}
			{#if user?.userType}
				<li class="p-3">
					Hi, {user.username}
				</li>
				
			{/if}
		</ul>
		
		{#if user?.userType}
		<div class="bg-white hover:bg-blue-300" >
			<a href="/{user.userType}/dashboard">
				<img src={user.profileimageurlsmall} alt="GitHub" class=" rounded-full "/>
			</a>
		</div>
		{/if}
	</nav>


	
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}


	ul {
		position: relative;
		/* padding: 0; */
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		/* font-weight: 700;
		font-size: 0.8rem; */
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
