# Migration `20210113095105-merged-calendarcredentials-into-connectedcalendar`

This migration has been generated by lukas.laskowski at 1/13/2021, 10:51:05 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "CalendarCredentials" DROP CONSTRAINT "CalendarCredentials_ownerId_fkey"

ALTER TABLE "ConnectedCalendar" ADD COLUMN     "refreshToken" TEXT NOT NULL

DROP TABLE "CalendarCredentials"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201230195545-added-google-queries..20210113095105-merged-calendarcredentials-into-connectedcalendar
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -38,24 +38,15 @@
   publicData         String?
   privateData        String?
 }
-model CalendarCredentials {
-  id  Int @id @default(autoincrement())
-  name String
-  owner User @relation(fields: [ownerId], references: [id])
-  ownerId Int
-  status String
-  type String
-  credentials Json
-}
-
 model ConnectedCalendar {
   id  Int @id @default(autoincrement())
   name String
   caldavAddress String
   username String
   encryptedPassword String
+  refreshToken String
   owner User @relation(fields: [ownerId], references: [id])
   ownerId Int
   status String
   type String
```

