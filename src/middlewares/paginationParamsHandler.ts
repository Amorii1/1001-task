import { NextFunction, Request, Response } from "express";
import { envData } from "../utils/envData";

export const paginationParamsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "GET") {
    let perPage = Number(req.query.perPage) as any;
    if (!perPage || perPage <= 0 || perPage > Number(envData.MAX_PER_PAGE)) {
      perPage = Number(envData.DEFAULT_PER_PAGE!);
    }
    req.query.perPage = perPage;
    req.query.take = perPage;

    let page = Number(req.query.page) as any;
    if (!page || page <= 0) {
      page = 1;
    }
    req.query.page = page;
    req.query.skip = ((page - 1) * perPage) as any;
  }

  next();
};
