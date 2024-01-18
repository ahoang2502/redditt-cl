import { Post, User, Vote } from "@prisma/client";
import { useRef } from "react";
import { MessageSquare } from "lucide-react";

import { formatTimeToNow } from "@/lib/utils";
import { EditorOutput } from "./EditorOutput";

interface PostProps {
	subredditName: string;
	post: Post & {
		author: User;
		votes: Vote[];
	};
	commentAmount: number;
}

export const PostComponent = ({
	subredditName,
	post,
	commentAmount,
}: PostProps) => {
	const postRef = useRef<HTMLDivElement>(null);

	console.log("height", postRef.current?.clientHeight);

	return (
		<div className="rounded-md bg-white shadow ">
			<div className="px-6 py-4 flex justify-between">
				{/* PostVotes */}

				<div className="w-0 flex-1 ">
					<div className="max-h-40 mt-1 text-xs text-gray-500">
						{subredditName ? (
							<>
								<a
									href={`/r/${subredditName}`}
									className="underline text-zinc-900 text-sm underline-offset-2"
								>
									r/{subredditName}
								</a>

								<span className="px-1">•</span>
							</>
						) : null}

						<span className="mr-1">Posted by u/{post.author.name}</span>

						{formatTimeToNow(new Date(post.createdAt))}
					</div>

					<a href={`/r/${subredditName}/post/${post.id}`} className="">
						<h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
							{post.title}
						</h1>
					</a>

					<div
						className="relative text-sm max-h-40 w-full overflow-clip"
						ref={postRef}
					>
						<EditorOutput content={post.content} />

						{postRef.current?.clientHeight &&
						postRef.current?.clientHeight >= 140 ? (
							<div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
						) : null}
					</div>
				</div>
			</div>

			<div className="bg-gray-50 z-20 text-sm p-4 sm:px-6 ">
				<a
					href={`/r/${subredditName}/post/${post.id}`}
					className="w-fit flex items-center gap-2"
				>
					<MessageSquare className="h-4 w-4" />
					{commentAmount} {commentAmount === 1 ? "comment" : "comments"}
				</a>
			</div>
		</div>
	);
};
