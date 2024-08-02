import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const tokens = await authService.signin(id, password);
    res.status(200).json(tokens);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await authService.refreshToken(refreshToken);
    res.status(200).json(newTokens);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getUserInfo = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const userInfo = await authService.getUserInfo(userId);
    res.status(200).json(userInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    await authService.logout(userId);
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
