// import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken';
import config from "../config";
import User from "../types/user.type";


const userModel = new UserModel;

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User Created SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showall = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.showall();
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User showall SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.showone(req.params.id as unknown as string);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User showone SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const updateone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = {
            email: req.body.email,
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };

        const userupdates = await userModel.updateone(req.params.id, user);
        res.json({
            status: 'success',
            data: { ...userupdates },
            message: 'User updated SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};


export const deleteone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.deleteone(req.params.id as unknown as string);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User deleted SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.login(email, password);
        const token = jwt.sign({ user }, config.token as unknown as string);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: 'Username and Password do not match please try again',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'User login Successfully',
        });
    } catch (error) {
        next(error);
    }

};