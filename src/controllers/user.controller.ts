import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found-error";

export class UsersController {
  static async getAll(req: Request, res: Response) {
    const users = await getFirestore().collection("users").get();
    res.send({
      users: users.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    });
  }

  static async getById(req: Request, res: Response) {
    const userId = req.params.id;
    const doc = await getFirestore().collection("users").doc(userId).get();
    if (doc.exists) {
      let user = {
        id: doc.id,
        ...doc.data(),
      };
      res.send(user);
    } else {
      throw new NotFoundError(`User with ID ${userId} not found!`);
    }
  }

  static async save(req: Request, res: Response) {
    const user = req.body;
    const savedUser = await getFirestore().collection("users").add(user);
    res.send({ message: `Usuário ${savedUser.id} criado com sucesso!` });
  }

  static async update(req: Request, res: Response) {
    const userId = req.params.id;
    const user = req.body;
    const docRef = await getFirestore().collection("users").doc(userId);
    if ((await docRef.get()).exists) {
      await docRef.set({
        name: user.name,
        email: user.email,
      });
      res.send({ message: `User with ID ${userId} updated succefully` });
    } else {
      throw new NotFoundError(`User with ID ${userId} not found!`);
    }
  }

  static async delete(req: Request, res: Response) {
    const userId = req.params.id;
    await getFirestore().collection("users").doc(userId).delete();

    res.send({ message: `User with ID ${userId} deleted succefully` });
  }
}
