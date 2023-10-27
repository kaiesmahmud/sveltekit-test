<script>
	import { getImageUrl } from './../fetch/getImageUrl.js';
    export let courseimage,shortname,cssbtn ,token
    let imageData,newImageURL,draft;


    async function handleImageUpload() {
    const input = document.getElementById('image-input');
    const file = input.files[0];

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

        if(imageData){
          draft = await getImageUrl(token)
          console.log("New Image URL fOUND",newImageURL)

          //If the Draft found then -> 
          const {contextid, filearea, itemid, component,userid} = draft
            //IF Response Get then -- 
            if(itemid & contextid){
                //If Itemid and contextid found then
                console.log("Itemid and contextid found!! ")
                let record = {
                    contextid:contextid,
                    itemid:itemid,
                    component:component || 'user',
                    filearea:filearea ||'draft',
                    filepath: '/',
                    // filepath: '/'+contextid+'/course/overviewfiles/',
                    filename: fileName,
                    filecontent:imageData,
                }
                // console.log("The record is - ", record )
                
                const formData = new FormData();

                formData.append('contextid', record.contextid)
                formData.append('component', record.component)
                formData.append('filearea', record.filearea)
                formData.append('itemid', record.itemid)
                formData.append('filepath', record.filepath)
                formData.append('filename', record.filename)
                formData.append('filecontent', record.filecontent)

                // Log the FormData entries
                // formData.forEach((value, key) => {
                //     console.log(key, value);
                // });
                // =========  POST request ==== core_files_upload ============
                const files_upload_response = await fetch("http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_files_upload", {
                    method: 'POST',
                    body: formData,
                });
                const uploadURL = await files_upload_response.json()
                // console.log("image Upload Response ",files_upload_response)
                console.log("core_files_upload Response ",uploadURL)

                //======== core_files_get_files ===============
                if(uploadURL){
                  const {contextid,component,filearea, itemid,filepath,filename} = uploadURL;

                  const fileGetURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_files_get_files&contextid="+contextid+"&component="+component+"&filearea="+filearea+"&itemid="+itemid+"&filename="+filename+"&filepath="+uploadURL.url

                  try {
                    const fileGetResponse = await fetch(fileGetURL,{method:"GET"})
                    const fileGetResult  = await fileGetResponse.json()
  
                    console.log(" ore_files_get_files", fileGetResult)
                    
                  } catch (error) {
                    console.log(error)
                  }


                }

                newImageURL = uploadURL.url
                
    
            }
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
    </div>
    
    <div class="w-[45%] p-5 flex flex-col gap-5">
        <h2>Choose New Image:</h2>
        <div id="image-uploader"></div>
        <input type="file" id="image-input"  class="bg-slate-200 p-5 rounded "/>
        <button on:click={handleImageUpload} class={cssbtn} >Save Image</button>
    </div>
</div>
  
  