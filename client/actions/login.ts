"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>)=>{
    const validated=LoginSchema.safeParse(values)

    if(!validated.success){
        return {error:"Invalid fields!"}
    }
    return {success:"Email Sent "}
}   