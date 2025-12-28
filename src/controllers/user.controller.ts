import { Request, Response } from "express";

export class UsersController {
  static getAll(req: Request, res: Response) {
    res.send({ message: "The server is running" });
  }
}
