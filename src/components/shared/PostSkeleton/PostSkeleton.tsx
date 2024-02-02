const PostSkeleton = () => {
	return (
		<div className="w-full flex border-post border rounded hover:border-post-hover overflow-hidden">
			<div className="bg-post-side w-10 hidden sm:block"></div>
			<div className="bg-primary flex-1 p-2">
				<div className="animate-pulse">
					<div className="h-4 bg-gray-300/70 rounded mb-4 max-w-[250px]"></div>
					<div className="h-5 bg-gray-300/70 rounded mb-4 max-w-sm"></div>
					<div className="h-48 bg-gray-300/70 rounded"></div>
				</div>
			</div>
		</div>
	);
};

export default PostSkeleton;
