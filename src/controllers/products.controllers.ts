import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/product.model";
import Product from "../types/product.type";


const productModel = new ProductModel;

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product Created SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showAllproducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.showAllproducts();
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product showall SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const showoneproduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.showoneproduct(req.params.id as unknown as number);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product showone SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

export const updateoneproduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product: Product = {
            product_name: req.body.product_name,
            product_des: req.body.product_des,
            price: req.body.price
        };
        const updateproduct = await productModel.updateoneproduct(req.params.id, product);
        res.json({
            status: 'success',
            data: { ...updateproduct },
            message: 'product updated SUccessfully',
        });
    } catch (error) {
        next(error);
    }
};


export const deleteoneproduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.deleteoneproduct(req.params.id as unknown as number);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'product deleted SUccessfully',
        });
    } catch (error) {
        next(error);
    }

};

