import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

/** Configures default middleware */
export const configureDefaultMiddleware = (app: Express) => {
  app.use(helmet());

  app.use(
    cors({
      // TODO: Properly configure before launch
      origin: true,
      credentials: true,
      exposedHeaders: "authorization",
    })
  );

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    // Expect-CT is deprecated and should be removed
    res.removeHeader("Expect-CT");
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
};
