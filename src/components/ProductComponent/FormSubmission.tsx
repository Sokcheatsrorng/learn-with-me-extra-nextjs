"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from 'sonner';

// Define form schema
const formSchema = z.object({
    username: z.string()
        .min(2, "Username must be at least 2 characters")
        .max(50, "Username must be less than 50 characters"),
    email: z.string()
        .email("Please enter a valid email address")
        .max(100, "Email must be less than 100 characters"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    confirmed_password: z.string()
}).refine((data) => data.password === data.confirmed_password, {
    message: "Passwords don't match",
    path: ["confirmed_password"],
});

export default function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Define your form 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmed_password: ""
        }
    })

    // 2. Define a submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            console.log("Submitting values: ", values);

            const res = await fetch('https://car-nextjs-api.cheatdev.online/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    confirmed_password: values.confirmed_password
                })
            });

            console.log('Response status:', res.status);
            console.log('Response headers:', res.headers);
            
            // Check if response is JSON
            const contentType = res.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                const text = await res.text();
                console.log('Non-JSON response:', text);
                throw new Error('Server returned non-JSON response');
            }

            if (!res.ok) {
                throw new Error(data.message || data.error || 'Registration failed')
            }

            // Success toast
            toast.success("Registration successful!", {
                description: "Your account has been created successfully."
            });
            
            form.reset();
            console.log("Registration success", data);

        } catch (error) {
            console.error('Registration error:', error);
            
            // Error toast
            toast.error("Registration failed", {
                description: error instanceof Error ? error.message : "Please try again."
            });
            
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="sokcheat" 
                                    autoComplete="username"
                                    {...field} 
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    type="email" 
                                    placeholder="sokcheatsrorng@gmail.com" 
                                    autoComplete="email"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    autoComplete="new-password"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* confirm password */}
                <FormField
                    control={form.control}
                    name="confirmed_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input 
                                    type="password" 
                                    placeholder="Confirm your password" 
                                    autoComplete="new-password"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Registering..." : "Register"}
                </Button>
            </form>
        </Form>
    )
}