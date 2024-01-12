import { User } from "next-auth";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";

import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface UserAvatarProps extends AvatarProps {
	user: Pick<User, "name" | "image">;
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
	return (
		<Avatar {...props}>
			{user.image ? (
				<div className="relative aspect-square h-full w-full">
					<Image
						fill
						src={user.image}
						alt="profile-picture"
						referrerPolicy="no-referrer"
					/>
				</div>
			) : (
				<AvatarFallback>
					<span className="sr-only">{user?.name}</span>

					<UserIcon className="h-6 w-6 " />
				</AvatarFallback>
			)}
		</Avatar>
	);
};
