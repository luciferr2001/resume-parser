"use client";

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";

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
import { resetPassword } from "@/actions/reset-password";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            resetPassword(values,token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };
    return (
        <CardWrapper headerLabel="Enter Your New Password" backButtonLabel="Back To Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="******" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
