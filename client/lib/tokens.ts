import { gerVerfificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid"

import { db } from '@/lib/db'


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisitingToken = await gerVerfificationTokenByEmail(email);

    if (exisitingToken) {
        await db.verificationToken.delete({
            where: {
                id: exisitingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });
    return verificationToken;
}