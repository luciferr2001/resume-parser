import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const url=process.env.NEXT_PUBLIC_URL

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${url}/auth/new-verification?token=${token}`
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email',
        html: `<a href="${confirmLink}"> To Confirm click here</a>`
    })
}


export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${url}/auth/reset-password?token=${token}`
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Password',
        html: `<a href="${resetLink}">Click here to reset your password</a>`
    })
}