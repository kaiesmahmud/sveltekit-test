<script>
  import { onMount } from 'svelte';
	import { enrollCourse } from './../fetch/enrollCourse.js';
    export let userType
    export let userToken
    export let course
    export let enrolled
    export let courseImages
    let enrollmsg ;

    let handleEnroll = async()=>{
        const isEnrolled = await enrollCourse(userToken,course.id,userType) //Only For Students - Not Teachers
        if(!isEnrolled){ enrollmsg = " Checking Enrollment"}
    }
    
    // console.log("getting courseimages",courseImages)
    let open = false
    let onclick = ()=>{
        open = !open
    }
    let enroll = false
        if(enrolled){
            enroll = enrolled.some((c) => c.id === course.id);
        }else{
            enroll = false 
        }

</script>

<div class="w-1/2 bg-white rounded shadow p-5 capitalize">
    <div>
        <img src={courseImages[course.id]} alt={course.shortname}/>
    </div>
    <h3 class="text-4xl ">{course?.fullname}</h3>
    <br/>
    <h4>{course?.shortname}</h4>
    <br/>
    {#if open}
        <div contenteditable="false" bind:innerHTML={course.summary} class="p-3 ">
        </div>
        {#if userType == 'student'}
            {#if !enroll}
                <button on:click={handleEnroll}  class="p-3 rounded shadow bg-blue-400 font-bold text-black hover:bg-blue-500 transition-all ease-in">Enroll Now</button>
            {/if}
            {#if enroll}
                <button disabled="disabled" class="p-3 rounded shadow bg-red-300 font-bold text-black">Already Enroll</button>
            {/if}
        {/if}
    {/if}
    {#if open}
        <button on:click={onclick}  class="p-3 rounded shadow bg-teal-400 font-bold text-black hover:bg-teal-500 transition-all ease-in">Close Summary</button>        
    {:else }
        <button on:click={onclick}  class="p-3 rounded shadow bg-teal-400 font-bold text-black hover:bg-teal-500 transition-all ease-in">Read Summary</button>
    {/if}
    {#if enrollmsg}
        <p>{enrollmsg}</p>
    {/if}
</div>
