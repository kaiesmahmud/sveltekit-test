<script>
    export let data
    let viewCourseDetails = data.viewCourseDetails
    // console.log("Got ",viewCourseDetails)
    const {shortname,fullname,courseimage,courseSectionDetails} = viewCourseDetails

</script>

<h6 class=" text-center">{viewCourseDetails.displayname}</h6>
<div class="flex justify-center gap-5 bg-slate-50 rounded overflow-hidden shadow-lg p-5">
    <div class="w-[45%]">
        <img src={courseimage} alt={shortname} class="rounded">
    </div>
    <div class="w-[45%] bg-white ">
        <h1 class="text-start">{fullname}</h1>
        <h2 class="p-3 bg-slate-800 text-white font-semibold inline-block rounded">{shortname}</h2>
    </div>
</div>