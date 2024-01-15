"use client";

import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ToggleSubscribeProps {
	subredditId: string;
	subredditName: string;
	isSubscribed: boolean;
}

export const ToggleSubscribe = ({
	subredditId,
	subredditName,
	isSubscribed,
}: ToggleSubscribeProps) => {
	const { loginToast } = useCustomToast();
	const router = useRouter();

	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId,
			};

			const { data } = await axios.post("/api/subreddit/subscribe", payload);

			return data as string;
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) return loginToast();
			}

			return toast({
				title: "Something went wrong. Please try again",
				variant: "destructive",
			});
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh();
			});

			return toast({
				title: "Subscribed",
				description: `You're now subscribed to r/${subredditName}`,
			});
		},
	});

	const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId,
			};

			const { data } = await axios.post("/api/subreddit/unsubscribe", payload);

			return data as string;
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) return loginToast();
			}

			return toast({
				title: "Something went wrong. Please try again",
				variant: "destructive",
			});
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh();
			});

			return toast({
				title: "Unsubscribed",
				description: `You're now unsubscribed from r/${subredditName}`,
			});
		},
	});

	return isSubscribed ? (
		<Button
			className="w-full mt-1 mb-4 bg-[#d22532] font-semibold rounded-full hover:bg-[#d22532]/80"
			onClick={() => unsubscribe()}
			disabled={isUnsubLoading}
		>
			{isUnsubLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
			Leave community
		</Button>
	) : (
		<Button
			disabled={isSubLoading}
			onClick={() => subscribe()}
			className="w-full mt-1 mb-4 bg-[#d22532] font-semibold rounded-full hover:bg-[#d22532]/90"
		>
			{isSubLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Join
			to post
		</Button>
	);
};
