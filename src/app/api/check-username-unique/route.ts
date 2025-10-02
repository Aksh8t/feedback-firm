import dbConnect from "@/lib/dbConnect";
import { UsernameValidation } from "@/schemas/signUpSchema";
import z, { success } from "zod";
import UserModel from "@/models/User";
import { username } from "better-auth/plugins";

const UsernameQuerySchema = z.object({
  username: UsernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "Invalid username",
          errors: usernameErrors,
        },
        { status: 400 }
      );
      }
      


      
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
