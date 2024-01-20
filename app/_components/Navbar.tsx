import Link from "next/link";

import { Icon } from "@/components/Icon";
import { getAuthSession } from "@/lib/auth";
import { UserButton } from "./UserButton";
import { SearchBar } from "./SearchBar";

export const Navbar = async () => {
	const session = await getAuthSession();

	return (
		<div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-3">
			<div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
				{/* Logo */}
				<Link href="/" className="flex gap-2 items-center">
					<Icon.logo className="h-10 w-10 " />
					<p className="hidden text-zinc-700 text-lg font-semibold md:block">
						Breadit
					</p>
				</Link>

				{/* Search bar */}
				<SearchBar />

				{/* User Button */}
				{session?.user ? (
					<UserButton user={session.user} />
				) : (
					<Link
						href="/sign-in"
						className="bg-[#ff4500] text-white rounded-3xl py-3 px-4 font-semibold"
					>
						Log In
					</Link>
				)}
			</div>
		</div>
	);
};
