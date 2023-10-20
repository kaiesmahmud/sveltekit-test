
export const actions ={
    default: async (events)=>{
    
		// console.log("logout teacher - events",events)
        const {cookies,parent} = events
        cookies.delete('username',{path: '/'})   
        cookies.delete("pwd",{path: '/'})
        cookies.delete("userType",{path: '/'}) 
        const {user} = await parent();
        console.log("User data in Dashboard is ", user)

        return {
            user : null
        }
	},
}