import { ResetForm } from '@/components/auth/reset-form'
import React, { Suspense } from 'react'

const AuthResetPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetForm/>
    </Suspense>

  )
}

export default AuthResetPage