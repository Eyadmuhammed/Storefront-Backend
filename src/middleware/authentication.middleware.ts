import { Request, Response, NextFunction } from "express";
import Error from "../interfaces/error.interface";
import jwt from 'jsonwebtoken';
import config from "../config";


const unauthorizedError = (next: NextFunction) => {
    const error: Error = new Error('Login Error: Please try Login again');
    error.status = 401;
    next(error);
}

const validatemiddlwaretoken = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        // get authheader

        const authheader = req.get('Authorization');
        if (authheader) {
            const bearer = authheader.split(' ')[0].toLowerCase();
            const token = authheader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(token, config.token as unknown as string);
                if (decode) {
                    next();
                } else {
                    // can't authenticate the user
                    unauthorizedError(next);
                }
            } else {
                // the token not beader
                unauthorizedError(next);
            }
        } else {
            // there is no token provider
            unauthorizedError(next);
        }
    } catch (error) {
        unauthorizedError(next);
    }
};

export default validatemiddlwaretoken;