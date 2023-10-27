<script>
    import '../../assets/grapes.min.css';
    import grapesjs from 'grapesjs';
    import { onMount } from 'svelte';
    import { updateSummary } from '../fetch/UpdateData';
    export let cssbtn,summary,token, courseid,shortname,fullname 
    console.log("token in SummaryEditor Component - ",token)
    // console.log("token in SummaryEditor Component - ",token, " no comma - ", token.replace(",,",""))

    let editor;
    let updatedHtml = summary; // Store the edited HTML
    
    // Initialize GrapesJS editor
    onMount(() => {
      editor = grapesjs.init({
        container: '#html-editor',
        css: '../../assets/grapes.min.css',
        components: ['image', 'text', 'text-italic', 'text-bold', 'paragraph','cell','div'],
        // plugins: ['gjs-plugin-file'],  // Before
        plugins: [], //After
        // storageManager: { autosave: false, autoload: false },
        storageManager: false,
        blockManager: {
          blocks: [
            // Basic Section
            {
              id: 'one-column',
              label: '1 Column',
              category: 'Basic',
              attributes: { class: 'fa fa-columns' },
              content: '<div class="one-column">Your one column content here</div>',
            },
            {
              id: 'two-column',
              label: '2 Column',
              category: 'Basic',
              type: 'cell',
              attributes: { class: 'fa fa-columns' },
              content: '<div class="gjs-row"><div class="gjs-cell"></div><div class="gjs-cell"></div></div>',
            },
            {
              id: 'three-column',
              label: '3 Column',
              category: 'Basic',
              attributes: { class: 'fa fa-columns' },
              content: '<div class="three-column">Your three column content here</div>',
            },
            {
              id: 'add-text',
              label: 'Add Text',
              category: 'Basic',
              attributes: { class: 'fa fa-font' },
              content: '<div class="add-text">Add your text here</div>',
            },
            {
              id: 'add-image',
              label: 'Add Image',
              category: 'Basic',
              attributes: { class: 'fa fa-image' },
              // content: '<img src="path/to/your/image.jpg" alt="Image">',
              // Select the component once it's dropped
              select: true,
              // You can pass components as a JSON instead of a simple HTML string,
              // in this case we also use a defined component type `image`
              content: { type: 'image' },
              // This triggers `active` event on dropped components and the `image`
              // reacts by opening the AssetManager
              activate: true,
            },
            {
              id: 'add-link',
              label: 'Add Link',
              category: 'Basic',
              attributes: { class: 'fa fa-link' },
              content: '<a href="#">Your link text</a>',
            },
            {
              id: 'add-quote',
              label: 'Add Quote',
              category: 'Basic',
              attributes: { class: 'fa fa-quote-left' },
              content: '<blockquote>Your quote here</blockquote>',
            },

            // Frame Section
            {
              id: 'header',
              label: 'Header',
              category: 'Frame',
              attributes: { class: 'fa fa-header' },
              content: '<div class="header">Your header content here</div>',
            },
            {
              id: 'footer',
              label: 'Footer',
              category: 'Frame',
              attributes: { class: 'fa fa-footer' },
              content: '<div class="footer">Your footer content here</div>',
            },
            {
              id: 'hero-section',
              label: 'Hero Section',
              category: 'Frame',
              attributes: { class: 'fa fa-star' },
              content: '<div class="hero-section">Your hero section content here</div>',
            },
          ],
        },
      });
      
      // Set the initial HTML content
      editor.setComponents(summary);
      

      // Listen for component changes
      editor.on('component:update', () => {
        updatedHtml = editor.getHtml();
        // console.log(updatedHtml)
      });

      editor.on('component:update:src', (component) => {
        // console.log("Update Component!! ") 

        // Check if the component type is image
        if (component.get('type') === 'image') {
          // Get the image src
          const imageSrc = component.get('src');
          console.log("image SRC- ", imageSrc)
          component.set('src', "http://localhost/moodle/pluginfile.php/33/course/overviewfiles/programming-laptop.jpg")
          // Do something with the image src
          const imageSrc2 = component.get('src');
          console.log("image SRC- ", imageSrc2)
        }
      });

      
    });//onMout()
  
    // Function to update HTML with edited content
    async function  updateHtml() {
      updatedHtml = editor.getHtml();
      let removeBody = updatedHtml.replace('<body>',"").replace("</body>","")
      console.log("Updated Html",removeBody)
      if(removeBody){
        await updateSummary(token, courseid,removeBody,shortname,fullname)
      }

    }
    



  </script>
  
  <div class="html-editor ">
    <div id="html-editor" class="max-h-[80vh]"></div>
    <button on:click={updateHtml} class={`${cssbtn} inline-block mt-10`}>Update Course</button>
  </div>

<style>
 
.one-column{
    min-height: 5rem;
}
.two-column{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-height: 5rem;
    
}
.gjs-row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    padding: 10px;
}
.gjs-row.gjs-cell {
  min-height: 5rem;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
}

</style>