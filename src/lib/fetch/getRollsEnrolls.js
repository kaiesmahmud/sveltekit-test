export const getRolesEnrolls = async (token,id,fetch)=>{
    try {
        if(token && id){
            let fetchRolesEnrolls = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_user_get_course_user_profiles&userlist[0][userid]="+id+"&userlist[0][courseid]=1"
            
            const rolesEnrollsResponse = await fetch(fetchRolesEnrolls,
                {
                    method: 'GET',
                })
            const rolesEnrolls = await rolesEnrollsResponse.json();
    
            console.log("core_user_get_course_user_profiles - ",rolesEnrolls[0])
            
            //Return Users Info including user roles & enrolledCourses !
            return { roles:rolesEnrolls[0].roles || [] , enrolledcourses: rolesEnrolls[0]?.enrolledcourses || []}
        }
    } catch (error) {
        console.log(error)
    }


}