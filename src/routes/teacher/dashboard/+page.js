import { redirect } from '@sveltejs/kit';

export const ssr = false 

export const load = async({parent}) => {
    const {user} = await parent();
    console.log("User data in Dashboard is ", user)
    if(!user){
        throw redirect(302,"/")  // If the user is student, then redirect to student dashboard
    }
    
}