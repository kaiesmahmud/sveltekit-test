<script>
    import grapesjs from 'grapesjs';
    import { onMount, afterUpdate } from 'svelte';
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
    });
  
    // Function to update HTML with edited content
    function updateHtml() {
      updatedHtml = editor.getHtml();
      console.log("Updated Html",updatedHtml)
    }
    function addTextBlock() {
    const textBlock = editor.BlockManager.get('text');
    if (textBlock) {
      editor.runCommand('add-block', {
        block: textBlock,
      });
    }
  }

  // Function to add an image block
  function addImageBlock() {
    const imageBlock = editor.BlockManager.get('image');
    if (imageBlock) {
      editor.runCommand('add-block', {
        block: imageBlock,
      });
    }
  }

  // Function to add a title block
  function addTitleBlock() {
    const titleBlock = editor.BlockManager.get('text');
    if (titleBlock) {
      // Customize the title block as needed
      titleBlock.set('content', '<h2>Your Title Here</h2>');
      editor.runCommand('add-block', {
        block: titleBlock,
      });
    }
  }
  </script>
  
  <div class="html-editor ">
    <div id="html-editor" class="max-h-[50vh]"></div>
    <div id="blocks" class=" "></div>
    <button on:click={updateHtml} class={`${cssbtn} inline-block mt-10`}>Update Course</button>
  </div>
