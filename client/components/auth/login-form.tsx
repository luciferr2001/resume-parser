import { CardWrapper } from "./card-wrapper"

export const LoginForm = () => {
  return (
    <CardWrapper headerLabel="Welcome Back" backButtonLabel="Dont Have An Account?" backButtonHref="/auth/register" showSocial>
        <h1>Login</h1>
    </CardWrapper>
  )
}
