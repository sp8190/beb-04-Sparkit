import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useState } from "react";

import SEO from "../../components/SEO";

import LikeAndComment from "../../components/LikeAndComment";

import { darkTheme } from "../../styles/theme";

import Layout from "../../components/Layout";

interface Params {
  params: { params: string[] };
}

interface Props {
  params: string[];
}

const GET_POST = gql`
  query getPost($post_id: Int!) {
    getPost(post_id: $post_id) {
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


const PostUserCreate = styled.div`
  
  font-size: 20px;
  margin-top: 30px;

  .user{
    float:left;
  }
  .create{
    display: flex;
    float:right;
  }

`;

const PostBody = styled.div`
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;
  border-top: 1px solid #797979;

  .content{
    margin-top: 20px;

  }
`;

const Content = styled.textarea`
  margin-left: 20px;
  width: 90%;

`;
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

  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
`;

const PostBottom = styled(PostHeader)`
  margin-top: 50px;
  border: none;
`;

export default function Post({ params }: Props) {
  const [isLiked, setIsLiked] = useState(0);

  //console.log(params)

  const [postTitle, postId] = params || [];

  //console.log(postTitle, postId, "dasdsa");

  const post_id = Number(postId);
  const {data, loading, client: { cache },} = useQuery(GET_POST, {
    variables: {
      post_id,
    },
  });

  
  const onClick = () => {
    cache.writeFragment({
      id: `posts:${postId}`,
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

  // 데이터 받아오기 까지 대기화면
  if (!data)
    return (
      <DetailContainer>
        <div>Loading...</div>
      </DetailContainer>
    );


  const { getPost } = data;
  const { title } = getPost;
  const { created_at } = getPost;
  const { nickname } = getPost.writer;
  const { post_content } = getPost;
  const { likes } = getPost;

  console.log(getPost)
  return (
    <Layout>
      <DetailContainer>
        <SEO title={postTitle} />
        <PostContent>

          <PostHeader>
            <PostTitle>{title}</PostTitle>
            <PostUserCreate>
              <div className="user">작성자: {nickname}</div>
              <div className="create">날짜: {created_at}</div>
            </PostUserCreate>
          </PostHeader>

          <PostBody>
            <p className="content">{post_content}</p>
          </PostBody>

          

          <PostBottom>
            <LikeAndComment />
          </PostBottom>

        </PostContent>

        <Content></Content>
        <LikeBtn onClick={onClick}>{likes ? likes : 0}</LikeBtn>
        
      </DetailContainer>
    </Layout>
  );
}

export function getServerSideProps({ params: { params } }: Params) {
  return {
    props: { params },
  };
}
