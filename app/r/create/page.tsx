"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

const CommunityCreatePage = () => {
	const [input, setInput] = useState<string>("");

	const router = useRouter();
	const { loginToast } = useCustomToast();

	const { mutate: createCommunity, isLoading } = useMutation({
		mutationFn: async () => {
			const payload: CreateSubredditPayload = {
				name: input,
			};

			const { data } = await axios.post("/api/subreddit", payload);
			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409)
					return toast({
						title: "Subreddit already existed",
						description: "Please enter a different name",
						variant: "destructive",
					});
				if (err.response?.status === 422)
					return toast({
						title: "Invalid subreddit name",
						description: "Please choose a name between 3 and 22 characters.",
						variant: "destructive",
					});

				if (err.response?.status === 401) return loginToast();
			}

			toast({
				title: "Something went wrong",
				description: "Could not create subreddit. Please try again later",
				variant: "destructive",
			});
		},
		onSuccess: (data) => {
			router.push(`/r/${data}`);
		},
	});

	return (
		<div className="container flex items-center h-full max-w-3xl mx-auto ">
			<div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6 shadow-md">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold">Create a community</h1>
				</div>

				<hr className="bg-zinc-500 h-px" />

				<div className="">
					<p className="text-lg font-medium">Name</p>
					<p className="text-xs pb-2">
						Community names including capitalization cannot be changed.
					</p>

					<div className="relative ">
						<p className="absolute text-sm left-2 inset-y-0 grid place-items-center text-zinc-500">
							r/
						</p>

						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="pl-6"
						/>
					</div>
				</div>

				<div className="flex justify-end gap-4">
					<Button variant="outlineBlue" onClick={() => router.back()}>
						Cancel
					</Button>
					<Button
						variant="primaryBlue"
						isLoading={isLoading}
						disabled={input.length === 0 || isLoading}
						onClick={() => createCommunity()}
					>
						{isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
						Create Community
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CommunityCreatePage;