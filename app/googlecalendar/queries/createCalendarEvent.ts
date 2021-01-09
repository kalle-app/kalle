import { Ctx } from "blitz"
import { google } from "googleapis"
import updateCalendarCredentials from "../helpers/updateCalendarCredentials"
import GoogleClient from "../helpers/GoogleClient"
import {Appointment} from "../../appointments/types"
interface Props {
    appointment: Appointment,
    userId: number
}
export default async function({appointment, userId}: Props){
    await updateCalendarCredentials(userId)

    const auth = GoogleClient.Connection;

    const calendar = google.calendar({version: 'v3', auth});

    let startDate: Date = new Date(appointment.start)

    var endDate: Date = new Date(appointment.start)

    endDate.setMilliseconds(appointment.durationInMilliseconds + startDate.getMilliseconds())

    const calendars = await calendar.calendarList.list({
        "minAccessRole": "owner"
    })



    var event = {
        'summary': appointment.title,
        'location': appointment.location || '',
        'description': appointment.description,
        'start': {
        'dateTime': appointment.start.toISOString(),
        'timeZone': 'Etc/UTC',
        },
        'end': {
        'dateTime': endDate.toISOString(),
        },
        // 'recurrence': [
        // 'RRULE:FREQ=DAILY;COUNT=4'
        // ],
        'attendees': [
        {'email': appointment.owner.email},
        {'email': appointment.organiser.email},
        ],
        'reminders': {
        'useDefault': true,
        },
    };
    console.log("evänt: ", event)
    
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        requestBody: event,
    }, function(err, event) {
        if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
        }
        console.log('Event created: %s', event.htmlLink);
    });
}