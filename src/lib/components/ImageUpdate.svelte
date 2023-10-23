<script>
  import grapesjs from 'grapesjs';

    export let courseimage,shortname,cssbtn


    import { fileManager } from 'grapesjs-plugin-file';
  
    // export let imageurl;
  
    let imageEditor;
    let uploadedImage = null;
    async function load() {
        
    //   imageEditor =  grapesjs.init({
    //     container: '#image-uploader',
    //     components: ['image'],
    //     plugins: ['grapesjs-plugin-file'],
    //     data: {
    //       components: [
    //         {
    //           type: 'image',
    //           src: courseimage,
    //         },
    //       ],
    //     },
    //     storageManager: {
    //     // Configure where the images will be stored
    //     autosave: false, // Disable autosave for now
    //     autoload: false, // Disable autoload for now
    //         stepsBeforeSave: 1,
    //     },
    //     layerManager: {
    //         // Enable layers, required for image uploads
    //         appendTo: '.gjs-pn-commands',
    //     },
    //   });
  
    //   imageEditor.on('component:dragEnter', async (event) => {
    //     const file = event.data.files[0];
    //     if (!file) {
    //       return;
    //     }
  
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     console.log("Drag Enter data = ", formData)

    //     // const response = await fetch('/api/upload-image', {
    //     //   method: 'POST',
    //     //   body: formData,
    //     // });
  
    //     // const imageData = await response.json();
  
    //     imageEditor.updateComponent({
    //       type: 'image',
    //       src: courseimage,
    //     });
    //   });
  
    //   imageEditor.on('component:drop', async (event) => {
    //     const file = event.data.files[0];
    //     if (!file) {
    //       return;
    //     }
  
    //     const formData = new FormData();
    //     formData.append('file', file);
        
    //     console.log("Image Drop Data - ", formData)
    //     // const response = await fetch('/api/upload-image', {
    //     //   method: 'POST',
    //     //   body: formData,
    //     // });
  
    //     // const imageData = await response.json();
  
    //     imageEditor.updateComponent({
    //       type: 'image',
    //       src: courseimage, // New Image URL from Server
    //     });
    //   });
    }
  
//     function showImage() {
//     if (!this.file) {
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       uploadedImage = reader.result;
//       imageEditor.runCommand('add-image', {
//         // Add the uploaded image to the editor
//         src: uploadedImage,
//       });
//     };

//     reader.readAsDataURL(file);
//   }

//   async function saveImage() {
//     if (!this.file) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.file);
//     console.log("Image Saved Button Clicked  - ",formData)
//     // const response = await fetch('/api/upload-image', {
//     //   method: 'POST',
//     //   body: formData,
//     // });

//     // const imageData = await response.json();

//     // imageEditor.updateComponent({
//     //   type: 'image',
//     //   src: imageData.url,
//     // });
//   }
</script>

<div class=" flex ">
    <div class="w-[40%]">
        <h2>Previous Image:</h2>
        <img src={courseimage} alt={shortname} class="rounded">
    </div>
    
    <div class="w-[45%] p-5 flex flex-col gap-5">
        <h2>Choose New Image:</h2>
        <div id="image-uploader"></div>
        <input type="file" id="image-input"  class="bg-slate-200 p-5 rounded "/>
        <button class={cssbtn} >Save Image</button>
    </div>
</div>
  
  