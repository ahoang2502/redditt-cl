import Link from "next/link";

import { Icon } from "@/components/Icon";
import { buttonVariants } from "@/components/ui/button";

export const Navbar = () => {
	return (
		<div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
			<div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
				{/* Logo */}
				<Link href="/" className="flex gap-2 items-center">
					<Icon.logo className="h-8 w-8 sm:h-7 sm:w-7" />
					<p className="hidden text-zinc-700 text-sm font-medium md:block">
						Breadit
					</p>
				</Link>

				{/* Search bar */}

				{/*  */}
				<Link
					href="/sign-in"
					className="bg-[#ff4500] text-white rounded-3xl py-2 px-4 text-sm font-semibold"
				>
					Log In
				</Link>
			</div>
		</div>
	);
};
