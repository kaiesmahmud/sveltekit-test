<script>
	import { planA, planB, planC } from './../fetch/experimentImageUploads.js';
	// import { planC } from './../fetch/experimentImageUploads.js';
	import { getImageUrl } from './../fetch/getImageUrl.js';
    export let courseimage,shortname,cssbtn ,token, id,author
    let imageData,newImageURL,draftImg;


    async function handleImageUpload() {
    const input = document.getElementById('image-input');
    const file = input.files[0];
    const fullfile = input.files ;
    console.log("Full file - ",fullfile)

    if (file) {
      // Access the file data and handle it here
      const fileName = file.name ;
      console.log("Full DAta", file)

      // Create a FileReader
      const reader = new FileReader();
      
      // Define the onload event handler for the reader
      reader.onload = async(e) => {
        // Get the base64 data from the reader result
        imageData =  e.target.result;
        // console.log('Base64 image data:', imageData);
        // newImageURL = imageData

            newImageURL = imageData 


            if(imageData){
              // ---Plan - A 
              // ---Step - 1 : Create a new Draft -> core_files_get_unused_draft_itemid
              // ---Step - 2 : Create a form Data
              // ---Step - 3 : POST formData to upload.php url 
              // ---Step - 4 : GET img from pluginfile.php 
              // await planA(token,author,fileName, imageData,id)
              // ---planA - Issue -> upload.php doesn't return anything , it seems doesn't upload base-64 data
              //==================================================
              // ---Plan - B
              // ---Step - 1 : Create a new Draft -> core_files_get_unused_draft_itemid
              // ---Step - 2 : Create a record, then Create FormData
              // ---Step - 3 : core_files_upload
              // ---Step - 4 : core_files_get_files
              // ---Step - 5 : 
              await planB(token,author,fileName, imageData)
              // ---planB - get the draft link , but don't find any method to save the link !
              //===================================================
              // ---Plan - C 
              // ---Step - 1 : Create a new Draft -> core_files_get_unused_draft_itemid
              // ---Step - 2 : Create Formdata with blob file
              // ---Step - 3 : upload.php
              // ---Step - 4 : try to build url  with pluginfile.php but failed !
              // draftImg = await planC(token,author,fileName,imageData,id)
            }
      };
      // Read the file as data URL (base64)
      reader.readAsDataURL(file);
    }else{
      console.log('No file selected.');
    }
    
  }
</script>

<div class=" flex ">
    <div class="w-[40%]">
        <h2>Previous Image:</h2>
        <img src={courseimage} alt={shortname} class="rounded">
        {#if newImageURL}
            <img src={newImageURL} alt={shortname} class="rounded">
        {/if}
        {#if draftImg}
            <img src={draftImg} alt={shortname} class="rounded">
        {/if}
    </div>
    
    <div class="w-[45%] p-5 flex flex-col gap-5">
        <h2>Choose New Image:</h2>
        <div id="image-uploader"></div>
        <input type="file" id="image-input"  class="bg-slate-200 p-5 rounded "/>
        <button on:click={handleImageUpload} class={cssbtn} >Save Image</button>
    </div>
</div>
  
  