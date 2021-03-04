const tenant = "common"
const clientId = process.env.
export async function getURL(){
    const baseURL = "https://login.microsoftonline.com/" + tenant + "/oauth2/v2.0/authorize" 
    
}


https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
client_id=9516495f-79a2-4e13-860b-4ffebb531f95&response_type=code
&redirect_uri=http://localhost:3000/outlookRedirect&response_mode=query
&scope=offline_access%20user.read%20mail.read