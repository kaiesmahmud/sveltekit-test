
export const actions = {
    //Default async Function
    default: async ({request, cookies})=>{
        const data = await request.formData();
        
        const username = data.get('username')   // Get Email from the Student form
        const password = data.get('password') // Get password from the Student form
        const userType = 'student'
        cookies.set("username",username,{path: '/'})
        cookies.set("pwd",password,{path: '/'})
        cookies.set("userType",userType,{path: '/'})
        const user={username:username,password:password,userType:userType}
        return {
            user
        }
    },
    

}