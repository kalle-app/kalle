#!/usr/bin/env bash

function create_event() {
  id=$1
  start=$2
  end=$3
  name=$4
  location=$5

  curl \
    --user admin:root \
    -X PUT \
    -H "Depth: 1" \
    --data-binary @- \
    "http://localhost:80/remote.php/dav/calendars/admin/personal/$id.ics" <<-EOF
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MailClient.VObject/8.0.3385.0
BEGIN:VEVENT
UID:$id
DTSTART;TZID=Europe/Berlin:$start
DTEND;TZID=Europe/Berlin:$end
TRANSP:OPAQUE
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
LAST-MODIFIED:20120901T180000
DTSTAMP:20120901T180000
CREATED:20120901T180000
LOCATION:$location
SUMMARY:$name
CLASS:PUBLIC
END:VEVENT
END:VCALENDAR
EOF
}

create_event a 20201125T120000 20201125T140000 Lunch Somewhere
create_event b 20201125T200000 20201125T230000 Geburtstag Somewhere
create_event c 20201126T100000 20201126T120000 Meeting Somewhere
