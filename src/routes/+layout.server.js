import { findToken } from '../lib/fetch/token.js'
import { getUserProfile } from '../lib/fetch/getUserProfile.js'
import { getRolesEnrolls, getRollsEnrolls } from '../lib/fetch/getRollsEnrolls.js'
import { getAllCourses } from '../lib/fetch/getAllCourses.js'
import { addCourseImg } from '../lib/fetch/addCourseImg.js'

export const load = async({cookies,fetch} ) => {
    // const adminToken = '34fb21fc7d5c90736902f6ea4f728442'
    const userType = cookies.get("userType")
    const username = cookies.get("username")
    const password = cookies.get("pwd")
    let user = {
        userType:userType,
        username:username ,
        password:password 
    }

    if(user.userType){
        //Find Token from username & Password =============================================
        const token = await findToken(user.username,user.password)
    
        //if the token Found then get the full user info (without role & enrollcourses)
        if(token.token){
            cookies.set('token',token.token, {path: '/'})
            user = {...user, token:token?.token }
            
//========== Fetch User Data by using token ===============================================
            const profileInfo = await getUserProfile(user?.token,username)
            // console.log("Fetch Result of ProfileInfo function",profileInfo)
            user = {...user, ...profileInfo}

//=========== Fetching Again for User Roles and EnrollCourses Details Collection ==========
            const userInfoAll = await getRolesEnrolls(user.token, user.id)
            user = {...user, ...userInfoAll}


            // console.log("Got User - ",user)
            
            //=========== Fetch All Courses For User ===================================================
            const coursesWithOutImg = await getAllCourses(user?.token)
            // console.log("Got allCourses - ",coursesWithOutImg)

            // const coursesWithImg = coursesWithOutImg.map(async course => {
            //     const courseimage = await addCourseImg(token,course.id)
            //     return { ...course,courseimage}
            // })
            // console.log("All courses", coursesWithImg)
//=========== Fetch Enrolled Courses by Users that will be shown to Dashboard ==============


            return { user, allCourses:coursesWithOutImg }
        }
        if(!token){
            console.log("token Not Found! in Layout server-", token)
        }
    }
}

