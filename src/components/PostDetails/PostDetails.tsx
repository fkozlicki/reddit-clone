'use client';

import React from 'react';
import CommentsSection from '../CommentsSection/CommentsSection';
import CommunityAbout from '../CommunityAbout/CommunityAbout';
import Post from '../Post/Post';
import { gql, useQuery } from '@apollo/client';
import PostSkeleton from '../PostSkeleton/PostSkeleton';

const POST_QUERY = gql`
	query ($id: String!) {
		post(id: $id) {
			id
			title
			createdAt
			content
			comments {
				id
				content
				createdAt
				author {
					name
				}
				votes {
					userId
					value
				}
				replies {
					author {
						name
					}
					content
					createdAt
					id
					votes {
						userId
						value
					}
				}
			}
			votes {
				userId
				value
			}
			author {
				name
			}
			community {
				name
			}
		}
	}
`;

interface PostDetailsProps {
	id: string;
}

const PostDetails = ({ id }: PostDetailsProps) => {
	const { data, loading, error } = useQuery(POST_QUERY, {
		variables: {
			id,
		},
	});

	if (loading) {
		return (
			<div className="flex gap-4 justify-center flex-1 min-h-full">
				<div className="w-full lg:max-w-[750px] flex flex-col">
					<PostSkeleton />
				</div>
				<div className="w-[312px] hidden lg:block flex-shrink-0">
					<CommunityAbout withName cta="Join" />
				</div>
			</div>
		);
	}

	if (!data || error) {
		return <div>Couldn`t load data</div>;
	}

	const post = data.post;

	return (
		<div className="flex gap-4 justify-center flex-1 min-h-full">
			<div className="w-full lg:max-w-[750px] flex flex-col">
				<Post
					id={post.id}
					title={post.title}
					authorName={post.author.name}
					communityName={post.community.name}
					createdAt={post.createdAt}
					content={post.content}
					comments={post.comments}
					votes={post.votes}
				/>
				<div className="w-full h-5" />
				<CommentsSection postId={post.id} initialComments={post.comments} />
			</div>
			<div className="w-[312px] hidden lg:block flex-shrink-0">
				<CommunityAbout withName cta="Join" />
			</div>
		</div>
	);
};

export default PostDetails;
