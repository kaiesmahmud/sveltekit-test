import { findToken } from '../lib/fetch/token.js'
import { getUserProfile } from '../lib/fetch/getUserProfile.js'
import { getRolesEnrolls } from '../lib/fetch/getRollsEnrolls.js'
import { getAllCourses } from '../lib/fetch/getAllCourses.js'
// import { addCourseImg } from '../lib/fetch/addCourseImg.js'
// import { getAllEnrollCourses } from '../lib/fetch/getAllEnrollCourses.js'

export const load = async({cookies,fetch} ) => {
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
        let token ;
        if(user.userType == 'student'){
            token = await findToken(user.username,user.password,"student-api")
        }else{
            token = await findToken(user.username,user.password,"teacher-api")

        }
    
        //if the token Found then get the full user info (without role & enrollcourses)
        if(token.token){
            cookies.set('token',token.token, {path: '/'})
            user = {...user, token:token?.token }
            
//========== Fetch User Data by using token ===============================================
            const profileInfo = await getUserProfile(user?.token,username,fetch)
            // console.log("Fetch Result of ProfileInfo function",profileInfo)
            user = {...user, ...profileInfo}

//=========== Fetching Again for User Roles and EnrollCourses Details Collection ==========
            const userInfoAll = await getRolesEnrolls(user.token, user.id,fetch)
            user = {...user, ...userInfoAll}


            // console.log("Got User - ",user)
            
//=========== Fetch All Courses For User ===================================================
            const coursesWithOutImg = await getAllCourses(user?.token)
            // console.log("Got allCourses - ",coursesWithOutImg)

//============ Fetch Images URL in Array ====================================================
            // const courseImages = []

            // coursesWithOutImg.map(async course => {
            //     const courseImage = await addCourseImg(token.token, course.id);
            //     courseImages[course.id] = courseImage;
            //     console.log(courseImages[course.id])
            // })
            //----->> Moved to +page.js
            

//=========== Fetch Enrolled Courses by Users that will be shown to Dashboard ==============
            // const enrolledCourses = await getAllEnrollCourses(token.token, user.id)

            return { 
                user, 
                allCourses:coursesWithOutImg ,
                // courseImages,
                // enrolledCourses

            }
        }
        if(!token){
            console.log("token Not Found! in Layout server-", token)
        }
    }
}

