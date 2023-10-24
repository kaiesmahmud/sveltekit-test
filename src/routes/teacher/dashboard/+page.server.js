
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