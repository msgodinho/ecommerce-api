import express from "express";
import { UsersController } from "../controllers/user.controller";

export const userRoutes = express.Router();

userRoutes.get("/user", UsersController.getAll);
