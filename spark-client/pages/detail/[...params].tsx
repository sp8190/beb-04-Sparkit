import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { darkTheme } from "../../styles/theme";

import DetailPage from "../../components/Body/DetailPage";

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
      likes {
        id
        post_id
        user_id
      }
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
  const [isLiked, setIsLiked] = useState(0);
  const [, postId] = params || [];

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
  //console.log(getPost)
  return <DetailPage params={params} data={data} onClick={onClick} />;
}

export function getServerSideProps({ params: { params } }: Params) {
  return {
    props: { params },
  };
}
