import { getImageUrl } from "./getImageUrl"
// import {fs} from "fs"

export const planA = async (token,author,fileName,imageData,id) => {
    let draft 
    // Decode the base64 data
    // const decodedImageData = atob(imageData);

    // Create a new Blob from the decoded data
    // const blob = new Blob([decodedImageData]);

    
    // use core_files_get_unused_draft_itemid  to get the contextid, itemid,filearea, component
    const draftFetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_files_get_unused_draft_itemid"
    
    const draftResponse = await fetch(draftFetchURL,{method:'GET'})
    
    // Check if the request was successful
    if (draftResponse.status === 200) {
    draft = await draftResponse.json()
    console.log("core_files_get_unused_draft_itemid - ", draft)   
    }
    
    const {contextid, filearea, itemid, component,userid} = draft
    const baseURL = contextid+ "/"+component+"/"+filearea
    //Upload Image File  =========================
    // Need =>> token,id,imageData ====================

    const uploadFormData = new FormData();
    uploadFormData.append('context', contextid);
    // uploadFormData.append('component', component);
    // uploadFormData.append('contextid', contextid);
    // uploadFormData.append('userid', userid);
    // uploadFormData.append('filearea', filearea);
    // uploadFormData.append('filename', fileName);
    // uploadFormData.append('filepath', '/');
    // uploadFormData.append('itemid', itemid);
    // uploadFormData.append('license', "");
    // uploadFormData.append('author', author);
    // --- file type experimented
    // uploadFormData.append('filecontent', imageData);
    // uploadFormData.append('file', {imageData, fileName});
    uploadFormData.append('file', imageData);
    // uploadFormData.append('source', imageData);

    try {
    const uploadimageURL = "http://localhost/moodle/webservice/upload.php?token="+token
    const response = await fetch(uploadimageURL, {
        method: 'POST',
        body: uploadFormData,
        });
        console.log("Got upload.php response - ", response)
        console.log("Got upload.php result - ", await response.json())
        
    } catch (error) {
        console.log("Found Upload Image Error - ", error.message, error)
    }
    
    try {
        const pluginResponse = await fetch(`http://localhost/moodle/webservice/pluginfile.php?token=${token}`);
        // &fileid=${id}
        console.log("Got pluginfile.php response - ", pluginResponse)
        console.log("Got pluginfile.php result - ", await pluginResponse.json())
    // if (!response.ok) {
    //   throw new Error('Failed to get public URL');
    // }
    } catch (error) {
    console.log("get pluginfile.php - error ", error.message, error)
    }

}
export const planB = async (token,author,fileName,imageData) => {
    const draft = await getImageUrl(token)

      //If the Draft found then -> 
      const {contextid, filearea, itemid, component,userid} = draft
        //IF Response Get then -- 
        if(itemid & contextid){
            //If Itemid and contextid found then
            let record = {
                contextid:contextid,
                itemid:itemid,
                component:component || 'user',
                filearea:filearea ||'draft',
                filepath: '/',
                filename: fileName,
                // filecontent:imageData,
                filecontent:imageData,
            }
            
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
            
            console.log("core_files_upload Response ",uploadURL)

            //======== core_files_get_files ===============
            // Use For searching File --- 
            if(uploadURL){
                const {contextid,component,filearea, itemid,filepath,filename,url} = uploadURL;

                
                





              //   const fileGetURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_files_get_files&contextid="+contextid+"&component="+course+"&filearea="+filearea+"&itemid="+itemid+"&filename="+filename+"&filepath="+filepath
              
            //   try {
            //     const fileGetResponse = await fetch(fileGetURL,{method:"GET"})
            //     const fileGetResult  = await fileGetResponse.json()

            //     console.log(" core_files_get_files", fileGetResult)
                
            //   } catch (error) {
            //     console.log(error)
            //   }


            }

            
          }
}

export const planC = async (token,author,fileName, imageData,id) => {
    const draft = await getImageUrl(token)

      //If the Draft found then -> 
      const {contextid, filearea, itemid, component,userid} = draft

    // Create a Blob from the base64 data
    const contentType = imageData.split(';')[0].split(':')[1];
    const byteCharacters = atob(imageData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    console.log(byteArray)
    const blob = new Blob([byteArray], { type: contentType });

    // Create a FormData object and append the blob as 'file'
    const formData = new FormData();
    formData.append('file', blob,fileName);
    // formData.append('courseId', id);

    // Construct the URL for the upload endpoint
    const uploadUrl = `http://localhost/moodle/webservice/upload.php?token=${token}&filearea=${filearea}&itemid=${itemid}&contextid=${contextid}&component=${component}`;
    // Make the POST request to upload the file
    const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        })
    const uploadResult = await uploadResponse.json()
    console.log(" Upload Response - ", uploadResult)
    // Construct the public URL for the uploaded image
    if(uploadResult){
        const publicImageUrl = `http://localhost/moodle/pluginfile.php/${uploadResult[0].contextid}/user/draft/${uploadResult[0].itemid}/${uploadResult[0].filename}`;
        console.log("public url - ", publicImageUrl)
        return publicImageUrl
    }
}