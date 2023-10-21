export const addCourseImg = async (token,courseid,fetch)=> {
    // console.log(token, "  courseid - ",courseid)
    try {
        const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=id&value="+courseid

        const response = await fetch(fetchURL,
            {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            })
        const courseWithImgURL = await response.json();
        
        // console.log("addCourseImg Working !")
        return  courseWithImgURL.courses[0].courseimage ;  // Return type String

    } catch (error) {
        console.error("Error found on addCourseImg . js file", error.message)
    }
}