import EmailFactory from "../EmailFactory"

export class EmailRequest extends EmailFactory {
  appointment: any
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super()
    //TODO
  }

  sendEmail() {
    super.sendEmail()
  }

  buildEmail(): any {
    //TODO: implement an invitation template
  }
}
