import * as express from "express";

declare global {
 namespace Express {
  interface Request {
   phone_number?: string;
  }
 }
}
