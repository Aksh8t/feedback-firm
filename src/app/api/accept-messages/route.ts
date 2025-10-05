import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(params: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = user?._id;
  const { acceptMessages } = await params.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Setting updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update acceptMessages setting:", error);
    return Response.json(
      { success: false, message: "Failed to update setting" },
      { status: 500 }
    );
  }
}

export async function GET(params: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = user?._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User fetched successfully",
        data: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to fetch acceptMessages setting:", error);
    return Response.json(
      { success: false, message: "Failed to fetch setting" },
      { status: 500 }
    );
  }
}
