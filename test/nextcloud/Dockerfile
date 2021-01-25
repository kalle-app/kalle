FROM nextcloud:18.0.3

RUN SQLITE_DATABASE=/db.sqlite NEXTCLOUD_UPDATE=1 NEXTCLOUD_ADMIN_USER=admin NEXTCLOUD_ADMIN_PASSWORD=root /entrypoint.sh echo "done"

COPY ./create-events.sh /create-events.sh

RUN nohup bash -c "apache2-foreground &" && sleep 4 && /create-events.sh
