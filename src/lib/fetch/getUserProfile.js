export const getUserProfile = async (token,username,fetch)=> {
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
        console.log("core_user_get_users - ", profileInfo.users[0])

        return {...profileInfo.users[0]}


    } catch (error) {
        console.log("Got Error on getUserProfile Function -",error.message)
    }
}