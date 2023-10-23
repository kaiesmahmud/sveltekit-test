import { redirect } from '@sveltejs/kit'
import { getAllEnrollCourses } from '$lib/fetch/getAllEnrollCourses.js'
import { getEnrolledCourseDetail } from '$lib/fetch/getEnrolledCourseDetails.js'
// import grapesjs, { Editor } from 'grapesjs'
// import { fileManager } from 'grapesjs-plugin-file';


export const csr = true 
export const ssr = false 

export const load = async (events) => {
    console.log(events)
    const {params,parent,fetch} = events
    // console.log("pageContext is ", pageContext)
    const courseid = params.courseid
    // console.log("Course id is - ",courseid)
    
    const {user } = await parent()
    if(user?.token){
    //Fetch Enrolled Courses by Users ==============
        const NewEnrolledCourses = await getAllEnrollCourses(user.token, user.id,fetch)
        
    if(!NewEnrolledCourses){
        console.log("No Course Enrolled but tried to access")
        const path = "/"+user.userType+"/dashboard"
        throw redirect(301, path)
    }
    // console.log(NewEnrolledCourses)

    const selectedCourse = NewEnrolledCourses.find(c => c.id == courseid)
    // console.log("selectedCourse - ",selectedCourse)

    const courseSectionDetails = await getEnrolledCourseDetail(user?.token,courseid,fetch)
    const viewCourseDetails = {...selectedCourse,courseSectionDetails}

    // console.log("Getting the Full Course  Details - ",viewCourseDetails)

    // =======Grapes js==========
    // const imageEditor = grapesjs.init({
    //     container: '#image-editor',
    //     components: ['image'],
    //     plugins: [ fileManager ],
    //     data: {
    //       components: [
    //         {
    //           type: 'image',
    //           src: viewCourseDetails.courseimage,
    //         },
    //       ],
    //     },
    //   });
    
  
    return {
        enrolledCourses:NewEnrolledCourses,
        viewCourseDetails,
        // imageEditor
        }
    }
}