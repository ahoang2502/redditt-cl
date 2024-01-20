"use client";

import { usePrevious } from "@mantine/hooks";
import { CommentVote, VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CommentVoteRequest } from "@/lib/validators/vote";
import { Button } from "../ui/button";

type PartialCommentVote = Pick<CommentVote, "type">;

interface CommentVotesProps {
	commentId: string;
	initialVotesAmount: number;
	initialVote?: PartialCommentVote;
}

export const CommentVotes = ({
	commentId,
	initialVotesAmount,
	initialVote,
}: CommentVotesProps) => {
	const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmount);
	const [currentVote, setCurrentVote] = useState(initialVote);

	const previousVote = usePrevious(currentVote);

	const { loginToast } = useCustomToast();

	const { mutate: vote } = useMutation({
		mutationFn: async (voteType: VoteType) => {
			const payload: CommentVoteRequest = {
				commentId,
				voteType,
			};

			await axios.patch("/api/subreddit/post/comment", payload);
		},
		onError: (error, voteType) => {
			if (voteType === "UP") setVotesAmt((prev) => prev - 1);
			else setVotesAmt((prev) => prev + 1);

			// reset current votes
			setCurrentVote(previousVote);

			if (error instanceof AxiosError) {
				if (error?.response?.status === 401) {
					return loginToast();
				}
			}

			return toast({
				title: "Something went wrong",
				description: "Could not register your vote. Please try again later.",
				variant: "destructive",
			});
		},
		onMutate: (type) => {
			if (currentVote?.type === type) {
				setCurrentVote(undefined);

				if (type === "UP") setVotesAmt((prev) => prev - 1);
				else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
			} else {
				setCurrentVote({type});
				if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
				else if (type === "DOWN")
					setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
			}
		},
	});

	return (
		<div className="flex gap-1 ">
			<Button
				onClick={() => vote("UP")}
				size="sm"
				variant="ghost"
				aria-label="up-vote"
			>
				<ArrowBigUp
					className={cn("h-5 w-5 text-zinc-700", {
						"text-emerald-500 fill-emerald-500": currentVote?.type === "UP",
					})}
				/>
			</Button>

			<p className="text-center py-2 font-medium text-sm text-zinc-900">
				{votesAmt}
			</p>

			<Button
				onClick={() => vote("DOWN")}
				size="sm"
				variant="ghost"
				aria-label="down-vote"
			>
				<ArrowBigDown
					className={cn("h-5 w-5 text-zinc-700", {
						"text-red-500 fill-red-500": currentVote?.type === "DOWN",
					})}
				/>
			</Button>
		</div>
	);
};
