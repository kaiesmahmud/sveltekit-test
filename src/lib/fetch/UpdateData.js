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