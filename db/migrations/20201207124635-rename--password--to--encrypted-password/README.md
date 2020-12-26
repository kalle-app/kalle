# Migration `20201207124635-rename--password--to--encrypted-password`

This migration has been generated at 12/7/2020, 12:46:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConnectedCalendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "caldavAddress" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ConnectedCalendar" ("id", "name", "caldavAddress", "ownerId", "status", "type", "username") SELECT "id", "name", "caldavAddress", "ownerId", "status", "type", "username" FROM "ConnectedCalendar";
DROP TABLE "ConnectedCalendar";
ALTER TABLE "new_ConnectedCalendar" RENAME TO "ConnectedCalendar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201201131428-time-is-now-string-type..20201207124635-rename--password--to--encrypted-password
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -41,8 +41,10 @@
 model ConnectedCalendar {
   id  Int @id @default(autoincrement())
   name String
   caldavAddress String
+  username String
+  encryptedPassword String
   owner User @relation(fields: [ownerId], references: [id])
   ownerId Int
   status String
   type String
```

