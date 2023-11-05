<script>
    import grapesjs from 'grapesjs';
    //Drag & Drop Components Basic HTML
	  import { draglist, footer, header, heroSection, heroSection2, phraseSection } from './../plugins/dragComponents.js';
    //Tailwind Custom Plugin
    import tailwindComponent from './../plugins/tailwind'
    //Plugins -- 
    import { gjsBlocksBasic, grapesjsPluginForms, grapesjsComponentCountdown, grapesjsPluginExport, grapesjsTabs, grapesjsCustomCode, grapesjsTouch, grapesjsParserPostcss, grapesjsTooltip, grapesjsTuiImageEditor, grapesjsTyped, grapesjsStyleBg, grapesjsPresetWebpage } from 'grapesjs-plugin-file';

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
        container: '#gjs',
        fromElement: true,
        showOffsets: true,
        components: ['image', 'text', 'text-italic', 'text-bold', 'paragraph','cell','div'],
        // plugins: ['gjs-plugin-file'],  // Before
        plugins: [
          tailwindComponent,
          gjsBlocksBasic,
          grapesjsPluginForms,
          grapesjsComponentCountdown,
          grapesjsPluginExport,
          grapesjsTabs,
          grapesjsCustomCode,
          grapesjsTouch,
          grapesjsParserPostcss,
          grapesjsTooltip,
          grapesjsTuiImageEditor,
          grapesjsTyped,
          grapesjsStyleBg,
          grapesjsPresetWebpage,
        ],
        pluginsOpts: {
          tailwindComponent : {},
          'gjs-blocks-basic': { flexGrid: true ,},
          'grapesjs-tui-image-editor': {
            script: [
              // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
              'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
            ],
            style: [
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
            ],
          },
          'grapesjs-tabs': {
            tabsBlock: { category: 'Extra' }
          },
          'grapesjs-typed': {
            block: {
              category: 'Extra',
              content: {
                type: 'typed',
                'type-speed': 40,
                strings: [
                  'Text row one',
                  'Text row two',
                  'Text row three',
                ],
              }
            }
          },
          'grapesjs-preset-webpage': {
            modalImportTitle: 'Import Template',
            modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
            modalImportContent: function(editor) {
              return editor.getHtml() + '<style> body{width:100%} '+editor.getCss()+'</style>'
            },
          },
        },
        // storageManager: { autosave: false, autoload: false },
        storageManager: false,
        canvas: {
          styles: [
            "../../app.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
          ],
          scripts: ["https://cdn.tailwindcss.com"]
        },
        blockManager: {
          blocks: [
            // Basic Section
            {
              id: 'one-column',
              label: '1 Column',
              category: 'Basic',
              attributes: { class: 'fa fa-regular fa-square ' },
              content: '<div class="one-column">Your one column content here</div>',
              style: {
                height: '100px' ,
                
              }
            },
            {
              id: 'two-column',
              label: '2 Column',
              category: 'Basic',
              type: 'cell',
              attributes: { class: 'fa fa-columns' ,
              height: '300px', display: 'flex'
            },
              content: '<div class="flex items-center justify-around w-full p-1 "><div class="block w-full h-[200px]"><p>first column</p></div><div class="block w-full h-[200px]"><p>Second column</p></div></div>',
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
              content: { 
                type: 'image' ,
                "attributes": {
                  "class": "w-full p-5 rounded-lg"
                }
            },
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
              content: '<blockquote class="center p-10 font-extralight italic">Your quote here</blockquote>',
            },

            // Frame Section
            {
              id: 'header',
              label: 'Header',
              category: 'Frame',
              attributes: { class: 'fa fa-header' },
              content: header,
            },
            {
              id: 'footer',
              label: 'Footer',
              category: 'Frame',
              attributes: { class: 'fa fa-fire' },
              content: footer,
            },
            {
              id: 'hero-section',
              label: 'Hero Section',
              category: 'Frame',
              attributes: { class: 'fa fa-star' },
              content: heroSection,
            },
            {
              id: 'hero-section-2',
              label: 'Hero Section-2',
              category: 'Frame',
              attributes: { class: 'fa fa-star' },
              content: heroSection2,
            },
            {
              id: 'phrase-section',
              label: 'Phrase Section',
              category: 'Frame',
              attributes: { class: 'fa fa-star' },
              content: phraseSection,
            },
            {
              id: 'list-section',
              label: 'List Section',
              category: 'Frame',
              attributes: { class: 'fa fa-list' },
              content: draglist,
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
    <div id="gjs" class="max-h-[80vh] "></div>
    <button on:click={updateHtml} class={`${cssbtn} inline-block mt-10`}>Update Course</button>
  </div>
<style>
 
.one-column{
    height: 5rem;
}
.two-column{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 5rem;
    
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