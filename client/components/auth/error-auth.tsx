import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel="Oops! Something went wrong" backButtonHref="/auth/login" backButtonLabel="Back To Login">
            <div className="flex w-full justify-center text-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    );
};
