import { redirect } from '@sveltejs/kit'
import { getAllEnrollCourses } from '../../../../lib/fetch/getAllEnrollCourses.js'
import { getEnrolledCourseDetail } from '../../../../lib/fetch/getEnrolledCourseDetails.js'

export const csr = true 

export const load = async (events) => {
    // console.log(events)
    const {params,parent,fetch} = events
    // console.log("path is ", params.courseid)
    const courseid = params.courseid
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
    
    return {
        enrolledCourses:NewEnrolledCourses,
        viewCourseDetails
        }
    }
}