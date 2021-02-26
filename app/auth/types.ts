import { DefaultCtx, SessionContext } from "blitz"
import { User } from "db"
import { SimpleRolesIsAuthorized } from "@blitzjs/server"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }

  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized
    PublicData: {
      userId: User["id"]
      roles: string[]
    }
  }
}
