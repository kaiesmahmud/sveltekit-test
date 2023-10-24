<script>
    import grapesjs from 'grapesjs';
    import { onMount } from 'svelte';
    export let cssbtn,summary
    let editor;
    let updatedHtml = summary; // Store the edited HTML
    
    // Initialize GrapesJS editor
    onMount(() => {
      editor = grapesjs.init({
        container: '#html-editor',
        components: ['image', 'text', 'text-italic', 'text-bold', 'paragraph'],
        // plugins: ['gjs-plugin-file'],  // Before
        plugins: [], //After
        // storageManager: { autosave: false, autoload: false },
        storageManager: false,
        blockManager: {
            appendTo: '#blocks',
            blocks: [
            {
                id: 'section', // id is mandatory
                label: '<div class="text-2xl">Add Section</div>', // You can use HTML/SVG inside labels
                attributes: { class:'gjs-block-section' },
                content: `<section>
                <h1>This is a simple title</h1>
                <h1>This is a simple title</h1>
                <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                </section>`,
            }, {
                id: 'text',
                label: '<div class="text-2xl">Add Text</div>',
                content: '<div data-gjs-type="text">Insert your text here</div>',
            }, {
                id: 'image',
                label: '<div class="text-2xl">Add Image</div>',
                // Select the component once it's dropped
                select: true,
                // You can pass components as a JSON instead of a simple HTML string,
                // in this case we also use a defined component type `image`
                content: { type: 'image' },
                // This triggers `active` event on dropped components and the `image`
                // reacts by opening the AssetManager
                activate: true,
            }
            ]
        },
      });
  
      // Set the initial HTML content
      editor.setComponents(summary);
  
      // Listen for component changes
      editor.on('component:update', () => {
        updatedHtml = editor.getHtml();
        // console.log(updatedHtml)
      });

      editor.on('block:activate', block => {
        if (block.id === 'image') {
          const image = block.querySelector('img');
          const imageData = getImageData(image);
          console.log("Image Data is ", imageData)
          // Upload the image data to the server here
        }
      });



    });//onMout()
  
    // Function to update HTML with edited content
    function updateHtml() {
      updatedHtml = editor.getHtml();
      let removeBody = updatedHtml.replace('<body>',"").replace("</body>","")
      console.log("Updated Html",removeBody)
    }
    function getImageData(image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      return canvas.toDataURL();
    }



  </script>
  
  <div class="html-editor ">
    <div id="html-editor" class="max-h-[80vh]"></div>
    <div id="blocks" class=" "></div>
    <button on:click={updateHtml} class={`${cssbtn} inline-block mt-10`}>Update Course</button>
  </div>
