import { redirect } from '@sveltejs/kit';
import { getAllEnrollCourses } from '$lib/fetch/getAllEnrollCourses.js';

// export const ssr = false 
export const csr = true 

export const load = async({parent,fetch}) => {
    const {user,enrolledCourses} = await parent();

    if(user?.token){
        console.log("Welcome to Dashboard ")
//=========== Fetch Enrolled Courses by Users that will be shown to Dashboard ==============
        if(enrolledCourses || !enrolledCourses){
            const enrolledCourses = await getAllEnrollCourses(user.token, user.id,fetch)
            return {
                enrolledCourses
            }
        }
    }
    if(!user){
        throw redirect(302,"/")   // If the user data not found then redirect to homepage
    }
    
}