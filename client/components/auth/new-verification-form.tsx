"use client";

import { CardWrapper } from "./card-wrapper";

import { ClockLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { newVerification } from "@/actions/new-verification";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [succcess, setSucccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (succcess || error) return;
        if (!token) {
            setError("Missing Token");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSucccess(data?.success);
                setError(data?.error);
            })
            .catch((error) => {
                setError(error?.message);
            });
    }, [token, succcess, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper headerLabel="Confirming Your Verification" backButtonHref="/auth/login" backButtonLabel="Back To Login">
            <div className="flex w-full items-center justify-center">
                {!succcess && !error && <ClockLoader />}
                <FormSuccess message={succcess} />
                {!succcess && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
};
