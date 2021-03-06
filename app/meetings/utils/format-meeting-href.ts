import type { Meeting } from "db"
import { getOrigin } from "utils/origin"

export function formatMeetingHref(meeting: Pick<Meeting, "ownerName" | "link">) {
  return `${getOrigin()}/schedule/${meeting.ownerName}/${meeting.link}`
}
