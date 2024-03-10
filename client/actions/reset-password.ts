import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrprt from "bcryptjs"
import { db } from "@/lib/db";

export const resetPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {

    if (!token) {
        return { error: "Token Missing!" }

    }

    const validated = NewPasswordSchema.safeParse(values)

    if (!validated.success) {
        return { error: "Invalid fields!" }
    }

    const { password } = validated.data;

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Invalid Token!" }

    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return { error: 'Token has expired!' }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: 'Email does not exists!' }
    }

    const hashedPassword = await bcrprt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword,
        }
    })

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: 'Password Changed Successfully!' }

}   