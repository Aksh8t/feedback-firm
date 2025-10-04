import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    
    if (!session || !session.user) {
        return Response.json({ successs: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $project: { messages: 1, _id: 0 } }
        ])
        
    } catch (error) {
        
    }
}