export const getEnrolledCourseDetail = async (token,courseid,fetch) => {
    try {
        if(token,courseid){
            const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid="+courseid
            const response = await fetch(fetchURL,
                {
                    method: 'GET',
                })
            const courseSectionDetails = await response.json();
            console.log("core_course_get_contents - ",courseSectionDetails)
            
            return courseSectionDetails
        }
    } catch (error) {
        console.error(error.message)
    }
}