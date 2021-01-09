import {useQuery, Ctx} from "blitz"
import getCalendarCredentials from "../oauth/queries/getCalendarCredentials"
import googlequery from "../helpers/googlequery"
import updateCalendarCredentials from "../helpers/updateCalendarCredentials"


interface DateRange {
    start: Date,
    end: Date
}

export default async function getFreeBusySchedule({start, end}: DateRange, userId: number) {

    await updateCalendarCredentials(userId)
    return await googlequery({start, end})
}
