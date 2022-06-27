import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useState } from "react";

import SEO from "../../components/SEO";

import LikeAndComment from "../../components/LikeAndComment";

import { darkTheme } from "../../styles/theme";

interface Params {
  params: { params: string[] };
}

interface Props {
  params: string[];
}

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
const PostTitle = styled.h1`
  font-size: 36px;
`;

const PostUser = styled.div`
  font-size: 20px;
`;
const Content = styled.textarea``;
const LikeBtn = styled.button``;

const DetailContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
  background-color: ${darkTheme.contentColor};
  width: 100%;
  border-radius: 4px;
`;

const PostContent = styled.div`
  width: 100%;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid #797979;
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
`;

const PostBody = styled(PostHeader)`
  border: none;
`;

export default function Post({ params }: Props) {
  const [isLiked, setIsLiked] = useState(0);

  const [post_title, post_id] = params || [];
  console.log(post_title, post_id, "dasdsa");

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
  if (!data)
    return (
      <DetailContainer>
        <div>Loading...</div>
      </DetailContainer>
    );
  const { getPost } = data;
  const { title } = getPost;
  const { nickname } = getPost.writer ?? "nickname";
  const { content } = getPost;
  const { like } = getPost;
  return (
    <DetailContainer>
      <SEO title={post_title} />
      <PostContent>
        <PostHeader>
          <PostTitle>{title ?? "title"}</PostTitle>
          <PostUser>{nickname}</PostUser>
        </PostHeader>
        <PostBody>
          <LikeAndComment />
        </PostBody>
      </PostContent>
      <Content>{content ?? ""}</Content>
      <LikeBtn onClick={onClick}>{like ? like : 0}</LikeBtn>
    </DetailContainer>
  );
}

export function getServerSideProps({ params: { params } }: Params) {
  return {
    props: { params },
  };
}
