"use client";

import React, { useRef, useState } from "react";
import { Comment, CommentVote, User } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

import { UserAvatar } from "../UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { CommentVotes } from "./CommentVotes";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

type ExtendedComment = Comment & { votes: CommentVote[]; author: User };

interface PostCommentProps {
	postId: string;
	comment: ExtendedComment;
	votesAmt: number;
	currentVote: CommentVote | undefined;
}

export const PostComment = ({
	comment,
	votesAmt,
	currentVote,
	postId,
}: PostCommentProps) => {
	const commentRef = useRef<HTMLDivElement>(null);
	const [isReplying, setIsReplying] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const router = useRouter();

	const { data: session } = useSession();

	const { mutate: postComment, isLoading } = useMutation({
		mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
			const payload: CommentRequest = {
				postId,
				text,
				replyToId,
			};

			const { data } = await axios.patch(
				"/api/subreddit/post/comment",
				payload
			);

			return data;
		},
		onError: () => {
			return toast({
				title: "Something went wrong",
				description: "Your comment wasn&apos;t posted. Please try again",
				variant: "destructive",
			});
		},
		onSuccess: () => {
			router.refresh();
			setIsReplying(false);
		},
	});

	return (
		<div className="flex flex-col " ref={commentRef}>
			<div className="flex items-center">
				<UserAvatar
					user={{
						name: comment.author.name || null,
						image: comment.author.image || null,
					}}
					className="h-6 w-6"
				/>

				<div className="ml-2 flex items-center gap-x-2">
					<p className="text-sm font-medium text-gray-900">
						u/{comment.author.username}
					</p>

					<p className="max-h-40 truncate text-xs text-zinc-500">
						{formatTimeToNow(new Date(comment.createdAt))}
					</p>
				</div>
			</div>

			<p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

			<div className="flex flex-wrap gap-2 items-center ">
				<CommentVotes
					commentId={comment.id}
					initialVotesAmount={votesAmt}
					initialVote={currentVote}
				/>

				<Button
					onClick={() => {
						if (!session) return router.push("/sign-in");

						setIsReplying(true);
					}}
					variant="ghost"
					size="sm"
				>
					<MessageSquare className="h-4 w-4 mr-1.5" />
					Reply
				</Button>

				{isReplying ? (
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

							<div className="mt-2 flex justify-end gap-x-4">
								<Button
									tabIndex={-1}
									variant="outlineOrange"
									onClick={() => setIsReplying(false)}
									className="rounded-md px-2 font-medium"
								>
									Cancel
								</Button>

								<Button
									onClick={() => {
										if (!input)
											return toast({
												title: "Your comment cannot be empty",
											});

										postComment({
											postId,
											text: input,
											replyToId: comment.replyToId ?? comment.id,
										});
									}}
									disabled={isLoading || input.length === 0}
									variant="primary"
								>
									Post
								</Button>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};
