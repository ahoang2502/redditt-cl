"use client";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { toast } = useToast();

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn("google");
		} catch (error) {
			toast({
				title: "Failed to sign in with Google",
				description: "Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex justify-center", className)} {...props}>
			<Button
				size="sm"
				variant="outline"
				className="w-full"
				onClick={loginWithGoogle}
				isLoading={isLoading}
			>
				{isLoading ? (
					<Loader2 className="h-5 w-5 mr-2 animate-spin" />
				) : (
					<FcGoogle className="h-5 w-5 mr-2" />
				)}
				Continue with Google
			</Button>
		</div>
	);
};
