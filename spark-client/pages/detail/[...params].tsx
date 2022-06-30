import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
<<<<<<< HEAD
import { useEffect, useState } from "react";

import { darkTheme } from "../../styles/theme";

import DetailPage from "../../components/Body/DetailPage";
=======
import { useState } from "react";
import SEO from "../../components/SEO";
import LikeAndComment from "../../components/LikeAndComment";
import { darkTheme } from "../../styles/theme";
import Layout from "../../components/Layout";
>>>>>>> 3bc120bfd03c89e377be10fc2279cec023ae88cc

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
<<<<<<< HEAD
      likes {
        id
        post_id
        user_id
      }
=======
>>>>>>> 3bc120bfd03c89e377be10fc2279cec023ae88cc
      hashtags {
        hashtag
      }
      comments {
        post_id
        user_id
        comment
      }
      writer {
        nickname
      }
      images {
        image_path
      }
    }
  }
<<<<<<< HEAD
=======
`;

const PostTitle = styled.h1`
  font-size: 36px;
`;

const PostUserCreate = styled.div`
  font-size: 20px;
  margin-top: 30px;

  .user {
    float: left;
  }
  .create {
    display: flex;
    float: right;
  }
`;

// 사용자 올린 그림
const PostImage = styled.div`
  margin-left: 20px;
  margin-top: 30px;
  .image {
    margin-top: 10px;
    width: 250px;
    height: 250px;
  }
`;

// post_content 사용자 작성 글
const PostBody = styled.div`
  font-size: 20px;
  margin-top: 30px;
  margin-left: 20px;

  .content {
    margin-top: 20px;
  }
`;

// post_content 사용자 작성 글
const PostHash = styled.div`
  display: flex;
  color: rgb(255, 255, 255, 0.65);
  font-size: 16px;
  margin-top: 30px;
  margin-left: 20px;
`;

// 댓글 입력 칸
const Content = styled.input`
  margin-left: 10px;
  width: 90%;
  height: 50px;
  border: 0;
  outline: 0;
`;
const ContentBtn = styled.button`
  margin-left: 5px;
>>>>>>> 3bc120bfd03c89e377be10fc2279cec023ae88cc
`;

const DetailContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
  background-color: ${darkTheme.contentColor};
  width: 100%;
  border-radius: 4px;
`;

export default function Post({ params }: Props) {
<<<<<<< HEAD
  const [isLiked, setIsLiked] = useState(0);
  const [, postId] = params || [];
=======
  // const [isLiked, setIsLiked] = useState(0);

  //console.log(params)

  const [postTitle, postId] = params || [];

  //console.log(postTitle, postId, "dasdsa");
>>>>>>> 3bc120bfd03c89e377be10fc2279cec023ae88cc

  const post_id = Number(postId);
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_POST, {
    variables: {
      post_id,
    },
  });

  useEffect(() => {
    console.log(data);
  }, []);

  const onClick = () => {
    cache.writeFragment({
      id: `posts:${post_id}`,
      fragment: gql`
        fragment postFragment on posts {
          like
        }
      `,
      data: {
        // like: setIsLiked(isLiked + 1),
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
<<<<<<< HEAD
  //console.log(getPost)
  return <DetailPage params={params} data={data} onClick={onClick} />;
=======

  const { getPost } = data;
  const { title } = getPost;
  const { created_at } = getPost;
  const { nickname } = getPost.writer;
  const { post_content } = getPost;
  const { hashtags } = getPost;
  //const { likes } = getPost;
  const { images } = getPost;

  console.log(getPost);
  hashtags.map((e: any) => {
    console.log(e.hashtag);
  });

  //console.log(getPost)
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

          <div className="inner_line"></div>

          <PostImage>
            {images.map((token: any) => {
              return (
                <div key={token}>
                  <img className="image" src={token.image_path} />
                </div>
              );
            })}
          </PostImage>

          <PostBody>
            <p className="content">{post_content}</p>
          </PostBody>

          <PostHash>
            {hashtags.map((token: any) => {
              return <div key={token}>#{token.hashtag} </div>;
            })}
          </PostHash>

          <PostBottom>
            <LikeAndComment postData={data} />
          </PostBottom>
        </PostContent>

        <Content></Content>
        <ContentBtn onClick={onClick}>입력</ContentBtn>
      </DetailContainer>
    </Layout>
  );
>>>>>>> 3bc120bfd03c89e377be10fc2279cec023ae88cc
}

export function getServerSideProps({ params: { params } }: Params) {
  return {
    props: { params },
  };
}
