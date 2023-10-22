import { redirect } from '@sveltejs/kit';

export const ssr = false 

export const load = async(event) => {
    const {parent} = event;
    const {user} = await parent();
    
    console.log("Students user info",user)

    if(user?.userType == "student"){
        
        throw redirect(302,"/student/dashboard")  // If the user is student, then redirect to student dashboard
    }
    if(user?.userType == "teacher"){
        throw redirect(300,"/teacher/dashboard") // If the user is Teacher, then redirect to teacher dashboard
    }
}