<script>
    export let shortname,fullname,inputCSS,cssbtn
</script>

<div class=" bg-white flex flex-col items-start justify-between gap-5">
    <h2>Previous Course Name & Shortname :</h2>
    <div>
        <h1 class="text-start text-black">{fullname}</h1>
        <h2 class="py-2 px-5 bg-teal-800 text-white inline-block rounded-full">{shortname}</h2>
    </div>
    <div class="flex flex-col gap-5 w-full">
        <label for="fullname">Enter Full Course Name:</label>
        <input class={inputCSS} type="text" name="fullname" id="fullname" placeholder={fullname}>
        <label for="shortname">Enter Short Course Name:</label>
        <input class={inputCSS} type="text" name="shortname" id="shortname" placeholder={shortname}>
    </div>
    <button  class={cssbtn}>Save Course Name</button>
</div>