"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>)=>{
    const validated=RegisterSchema.safeParse(values)

    if(!validated.success){
        return {error:"Invalid fields!"}
    }
    return {success:"Email Sent "}
}   