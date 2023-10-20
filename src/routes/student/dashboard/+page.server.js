
export const actions ={
  default: async (events)=>{
  
  console.log("logout teacher - events",events)
      const {cookies} = events
      cookies.delete('username',{path: '/'})   
      cookies.delete("pwd",{path: '/'})
      cookies.delete("userType",{path: '/'})     
      console.log(" logout!!")
      
      return {
          user : null
      }
},
}