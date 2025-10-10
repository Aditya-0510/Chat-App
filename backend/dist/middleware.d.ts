import type { NextFunction, Request, Response } from "express";
declare function authMiddleware(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=middleware.d.ts.map