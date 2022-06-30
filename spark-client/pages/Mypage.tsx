import { gql, useQuery } from "@apollo/client";
import { GetPostsByUserId } from "../types/spark";
import styled from "styled-components";

import MyPage from "../components/Body/MyPage";

const USER_INFO = gql`
  query GetUserInfo($userId: Int, $accessToken: String) {
    getUserInfo(user_id: $userId, access_token: $accessToken) {
      id
      nickname
      email
      password
      account
      balance
      posts {
        title
        id
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
          id
          writer {
            nickname
            id
          }
        }
        likes {
          id
          post_id
          user_id
        }
        writer {
          nickname
        }
        images {
          image_path
        }
      }
    }
  }
`;

export default function Mypage() {
  const { data } = useQuery<GetPostsByUserId>(USER_INFO, {
    variables: { userId: 36 },
  });

  if (!data) return <>loading</>;
  return (
    <>
      <MyPage data={data} />
    </>
  );
}
