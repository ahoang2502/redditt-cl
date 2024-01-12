import Link from "next/link";
import React from "react";

import { Icon } from "@/components/Icon";
import { UserAuthForm } from "../../_components/UserAuthForm";

export const SignUp = () => {
	return (
		<div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] ">
			<div className="flex flex-col space-y-6 text-center">
				<div className="flex flex-col space-y-4">
					<Icon.logo className="mx-auto h-8 w-8" />
					<h1 className="text-2xl font-semibold tracking-tight ">
						Sign Up
					</h1>
					<p className="text-sm max-w-xs mx-auto">
						By continuing, you are setting up a Reddit account and agree to our
						User Agreement and Privacy Policy.
					</p>
				</div>

				{/* Sign-in Form */}
				<UserAuthForm />

				<p className="px-8 text-center text-sm text-zinc-700">
					Already have an account?{" "}
					<Link
						href="/sign-in"
						className="text-[#ff4500] text-sm underline underline-offset-4 hover:text-[#ff4500]/80"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
};
