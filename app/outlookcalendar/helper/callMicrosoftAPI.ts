import * as request from "request"
import * as FormData from "form-data"

interface Options{
    'method': "POST" | "GET",
    'url': string,
    'formData'?: FormData,
    'body'?: string,
    'headers'?: object
}

export default async function makeRequestTo(options: Options): Promise<unknown> {
    return new Promise((resolve, reject) => {request(options, function (error, response) {
        if (error) reject(error);
        console.log(response.body)
        const res = JSON.parse(response.body)
        console.log("e", res)
        resolve(res)
    })})
}