import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useState } from "react";
const GET_POST = gql`
  query getPost($postId: Int!) {
    getPost(post_id: $postId) {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        id
        hashtag
      }
      comments {
        post_id
        user_id
        comment
      }
      likes
      writer {
        nickname
      }
    }
  }
`;
const PostTitle = styled.h1``;
const Content = styled.textarea``;
const LikeBtn = styled.button``;
const DetailContainer = styled.div`
  width: 60vw;
  padding: 20px;
  margin-left: 12px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
`;

export default function Post() {
  const [isLiked, setIsLiked] = useState(0);
  const router = useRouter();
  const { post_id } = router.query;
  const postId = Number(post_id);
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });
  const onClick = () => {
    cache.writeFragment({
      id: `posts:${post_id}`,
      fragment: gql`
        fragment postFragment on posts {
          like
        }
      `,
      data: {
        like: setIsLiked(isLiked + 1),
      },
    });
  };
  console.log(data, loading);
  return (
    <DetailContainer>
      <PostTitle>
        {loading ? "Loading..." : `${data?.getPost?.title}`}
      </PostTitle>
      <Content>{data?.post?.content}</Content>
      <LikeBtn onClick={onClick}>{data?.post?.like ? 0 : isLiked}</LikeBtn>
    </DetailContainer>
  );
}
