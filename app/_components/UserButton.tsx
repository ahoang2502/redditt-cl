"use client";

import { User } from "next-auth";
import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/UserAvatar";

interface UserButtonProps {
	user: Pick<User, "name" | "image" | "email">;
}

export const UserButton = ({ user }: UserButtonProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{ name: user.name || null, image: user.image || null }}
					className="h-10 w-10"
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="bg-white " align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1">
						{user.name && <p className="font-medium">{user.name}</p>}

						{user.email && (
							<p className="w-[180px] truncate text-sm text-zinc-700">
								{user.email}
							</p>
						)}
					</div>
				</div>

				{/* Actions */}
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/">Feed</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href="/r/create">Create community</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href="/settings">Settings</Link>
				</DropdownMenuItem>

				{/* Log out */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer flex items-center justify-between w-full"
					onSelect={(event) => {
						event.preventDefault();

						signOut({
							callbackUrl: `${window.location.origin}/sign-in`,
						});
					}}
				>
					Logout <LogOut className="h-4 w-4" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
