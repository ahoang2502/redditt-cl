"use client";

import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Link2 } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface MiniCreatePostProps {
	session: Session | null;
}

export const MiniCreatePost = ({ session }: MiniCreatePostProps) => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<li className="overflow-hidden rounded-md bg-white shadow list-none">
			<div className="h-full px-6 py-4 flex justify-between gap-y-6 gap-x-4">
				<div className="relative">
					<UserAvatar
						user={{
							name: session?.user.name || null,
							image: session?.user.image || null,
						}}
					/>

					<span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
				</div>

				<Input
					readOnly
					onClick={() => router.push(pathname + "/submit")}
					placeholder="Create post"
				/>

				<div className="flex flex-row space-x-1">
					<Button
						variant="ghost"
						onClick={() => router.push(pathname + "/submit")}
						className="py-1 px-2"
					>
						<ImageIcon className="text-zinc-500 h-7 w-7" />
					</Button>
					<Button
						variant="ghost"
						onClick={() => router.push(pathname + "/submit")}
						className="py-1 px-2"
					>
						<Link2 className="text-zinc-500 h-7 w-7" />
					</Button>
				</div>
			</div>
		</li>
	);
};
