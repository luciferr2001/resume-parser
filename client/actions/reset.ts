"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod"



export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validated = ResetSchema.safeParse(values)

    if (!validated.success) {
        return { error: "Invalid fields!" }
    }

    const { email } = validated.data;

    const exisitingUser = await getUserByEmail(email);

    if (!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
        return { error: "Email Does not exists" }
    }

    if (!exisitingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(exisitingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Confirmation email sent. Please confirm your account first" }
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token);

    return { success: "Reset email sent." }

}   