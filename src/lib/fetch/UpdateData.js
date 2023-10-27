export const updateCourseName = async (token,courseid,newfullname,newshortname) => {
    const URL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_course_update_courses&courses[0][id]="+courseid+"&courses[0][fullname]="+newfullname+"&courses[0][shortname]="+newshortname
    try {
        const response = await fetch(URL,
            {
                method: 'GET',
            })
        const updated = await response.json();  
        console.log(updated)
    
        if(updated){
            window.location.href = '/teacher/dashboard' ;
        }
        
    } catch (error) {
        console.error("Error on Updating Fullname and Short name - ",error)
    }
}

export const updateSummary = async (token, courseId, summary,shortname,fullname)=> {
    const params = {
        courses: [{
          id: courseId,
          shortname:shortname,
          fullname:fullname,
          summary: summary,
        }],
      };
    const paramsForm = new FormData();
    paramsForm.append("courses[0][id]",courseId)
    paramsForm.append("courses[0][shortname]",shortname)
    paramsForm.append("courses[0][fullname]",fullname)
    paramsForm.append("courses[0][summary]",summary)
    if(summary){
        console.log("params - ",JSON.stringify(params))
        const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&&wsfunction=core_course_update_courses"
          try {
                const UpdateSummaryResponse = await fetch(fetchURL, { 
                    method: 'POST',
                      body: paramsForm,
                    //   body: JSON.stringify(params),
                    });
                  
                console.log("this is the response - ", UpdateSummaryResponse)
                const result = await UpdateSummaryResponse.json()
                console.log("The Result is ",result)
                 
                if(result){
                    window.location.href = '/teacher/dashboard' ;
                }
                
            } catch (error) {
                console.error("Found Error",error)
            }
    }

}