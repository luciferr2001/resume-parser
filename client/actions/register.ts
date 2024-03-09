"use server";

import { db } from "@/lib/db"

import bcrprt from "bcryptjs"

import { RegisterSchema } from "@/schemas";
import * as z from "zod"
import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens";

import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    // Getting The Validated Value
    const validated = RegisterSchema.safeParse(values)
    // If the values are not valid
    if (!validated.success) {
        return { error: "Invalid fields!" }
    }

    //Destructre the validated data
    const { email, name, password } = validated.data;
    const hashedPassword = await bcrprt.hash(password, 10)

    // Check if email Already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email Already In Use!" }
    }

    // Create the user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email,verificationToken.token)

    return { success: "Confirmation Email Sent" }
}   