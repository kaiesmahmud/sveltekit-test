<script>
    let open = false ;
    let handleOpen = ()=>  {
        open = !open
    }
    let cssbtn = "px-5 py-3 font-semibold text-xl bg-slate-800 text-white/80 hover:text-white hover:bg-slate-700 rounded transition-all ease-in duration-150"
    export let section
</script>

<div class="bg-white p-5 rounded shadow-2xl">
    <div class="flex justify-between items-center ">
        <h2 class="font-bold text-3xl text-black">
            {section.name}
        </h2>
        {#if open}
            <button on:click={handleOpen} class={cssbtn}>Close Module</button>
        {/if}
        {#if !open}
            <button on:click={handleOpen} class={cssbtn}>Open Module</button>
        {/if}
    </div>
    {#if open}
        <div class="flex flex-col gap-5 items-start my-5">
            {#each section.modules as module}
                <p class="px-3 py-1 bg-blue-100 inline-block rounded shadow-lg">Type: {module.modname} : {module.modplural}</p>
                <div class=" flex gap-5  items-center text-opacity-50">
                    <img src={module.modicon} alt={module.name} >
                    <p class="text-xl font-semibold text-black">{module.name}</p>
                </div>
                {#if module.summery}
                    <p>{module.summery}</p>
                {/if}
                {#if module.description}
                    <div contenteditable="false" bind:innerHTML={module.description} class="p-3 ">
                    </div>
                {/if}
                {#if module.url}
                    <a href={module.url} class={cssbtn}>Test Submission</a>
                {/if}
            {/each}
        </div>
    {/if}
</div>