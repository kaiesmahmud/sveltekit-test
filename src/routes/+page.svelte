<script>
	import CourseShowCard from '$lib/components/CourseShowCard.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	export let data
	let enrolled =data.user?.enrolledcourses
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section >
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
		<p class="capitalize">
			{data.user?.username || 'Login Now'}
		</p>
	</h1>
	
	<h2>
		{#if !data.user?.username}
		  Please Login to see Courses
		{:else}
		  Find Best Courses
		{/if}
	</h2>
	<div class="flex flex-col items-center gap-5 w-full justify-center mt-5">
		{#if data.allCourses}
			{#each data.allCourses as course}
				<CourseShowCard 
					course={course} 
					enrolled={enrolled} 
					courseImages={data.courseImages} 
					userType={data.user?.userType}
					userToken={data.user?.token}
					/>
			{/each}
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
