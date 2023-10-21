
export const getAllCourses = async(token) =>{
    try {
        const fetchURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_course_get_courses"
        const response = await fetch(fetchURL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const allCourses = await response.json();
        
        //Filtering and Removing extra Formats of data
        const coursesWithOutImg = allCourses.filter(c=> c.format == "topics")

        return coursesWithOutImg ; // Returns an Array of Objects containing Courses

    } catch (error) {
        console.error("Error on getAllCourses .js file",error.message)
    }
}