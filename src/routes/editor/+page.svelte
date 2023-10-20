<script>
    import { onMount } from 'svelte';
    import 'grapesjs/dist/css/grapes.min.css';
    import grapesjs from 'grapesjs';
    let editor;
    onMount(() => {
        editor = grapesjs.init({container: '#grapesjs-container',});
               editor.Panels.addPanel({
           id: 'panel-top',
           el: '.panel__top',
           });
           editor.Panels.addPanel({
           id: 'basic-actions',
           el: '.panel__basic-actions',
           buttons: [
               {
               id: 'visibility',
               active: true, // active by default
               className: 'btn-toggle-borders',
               label: '<u>B</u>',
               command: 'sw-visibility', // Built-in command
               }, {
               id: 'export',
               className: 'btn-open-export',
               label: 'Exp',
               command: 'export-template',
               context: 'export-template', // For grouping context of buttons from the same panel
               }, {
               id: 'show-json',
               className: 'btn-show-json',
               label: 'JSON',
               context: 'show-json',
               command(editor) {
                   editor.Modal.setTitle('Components JSON')
                   .setContent(`<textarea style="width:100%; height: 250px;">
                       ${JSON.stringify(editor.getComponents())}
                   </textarea>`)
                   .open();
               },
               }
           ],
           });

    })
</script>

<div id="grapesjs-container">
    <div class="panel__top">
        <div class="panel__basic-actions"></div>
    </div>
    <div id="gjs">
    ... <h1>Hello</h1>
    </div>
    <div id="blocks"></div>
</div>

<style>
    .panel__top {
        padding: 0;
        width: 100%;
        display: flex;
        position: initial;
        justify-content: center;
        justify-content: space-between;
    }
    .panel__basic-actions {
        position: initial;
    }
</style>