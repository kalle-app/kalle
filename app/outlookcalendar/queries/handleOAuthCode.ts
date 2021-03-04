import {requestToken} from "../helper/authHelpers"

export default async function handleOAuthCode(code: string){
    const token = await requestToken(code);
    
    console.log(token)
    // build new request to get token
    // make request
    // store values in db
}

