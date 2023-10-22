<script>
	import { handleEditBtn } from './../../../../lib/fetch/editCourse.js';
  import SectionDetails from "../../../../lib/components/SectionDetails.svelte";

    export let data
    let viewCourseDetails = data.viewCourseDetails
    // console.log("Got ",viewCourseDetails)
    const {shortname,fullname,courseimage,courseSectionDetails} = viewCourseDetails
    let cssbtn = "px-5 py-3 font-semibold text-xl bg-slate-800 text-white/80 hover:text-white hover:bg-slate-700 rounded transition-all ease-in duration-150"
    let handleEdit = () => {
        handleEditBtn(viewCourseDetails.id)
    }
</script>

<h6 class=" text-center">{viewCourseDetails.displayname}</h6>
<div class="flex justify-center gap-5 bg-slate-50 rounded overflow-hidden shadow-lg p-5">
    <div class="w-[45%]">
        <img src={courseimage} alt={shortname} class="rounded">
    </div>
    <div class="w-[45%] bg-white flex flex-col items-start justify-between">
        <div>
            <h1 class="text-start text-black">{fullname}</h1>
            <h2 class="py-2 px-5 bg-teal-800 text-white inline-block rounded-full">{shortname}</h2>
        </div>
        <button on:click={handleEdit} class={cssbtn}>Edit Course</button>
    </div>
</div>
<div class="mt-10 flex flex-col gap-10 ">
    {#each courseSectionDetails as section}
        <SectionDetails section={section}/>
    {/each}
</div>