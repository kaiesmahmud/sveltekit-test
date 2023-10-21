export const getAllEnrollCourses = async (token,userid,fetch)=> {
    try {
        const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&userid="+userid

        const response = await fetch(fetchURL,
            {
                method: 'GET',
            })
        const allEnrolledCourses = await response.json();
        // console.log("Got Enrolled Courses ", allEnrolledCourses)

        return allEnrolledCourses;
    } catch (error) {
        console.error(error.message)
    }
}