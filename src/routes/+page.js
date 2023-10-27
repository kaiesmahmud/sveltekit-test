// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

import { addCourseImg } from '$lib/fetch/addCourseImg.js';
import { getRolesEnrolls } from '$lib/fetch/getRollsEnrolls.js';

// export const prerender = 'auto';  
export const prerender = true;  
export const ssr = true


export const load = async({parent,fetch}) => {
    const {user,allCourses,courseImages} = await parent()

    //============ Fetch Images URL in Array ====================================================
    if(user?.token && !courseImages){
        const courseImages = []
    
        allCourses.map(async course => {
            const courseImage = await addCourseImg(user?.token, course.id,fetch);
            courseImages[course.id] = courseImage;
            // console.log(courseImages[course.id])
        })

        //=========== Fetching Again for User Roles and EnrollCourses Details Collection ==========
        let userInfoAll = await getRolesEnrolls(user.token, user.id,fetch)
        const Newuser = {...user, ...userInfoAll}


        return {
         courseImages,
         user:Newuser
        }
    }
}