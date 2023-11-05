<script>
    import CourseNameUpdate from '$lib/components/CourseNameUpdate.svelte';
    import ImageUpdate from '$lib/components/ImageUpdate.svelte';
    import UpdateSummary from '$lib/components/UpdateSummary.svelte';
    import UpdateSectionDetails from '$lib/components/UpdateSectionDetails.svelte';
    import "../../../../editorCss.css"

    export let data
    let viewCourseDetails = data.viewCourseDetails
    let token = data.user?.token

    console.log("Got CourseDetails",viewCourseDetails)
    const {shortname,fullname,courseimage,courseSectionDetails,summary,id} = viewCourseDetails

    let cssbtn = "px-5 py-3 font-semibold text-xl bg-slate-800 text-white/80 hover:text-white hover:bg-slate-700 rounded transition-all ease-in duration-150"
    let inputCSS = "border border-black p-5 rounded w-full text-2xl"
</script>

<h6 class=" text-center">{viewCourseDetails.displayname}</h6>

<div class="custom__container">
    <ImageUpdate  author={data.user?.username} id={id} courseimage={courseimage} shortname={shortname} cssbtn={cssbtn} token={token}/>
</div>

<div class="custom__container mt-10">
    <CourseNameUpdate courseid={id} token={data.user?.token} shortname={shortname} fullname={fullname} inputCSS={inputCSS} cssbtn={cssbtn}/>
</div>
{#if summary}
    <UpdateSummary summary={summary} cssbtn={cssbtn} token={token} courseid={id} shortname={shortname} fullname={fullname} />
{/if}

<!-- <div class="mt-10 flex flex-col gap-10 ">
    {#each courseSectionDetails as section}
        <UpdateSectionDetails section={section}/>
    {/each}
</div> -->

<style>
.one-column{
    min-height: 5rem;
}
.two-column{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-height: 5rem;
    
}
.gjs-row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    padding: 10px;
}
.gjs-row.gjs-cell {
  min-height: 5rem;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
}

</style>