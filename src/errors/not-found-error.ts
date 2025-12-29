import { ErrorBase } from "./base.error";

export class NotFoundError extends ErrorBase {
  constructor(message: string = "Not found") {
    super(404, message);
  }
}
