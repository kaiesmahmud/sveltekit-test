<script>
    export let data
    let enrolledCourses = data.user?.enrolledcourses
</script>
<div class="flex justify-between">
    <h1>Student-dashboard</h1>
    <form  method="post">
        <button class="p-3 border bg-slate-500 rounded font-semibold text-white" >Logout</button>
    </form>
</div>
<div>
    <h2>Enrolled - Courses</h2>
    <div class="flex items-center text-lg font-light gap-5 mt-10">
        <!-- {#each enrolledCourses as course  }
            <div class="flex flex-col flex-wrap items-center p-5 shadow-xl  bg-blue-400 rounded">
                <div class="w-full h-40 bg-gradient-to-t from-red-500 to-pink-600">
                </div>
                <h1 class="text-xl">{course.fullname}</h1>
                <p class="font-semibold">{course.shortname}</p>
            </div>
        {/each} -->
    </div>
</div>