export const getUserProfile = async (token,username)=> {
    try {
        let fetchProfileURL = "http://localhost/moodle/webservice/rest/server.php?wstoken="+token+"&moodlewsrestformat=json&wsfunction=core_user_get_users&criteria[0][key]=username&criteria[0][value]="+username
        
        const profileInfoResponse = await fetch(fetchProfileURL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const profileInfo = await profileInfoResponse.json();


        return {...profileInfo.users[0]}


    } catch (error) {
        console.log("Got Error on getUserProfile Function -",error.message)
    }
}