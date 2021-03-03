import { CalendarConnectionDetails, makeRequestTo } from "./index"
import * as jsdom from "jsdom"
const {JSDOM} = jsdom
export async function getConnectionString(calendar: CalendarConnectionDetails) {
  calendar.url = "https://caldav.icloud.com"
  const z = await makeRequestTo(calendar, {
    headers: { DEPTH: 0 },
    method: "PROPFIND",
    data: `
            <propfind xmlns='DAV:'>
                <prop>
                    <current-user-principal/>
                </prop>
            </propfind>
            `,
    }
  )
  
  var xmlDoc = new JSDOM(z.data.toString(), {contentType: 'text/xml'})
  const principal = xmlDoc.window.document.querySelector("multistatus")
                        .querySelector('propstat')
                        .querySelector('prop')
                        .querySelector('current-user-principal')
                        .textContent

  calendar.url = calendar.url + principal.slice(0, -1);
  //calendar.url = calendar.url.slice(0, -1);
  const a = await makeRequestTo(calendar, {
    headers: { DEPTH: 0 },
    method: "PROPFIND",
    data: `
            <propfind xmlns='DAV:' xmlns:cd='urn:ietf:params:xml:ns:caldav'>
                <prop>
                    <cd:calendar-home-set/>
                </prop>
            </propfind>
            `,
    }
  )
  
  var xmlDoc = new JSDOM(a.data.toString(), {contentType: 'text/xml'})
  return xmlDoc.window.document
            .querySelector("multistatus")
            .querySelector('response')
            .querySelector('propstat')
            .querySelector('prop')
            .querySelector('calendar-home-set')
            .querySelector('href')
            .textContent
  //console.log(a.data.toString())
  
  //.console.log(xmlDoc.getElementsByTagName('multistatus')[0].children[0].textContent)
}
