<script>
	import EnrollCourseCard from './EnrollCourseCard.svelte';
    export let allEnrolledCourses
    export let userType
</script>
<div class="flex justify-center gap-5 flex-wrap p-5">
    {#each allEnrolledCourses as course}
        <EnrollCourseCard course={course} userType={userType} />
    {/each}
</div>