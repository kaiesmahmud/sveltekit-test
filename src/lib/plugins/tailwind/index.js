import grapesjs from "grapesjs";
export default grapesjs.plugins.add("tailwindcss", (editor , opts) => {
    let options = {}
    for ( name in opts ){
        if(!(name in options)){
            options[name] = opts[name]
        }
    }
})

// Working on .. 