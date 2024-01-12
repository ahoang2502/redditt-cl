import { SignIn } from "@/app/(auth)/sign-in/_components/SignIn";
import CloseModal from "@/components/CloseModal";

const Intercept = () => {
	return (
		<div className="fixed inset-0 bg-zinc-900/20 x-10 ">
			<div className="container flex items-center h-full max-w-lg mx-auto">
				<div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
					<div className="absolute top-2 right-2 ">
                        <CloseModal />

					</div>

					<SignIn />
				</div>
			</div>
		</div>
	);
};

export default Intercept;
