<script>
  import HtmlEditor from "./HtmlEditor.svelte";

    export let summary,cssbtn
    let open = false ;

    let handleOpen = ()=>  {
        open = !open
    }
</script>

    <div class="bg-white p-5 rounded shadow-2xl mt-10 flex flex-col gap-10">
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
            <!-- <div contenteditable="false" bind:innerHTML={summary} class="p-3  ">
            </div> -->
            <HtmlEditor summary={summary} cssbtn={cssbtn}/>
        {/if}
    </div>
    
