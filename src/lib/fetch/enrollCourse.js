export const enrollCourse = async (token, courseid,userType)=>{
    try {
        const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=enrol_self_enrol_user&courseid="+courseid

        const response = await fetch(fetchURL,
            {
                method: 'GET',
            })
        const enrollCourse = await response.json();
        console.log("Got Enrolled Courses ", enrollCourse)
        
        if(enrollCourse.status){
            window.location.href = '/'+userType+'/dashboard';
        }
        // return enrollCourse.status;  // Ruturns True or False
    } catch (error) {
        console.error(error.message)
    }
}