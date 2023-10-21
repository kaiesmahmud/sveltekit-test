<script>
    export let course
    export let userType
    let courseDetailURL = "/"+userType+"/dashboard/"+course.id
</script>

<div class="w-[40%] bg-white rounded shadow p-5 capitalize">
    <div>
        <img src={course.courseimage} alt={course.shortname}/>
    </div>
    <h3 class="text-4xl ">{course?.fullname}</h3>
    <br/>
    <h4>{course?.shortname}</h4>
    <br/>
    <a href={courseDetailURL} class="px-5 py-2 border bg-slate-500 rounded font-semibold text-white hover:bg-slate-800 transition-all ease-in duration-150">View Course Details</a>
    
</div>