export const getImageUrl = async (token ) => {
    // console.log("Function got token - ",token)
    // console.log("Function got filename - ",filename)
    // console.log("Function got filecontent - ",filecontent.slice(0,20))

    let imgURL ;

    if(token ){
        //if Token found then 
        // use core_files_get_unused_draft_itemid  to get the contextid, itemid,filearea, component
        const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_files_get_unused_draft_itemid"

        const draftResponse = await fetch(fetchURL,{method:'GET'})

        // Check if the request was successful
        if (draftResponse.status === 200) {
            console.log("REsponse status = 200 ")
            const getDraftWithItemId = await draftResponse.json()
            console.log("GetDraft Obj - ", getDraftWithItemId)   
            return getDraftWithItemId ;
            
            // const {contextid, filearea, itemid, component,userid} = getDraftWithItemId
            // //IF Response Get then -- 
            // if(itemid & contextid){
            //     //If Itemid and contextid found then
            //     console.log("Itemid and contextid found!! ")
            //     let record = {
            //         contextid:contextid,
            //         itemid:itemid,
            //         component:component || 'user',
            //         filearea:filearea ||'draft',
            //         filepath: 'moodle/pluginfile.php/33/course/overviewfiles/',
            //         filename: filename,
            //         filecontent:filecontent,
            //     }
            //     // console.log("The record is - ", record )
                
            //     const formData = new FormData();

            //     formData.append('contextid', record.contextid)
            //     formData.append('component', record.component)
            //     formData.append('filearea', record.filearea)
            //     formData.append('itemid', record.itemid)
            //     formData.append('filepath', record.filepath)
            //     formData.append('filename', record.filename)
            //     formData.append('filecontent', record.filecontent)

            //     // Log the FormData entries
            //     // formData.forEach((value, key) => {
            //     //     console.log(key, value);
            //     // });
            //     // Make  POST request to the Moodle web service API
            //     const files_upload_response = await fetch("https://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_files_upload", {
            //         method: 'POST',
            //         body: formData,
            //     });
            //     const uploadURL = await files_upload_response.json()
            //     console.log("image Upload Response ",files_upload_response)
            //     console.log("image Upload Response ",uploadURL)
            //     // // Check if the request was successful
            //     // if (response.status === 200) {
            //     //     console.log("POst success ")
            //     //     // The image has been uploaded successfully.
            //     //     const fileData  =  response.json();

            //     //     console.log("Got the file upload Data - ",fileData)
            //     //     const {contextid,component,filearea,itemid,filepath,filename,url} = fileData
            //     //     imgURL = url ;
            //     // } else {
            //     //     // An error occurred while uploading the image.
            //     //     throw new Error('Failed to upload image: ' + response.statusText);
            //     // }
    
            // }
        }else {
            // An error occurred while uploading the image.
            throw new Error('Failed to GEt ITEMID for image: ' + getItemIdResponse.statusText);
        }
        
        
    }
    return imgURL ||filecontent ;
}

// export const uploadImage = async (base64Image, courseId) => {}