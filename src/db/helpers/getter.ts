import { connectToDB } from "@/db";
import { Document, Model } from "mongoose";
import { NextResponse } from "next/server";

type MongooseModel<T extends Document> = Model<T>;

export async function getter<T extends Document>(
  model: MongooseModel<T>
): Promise<NextResponse> {
  try {
    await connectToDB();
    const data = await model.find({});
    if (data) {
      return NextResponse.json({
        statusCode: 200,
        error: null,
        data,
      });
    } else {
      return NextResponse.json({
        statusCode: 400,
        error: {
          message: "Something went wrong. Please try again",
        },
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      statusCode: 500,
      error: {
        message: "Something went wrong. Please try again",
      },
      data: null,
    });
  }
}
