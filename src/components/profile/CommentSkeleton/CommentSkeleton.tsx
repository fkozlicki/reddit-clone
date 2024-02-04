import { ChatCircle } from '@phosphor-icons/react';

const CommentSkeleton = () => {
	return (
		<div className="w-full overflow-hidden bg-primary">
			<div className="flex w-full p-2 items-center border-post border hover:border-post-hover">
				<ChatCircle
					size={20}
					className="mr-2 basis-5 flex-shrink-0 text-primary"
				/>
				<div className="h-4 bg-gray-300/70 rounded w-full animate-pulse"></div>
			</div>
			<div className="py-2 px-4 border border-post border-t-transparent hover:border-post-hover">
				<div className="border-dashed border-l-[2px] pl-4 text-primary">
					<div className="h-3 bg-gray-300/70 rounded max-w-[100px] mb-2 animate-pulse"></div>
					<div className="h-3 bg-gray-300/70 rounded mb-2 animate-pulse"></div>
					<div className="text-xs flex gap-2">
						<div>Reply</div>
						<div>Share</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentSkeleton;
