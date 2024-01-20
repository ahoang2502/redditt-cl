"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CommentRequest } from "@/lib/validators/comment";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface CreateCommentProps {
	postId: string;
	replyToId?: string;
}

export const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
	const [input, setInput] = useState<string>("");
	const router = useRouter();

	const { loginToast } = useCustomToast();

	const { mutate: comment, isLoading } = useMutation({
		mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
			const payload: CommentRequest = {
				postId,
				text,
				replyToId,
			};

			const { data } = await axios.patch(
				`/api/subreddit/post/comment`,
				payload
			);

			return data;
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
			router.refresh();
			setInput("");
		},
	});

	return (
		<div className="grid w-full gap-1.5">
			<Label htmlFor="comment">Your comment</Label>

			<div className="mt-2 ">
				<Textarea
					id="comment"
					placeholder="What are your thoughts?"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					rows={1}
				/>

				<div className="mt-2 flex justify-end">
					<Button
						onClick={() => comment({ postId, text: input, replyToId })}
						disabled={isLoading || input.length === 0}
						variant="primary"
					>
						Post
					</Button>
				</div>
			</div>
		</div>
	);
};
