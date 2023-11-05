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
	
    <link href="https://grapesjs.com/stylesheets/toastr.min.css" rel="stylesheet">
    <link href="https://grapesjs.com/stylesheets/grapes.min.css?v0.21.6" rel="stylesheet" >
    <link href="https://grapesjs.com/stylesheets/grapesjs-preset-webpage.min.css" rel="stylesheet" >
    <link href="https://grapesjs.com/stylesheets/tooltip.css" rel="stylesheet" >
    <link href="https://unpkg.com/grapick/dist/grapick.min.css" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/toastr.min.js"></script>
    <script src="js/grapes.min.js?v0.21.6"></script>
    <script src="https://unpkg.com/grapesjs-preset-webpage@1.0.2"></script>
    <script src="https://unpkg.com/grapesjs-blocks-basic@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-plugin-forms@2.0.5"></script>
    <script src="https://unpkg.com/grapesjs-component-countdown@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-plugin-export@1.0.11"></script>
    <script src="https://unpkg.com/grapesjs-tabs@1.0.6"></script>
    <script src="https://unpkg.com/grapesjs-custom-code@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-touch@0.1.1"></script>
    <script src="https://unpkg.com/grapesjs-parser-postcss@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-tooltip@0.1.7"></script>
    <script src="https://unpkg.com/grapesjs-tui-image-editor@0.1.3"></script>
    <script src="https://unpkg.com/grapesjs-typed@1.0.5"></script>
    <script src="https://unpkg.com/grapesjs-style-bg@2.0.1"></script>
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
