"use client";

import { VoteType } from "@prisma/client";

interface PostVoteClientProps {
	postId: string;
	initialVotesAmount: number;
	initialVote?: VoteType | null;
}

export const PostVoteClient = ({
	postId,
	initialVotesAmount,
	initialVote,
}: PostVoteClientProps) => {
	return <div></div>;
};
