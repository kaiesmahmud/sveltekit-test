//GEtting Token using Username , password & service
export const findToken = async(username,password)=>{
    try {
        let url = "http://localhost/moodle/login/token.php?username="+username+"&password="+password+"&service=student-api"
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const token  = await response.json()
        // console.log("Found Token from Function findToken. The Token is ",token)

    return token ;
    } catch (error) {
        console.log(error)
    }

}
