import { Request, Response, NextFunction } from "express";
import OrderModel from '../models/order.model';
import Order from "../types/order.type";


const orderModel = new OrderModel;

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrder = await orderModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...newOrder },
            message: 'Order Created SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};


export const showall = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.showall();
        res.json({
            status: 'success',
            data: { ...orders },
            message: 'Orders showall SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.showone(req.params.id);
        res.json({
            status: 'success',
            data: { ...order },
            message: 'order showone SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const updateone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order: Order = {
            id: 1,
            user_id: req.body.user_id,
            status: req.body.status
        };

        const updatedorder = await orderModel.updateone(req.params.id, order);
        res.json({
            status: 'success',
            data: { ...updatedorder },
            message: 'Orders updated SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const deleteone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.deleteone(req.params.id);
        res.json({
            status: 'success',
            data: { ...order },
            message: 'order deleted SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

