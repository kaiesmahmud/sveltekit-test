<script>
    export let summary
    let cssbtn = "px-5 py-3 font-semibold text-xl bg-slate-800 text-white/80 hover:text-white hover:bg-slate-700 rounded transition-all ease-in duration-150"
    let open = false ;

    let handleOpen = ()=>  {
        open = !open
    }
</script>

{#if summary}
    <div class="bg-white p-5 rounded shadow-2xl mt-10">
        <div class="flex justify-between items-center ">
            <h2 class="font-bold text-3xl text-black">
                Summary 
            </h2>
            {#if open}
                <button on:click={handleOpen} class={cssbtn}>Close Module</button>
            {/if}
            {#if !open}
                <button on:click={handleOpen} class={cssbtn}>Open Module</button>
            {/if}
        </div>
        {#if open}
            <div contenteditable="false" bind:innerHTML={summary} class="p-3  ">
            </div>
            
        {/if}
    </div>
    
{/if}