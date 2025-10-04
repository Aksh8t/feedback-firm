import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(params: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions);
    const user: User = session?.user
}

