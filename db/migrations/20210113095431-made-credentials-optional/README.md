# Migration `20210113095431-made-credentials-optional`

This migration has been generated by lukas.laskowski at 1/13/2021, 10:54:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "ConnectedCalendar" ALTER COLUMN "caldavAddress" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "encryptedPassword" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210113095105-merged-calendarcredentials-into-connectedcalendar..20210113095431-made-credentials-optional
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
@@ -41,12 +41,12 @@
 model ConnectedCalendar {
   id  Int @id @default(autoincrement())
   name String
-  caldavAddress String
-  username String
-  encryptedPassword String
-  refreshToken String
+  caldavAddress String?
+  username String?
+  encryptedPassword String?
+  refreshToken String?
   owner User @relation(fields: [ownerId], references: [id])
   ownerId Int
   status String
   type String
```

