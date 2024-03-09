"use client";

import * as z from "zod";

import { ResetSchema } from "@/schemas";

import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";

import { CardWrapper } from "@/components/auth//card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const searchParams = useSearchParams();
    const urlError=searchParams.get("error")==="OAuthAccountNotLinked" ? "Email Already in use with different provider" :""
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };
    return (
        <CardWrapper headerLabel="Forgot Your Password?" backButtonLabel="Back To Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="rathodrutik05@gmail.com" type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Send Reset Email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
