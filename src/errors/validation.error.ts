import { ErrorBase } from "./base.error";

export class ValidationError extends ErrorBase {
  constructor(message: string = "Field missing") {
    super(400, message);
  }
}
