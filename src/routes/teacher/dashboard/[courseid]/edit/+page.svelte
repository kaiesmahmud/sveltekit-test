<script>
    import SectionDetails from '$lib/components/SectionDetails.svelte';
    import CourseNameUpdate from '$lib/components/CourseNameUpdate.svelte';
    import ImageUpdate from '$lib/components/ImageUpdate.svelte';
    import Summary from '$lib/components/Summary.svelte';
  import UpdateSummary from '../../../../../lib/components/UpdateSummary.svelte';

    export let data
    let viewCourseDetails = data.viewCourseDetails
    console.log("Got ",viewCourseDetails)
    const {shortname,fullname,courseimage,courseSectionDetails,summary} = viewCourseDetails

    let cssbtn = "px-5 py-3 font-semibold text-xl bg-slate-800 text-white/80 hover:text-white hover:bg-slate-700 rounded transition-all ease-in duration-150"
    let inputCSS = "border border-black p-5 rounded w-full text-2xl"
</script>

<h6 class=" text-center">{viewCourseDetails.displayname}</h6>

<div class="custom__container">
    <ImageUpdate courseimage={courseimage} shortname={shortname} cssbtn={cssbtn}/>
</div>

<div class="custom__container mt-10">
    <CourseNameUpdate shortname={shortname} fullname={fullname} inputCSS={inputCSS} cssbtn={cssbtn}/>
</div>
{#if summary}
    <UpdateSummary summary={summary} cssbtn={cssbtn} />
{/if}

<div class="mt-10 flex flex-col gap-10 ">
    {#each courseSectionDetails as section}
        <SectionDetails section={section}/>
    {/each}
</div>