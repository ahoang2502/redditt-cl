import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { Navbar } from "./_components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Breadit",
	description: "A Redddit clone built with Next.js and Typescript.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cn(
				"bg-white text-slate-900 antialiased light text-sm",
				inter.className
			)}
		>
			<body className="min-h-screen pt-12 bg-slate-50 antialiased">
				<Navbar />

				<div className="container max-w-7xl mx-auto pt-12 h-full">
					{children}
				</div>

				<Toaster />
			</body>
		</html>
	);
}
