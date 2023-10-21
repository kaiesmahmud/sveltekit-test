<script>
	// import { addCourseImg } from './../fetch/addCourseImg.js';
    // export let data
    export let course
    export let enrolled
    let open = false
    let onclick = ()=>{
        open = !open
    }
    let enroll
        if(enrolled){
            enroll = enrolled.some((c) => c.id === course.id);
        }else{
            enroll = false 
        }
        // console.log(enroll)
        // let img =  addCourseImg(data.user.token,course.id)
</script>

<div class="w-1/2 bg-white rounded shadow p-5 capitalize">
    <div>
        <!-- {#if img}
            <img src={img} alt={course.shortname}/>
            {/if} -->
            <img src={course?.courseimage} alt={course.shortname}/>
    </div>
    <h3 class="text-4xl ">{course?.fullname}</h3>
    <h4>{course?.shortname}</h4>
    {#if open}
        <div contenteditable="false" bind:innerHTML={course.summary} class="p-3 ">
        </div>
        {#if !enroll}
            <button  class="p-3 rounded shadow bg-blue-300 font-bold text-black">Enroll Now</button>
        {/if}
        {#if enroll}
            <button disabled="disabled" class="p-3 rounded shadow bg-red-300 font-bold text-black">Already Enroll</button>
        {/if}
    {/if}
    
    <button on:click={onclick}  class="p-3 rounded shadow bg-teal-400 font-bold text-black">Read Summary</button>
</div>
