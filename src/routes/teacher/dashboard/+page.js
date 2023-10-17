import { redirect } from '@sveltejs/kit';

export const ssr = false 

export const load = async({parent}) => {
    const {user} = await parent();
    if(!user){
        throw redirect(302,"/")  // If the user is student, then redirect to student dashboard
    }
    
}