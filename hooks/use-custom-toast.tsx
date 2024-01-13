import Link from "next/link";
import { toast } from "./use-toast";

export const useCustomToast = () => {
	const loginToast = () => {
		const { dismiss } = toast({
			title: "Login required.",
			description: "You need to be logged in for this action.",
			variant: "default",
			action: (
				<Link
					href="/sign-in"
					onClick={() => dismiss()}
					className="bg-[#ff4500] text-white rounded-3xl py-3 px-4 font-semibold"
				>
					Login
				</Link>
			),
		});
	};

	return { loginToast };
};
