import type { Request, Response, NextFunction } from "express";

interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

function asyncHandler(requestHandler: RequestHandler) {
    return function(req: Request, res: Response, next: NextFunction){
        Promise.resolve(requestHandler(req, res, next))
        .catch(function(err){
            next(err);
        })
    };
}

export {asyncHandler};