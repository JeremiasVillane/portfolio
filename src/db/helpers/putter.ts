import { connectToDB } from "@/db";
import { Document, Model } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type MongooseModel<T extends Document> = Model<T>;

export async function putter<T extends Document>(
  model: MongooseModel<T>,
  req: NextRequest
): Promise<NextResponse> {
  try {
    await connectToDB();

    const extractData = await req.json();
    const { _id, ...rest } = extractData;

    const updateData = await model.findOneAndUpdate(
      {
        _id: _id,
      },
      { ...rest },
      { new: true }
    );

    if (updateData) {
      return NextResponse.json({
        statusCode: 200,
        error: null,
        data: {
          message: "Data updated successfully",
        },
      });
    } else {
      return NextResponse.json({
        statusCode: 400,
        error: {
          message: "Something went wrong. Please try again",
        },
      });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      statusCode: 500,
      error: {
        message: "Something went wrong. Please try again",
      },
    });
  }
}