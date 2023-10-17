export const load = async({cookies}) => {
    console.log("finding way")
    
    
    const userType = cookies.get("userType")
    const email = cookies.get("email")
    const password = cookies.get("pwd")
    
    const user = {
        userType:userType,
        email:email ,
        password:password 
    }
    console.log("user is " , user)
   if(!user.userType){
    console.log("No user in Root")
   }
   if(user.userType){
    console.log("user updating in data")
    return { user:user }
   }
   console.log("Still Working")
}

