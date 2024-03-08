"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod"

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values)

    if (!validated.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validated.data
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {error:"Invalid Credentials!"}
                default:
                    return {error:"Something Went Wrong!"}
            }
        }
        throw error;
    }
}   