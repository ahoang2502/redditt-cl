"use client";

import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const CloseModal = () => {
	const router = useRouter();

	return (
		<Button
			aria-label="close"
			className="rounded-full p-2"
			variant="ghost"
			onClick={() => router.back()}
		>
			<X className="h-6 w-6" />
		</Button>
	);
};

export default CloseModal;
