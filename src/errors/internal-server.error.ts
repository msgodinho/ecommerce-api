import { ErrorBase } from "./base.error";

export class InternalServerError extends ErrorBase {
  constructor(message: string = "Internal server error!") {
    super(500, message);
  }
}
