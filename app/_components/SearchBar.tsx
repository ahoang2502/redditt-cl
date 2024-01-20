"use client";

import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma, Subreddit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

export const SearchBar = () => {
	const [input, setInput] = useState<string>("");
	const router = useRouter();

	const {
		data: queryResult,
		refetch,
		isFetched,
		isFetching,
	} = useQuery({
		queryFn: async () => {
			if (!input) return [];

			const { data } = await axios.get(`/api/search?q=${input}`);

			return data as (Subreddit & {
				_count: Prisma.SubredditCountOutputType;
			})[];
		},
		queryKey: ["search-query"],
		enabled: false,
	});

	const debounceRequest = useCallback(() => {
		request();
	}, []);

	const request = debounce(async () => {
		refetch();
	}, 300);

	return (
		<Command className="relative rounded-lg border max-w-lg z-50 overflow-visible ">
			<CommandInput
				className="outline-none border-none focus:border-none focus:outline-none ring-0"
				placeholder="Search community..."
				value={input}
				onValueChange={(text) => {
					setInput(text);
					debounceRequest();
				}}
			/>

			{input.length > 0 ? (
				<CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
					{isFetched && <CommandEmpty>No result found.</CommandEmpty>}

					{(queryResult?.length ?? 0) > 0 ? (
						<CommandGroup heading="Community">
							{queryResult?.map((subreddit) => (
								<CommandItem
									onSelect={(e) => {
										router.push(`/r/${e}`);
										router.refresh();
									}}
									key={subreddit.id}
									value={subreddit.name}
								>
									<Users className="mr-2 h-4 w-4" />
									<a href={`/r/${subreddit.name}`} className="">
										r/{subreddit.name}
									</a>
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
				</CommandList>
			) : null}
		</Command>
	);
};
