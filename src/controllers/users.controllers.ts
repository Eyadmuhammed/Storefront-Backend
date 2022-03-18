import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";


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
        const user = await userModel.updateone(req.body);
        res.json({
            status: 'success',
            data: { ...user },
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