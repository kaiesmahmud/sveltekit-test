<script>
	import { updateCourseName } from './../fetch/UpdateData.js';
    export let shortname,fullname,inputCSS,cssbtn,token,courseid
    let newFullName = ""
    let newShortName = ""
    const onSubmit = (event) =>{
        // event.preventDefault();
        console.log(newFullName)
        console.log(newShortName)
        console.log(token)
        console.log(courseid)
        updateCourseName(token,courseid,newFullName,newShortName)
    }
</script>

<div class=" bg-white flex flex-col items-start justify-between gap-5">
    <h2>Previous Course Name & Shortname :</h2>
    <div>
        <h1 class="text-start text-black">{fullname}</h1>
        <h2 class="py-2 px-5 bg-teal-800 text-white inline-block rounded-full">{shortname}</h2>
    </div>
        <form  on:submit={onSubmit} class=" flex flex-col gap-7 w-[100%]" >
            <div class="flex flex-col gap-5 items-start justify-between w-full">
                <label for="fullname">Enter Full Course Name:</label>
                <input class={inputCSS} type="text" bind:value={newFullName} required name="fullname" id="fullname" placeholder={fullname}>
                <label for="shortname">Enter Short Course Name:</label>
                <input class={inputCSS} type="text" bind:value={newShortName} required name="shortname" id="shortname" placeholder={shortname}>
            </div>
            <div>
                <button type="submit"  class={cssbtn}>Save Course Name</button>
            </div>
        </form>
</div>