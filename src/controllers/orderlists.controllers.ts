import { Request, Response, NextFunction } from "express";
import OrderListsModel from '../models/orderlists.model';
import OrderList from "../types/orderlists.type";

const orderlistModel = new OrderListsModel;

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrder_List = await orderlistModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...newOrder_List },
            message: 'OrderList Created SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showall = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const ordersList = await orderlistModel.showall();
        res.json({
            status: 'success',
            data: { ...ordersList },
            message: 'OrdersList showall SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderList = await orderlistModel.showone(req.params.id);
        res.json({
            status: 'success',
            data: { ...orderList },
            message: 'orderList showone SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const updateone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderList: OrderList = {
            order_id: req.body.order_id,
            quantity: req.body.quantity,
            product_id: req.body.product_id
        };

        const updatedorderList = await orderlistModel.updateone(req.params.id, orderList);
        res.json({
            status: 'success',
            data: { ...updatedorderList },
            message: 'OrdersList updated SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const deleteone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletorderList = await orderlistModel.deleteone(req.params.id);
        res.json({
            status: 'success',
            data: { ...deletorderList },
            message: 'orderList deleted SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const AllOrders = await orderlistModel.getAllOrders(req.params.id);
        res.json({
            status: 'success',
            data: { ...AllOrders },
            message: 'orderList Get all orders SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};