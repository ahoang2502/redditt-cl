import { redirect } from "next/navigation";
import React from "react";

import { authOptions, getAuthSession } from "@/lib/auth";
import { UsernameForm } from "./_components/UsernameForm";

export const metadata = {
	title: "Settings",
	description: "Manage account and website settings.",
};

const SettingsPage = async () => {
	const session = await getAuthSession();

	if (!session?.user) redirect(authOptions.pages?.signIn || "/sign-in");

	return (
		<div className="max-w-4xl mx-auto py-12 ">
			<div className="grid items-start gap-8 ">
				<h1 className="font-bold text-3xl md:text-4xl ">Settings</h1>
			</div>

			<div className="grid gap-10 ">
				<UsernameForm
					user={{
						id: session.user.id,
						username: session.user.username || "",
					}}
				/>
			</div>
		</div>
	);
};

export default SettingsPage;
