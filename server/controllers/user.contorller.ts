import { Schema } from "mongoose";
import { catchAsync } from "../middlewares/catchAsync";
import { Contact, IContact } from "../models/contact.model";
import { IUser, User } from "../models/user.model";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
export const getMe = catchAsync(
 async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  // const phone_number = "+201060921624";
  const user: IUser & { _id: string } = await User.findOne({
   _id: "6715b1f16c38ed8a4c7de106",
  });
  if (!user) {
   return next(new AppError("User not found", 404));
  }
  const contacts = await Contact.find({ user: user._id });

  res.status(200).json({ user, contacts });
 }
);

export const addContact = catchAsync(
 async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const phone_number = "+201060921624";
  const user = await User.findOne({ phone_number }); // update this to get from req.user

  await Contact.create({ user: "6715b1f16c38ed8a4c7de106", ...req.body });
  res.status(201).json({ message: "Contact added" });
 }
);
