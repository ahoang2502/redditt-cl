import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignUp } from "./_components/SignUp";


const SignUpPage = () => {
	return (
		<div className="absolute inset-0">
			<div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"self-start -mt-20 "
					)}
				>
					<ChevronLeft className="mr-2 h-5 w-5" />
					Home
				</Link>

				<SignUp />
			</div>
		</div>
	);
};

export default SignUpPage;
