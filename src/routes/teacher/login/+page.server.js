import { redirect } from '@sveltejs/kit';


export const actions = {
    //Default async Function
    default: async ({request, cookies})=>{
        const data = await request.formData();
        
        const email = data.get('email')   // Get Email from the Student form
        const password = data.get('password') // Get password from the Student form
        const userType = 'teacher'
        cookies.set("email",email,{path: '/'})
        cookies.set("pwd",password,{path: '/'})
        cookies.set("userType",userType,{path: '/'})
        const user={email:email,password:password,userType:userType}
        return {
            user
        }
    },
    

}