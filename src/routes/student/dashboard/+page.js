import { redirect } from '@sveltejs/kit';
import { getAllEnrollCourses } from '../../../lib/fetch/getAllEnrollCourses.js';

export const ssr = false 

export const load = async({parent,fetch}) => {
    const {user} = await parent();

    if(user?.token){
//=========== Fetch Enrolled Courses by Users that will be shown to Dashboard ==============
        const enrolledCourses = await getAllEnrollCourses(user.token, user.id,fetch)
        return {
            enrolledCourses
        }
    }
    if(!user){
        throw redirect(302,"/")  // If the user is student, then redirect to student dashboard
    }
    
}