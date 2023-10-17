
export const actions ={
  default: async (events)=>{
  
  console.log("logout teacher - events",events)
      const {cookies} = events
      cookies.delete('email',{path: '/'})   
      cookies.delete("pwd",{path: '/'})
      cookies.delete("userType",{path: '/'})     
      console.log("Trying to logout!!")
      
      return {
          user : null
      }
},
}