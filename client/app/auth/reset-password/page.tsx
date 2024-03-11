import { NewPasswordForm } from "@/components/auth/new-password"
import { Suspense } from "react"

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <NewPasswordForm/>
    </Suspense>
  )
}

export default ResetPasswordPage