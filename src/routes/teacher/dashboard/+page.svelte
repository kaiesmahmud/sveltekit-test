<script>
	import AllEnrollCards from '$lib/components/AllEnrollCards.svelte';
    export let data
    let allEnrolledCourses = data.enrolledCourses
</script>

<div class="flex justify-between">
    <h1>Teacher-dashboard</h1>
    <form  method="post">
        <button class="p-3 border bg-slate-500 rounded font-semibold text-white" >Logout</button>
    </form>
</div>
<div>
    <h2>Enrolled - Courses</h2>
    {#if allEnrolledCourses.length > 0}
    <AllEnrollCards allEnrolledCourses={allEnrolledCourses} userType={data.user?.userType}/>
    {:else}
    <p class="flex flex-col py-20 justify-center items-center gap-6 font-semibold text-2xl text-red-400">
        No Courses Enrolled !
        <a href="/" class="px-5 py-2 border bg-slate-500 rounded font-semibold text-white hover:bg-slate-800 transition-all ease-in duration-150">Browse Courses !</a>
    </p>
    {/if}
</div>