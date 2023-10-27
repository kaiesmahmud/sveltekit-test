<script>
  import SummaryEditor from "./SummaryEditor.svelte";

    export let summary,cssbtn,courseid,token,shortname,fullname

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
            
            <SummaryEditor summary={summary} cssbtn={cssbtn} token={token} courseid={courseid} shortname={shortname} fullname={fullname}/>
            
        {/if}
    </div>
    
