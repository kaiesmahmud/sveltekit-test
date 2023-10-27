import { redirect } from '@sveltejs/kit'
import { getAllEnrollCourses } from '$lib/fetch/getAllEnrollCourses.js';

// export const csr = true

export const load = async({cookies,parent,fetch}) => {

    const {user} = await parent();
    const userType = cookies.get("userType")
    const username = cookies.get("username")
    const password = cookies.get("pwd")
    const token = cookies.get("token")

    let userCookies = {
        userType:userType,
        username:username ,
        password:password ,
        token:token
    }
    // console.log("User Cookies got - ", userCookies)
    if(userCookies.token){
            const newEnrolledCourses = await getAllEnrollCourses(userCookies.token, user.id,fetch)
            return {
                enrolledCourses:newEnrolledCourses
            }
    }

    if(!user){
        throw redirect(302,"/")   // If the user data not found then redirect to homepage
    }

}
export const actions ={
  default: async (events)=>{
  
      const {cookies} = events
      cookies.delete('username',{path: '/'})   
      cookies.delete("pwd",{path: '/'})
      cookies.delete("userType",{path: '/'})     
      cookies.delete("token",{path: '/'})     
      console.log(" logout!!")
      
      return {
          user : null,
          allCourses:null ,
          courseImages:null,
          enrolledCourses:null
      }
},
}