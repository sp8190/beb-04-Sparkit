import MainList from "../components/MainList";

import { gql, useQuery } from "@apollo/client";
import { GetPosts, UserInfo } from "../types/spark";
import styled from "styled-components";

// export async function getStaticProps() {
//     const { data } = await client.query({
//       query: gql`
//         query User {
//           User {
//             email
//             nickname
//             account
//             balance
//             private_key
//             created_at
//           }
//         }
//       `,
//     });

//     return {
//       props: {
//         User: data.countries.slice(0, 4),
//       },
//    };
//   }

const ALL_POST_BY_USER_ID = gql`
  query GetPostByUser($userId: Int) {
    getPostByUser(user_id: $userId) {
      id
      title
      post_content
      user_id
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
        }
      }
      writer {
        nickname
      }
      images {
        id
        image_path
        post_id
      }
    }
  }
`;

const USER_INFO = gql`
  query GetUserInfo($userId: Int, $accessToken: String) {
    getUserInfo(user_id: $userId, access_token: $accessToken) {
      id
      nickname
      email
      password
      account
      private_key
      balance
      created_at
      updated_at
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

interface GetPostsByUserId {
  getUserInfo: UserInfo;
}

export default function Mypage() {
  const { data } = useQuery<GetPostsByUserId>(USER_INFO, {
    variables: { userId: 36 },
  });
  console.log(data, "dsankdlsankl");
  const UserInfoAmendClick = () => {
    console.log("hi");
  };
  return (
    <>
      <UserInfoContainer>
        <h4>토큰 잔액 정보</h4>
        <UserContent>내용</UserContent>
      </UserInfoContainer>
      <UserInfoContainer>
        <h4>개인정보</h4>
        <UserContent></UserContent>
        <UserInfoAmendBox>
          <UserInfoAmend type="button" onClick={UserInfoAmendClick}>
            개인정보 수정
          </UserInfoAmend>
        </UserInfoAmendBox>
      </UserInfoContainer>
      <UserListContainer>
        <h3>토큰 리스트</h3>
        {data && <MainList data={data.getUserInfo.posts} />}
      </UserListContainer>
    </>
  );
}

const UserH3 = styled.h3``;

const UserInfoContainer = styled.div`
  height: 180px;
  min-width: 400px;
  background-color: tomato;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 40px;
`;

const UserContent = styled.div`
  height: 140px;
`;

const UserInfoAmendBox = styled.div`
  text-align: right;
`;

const UserListContainer = styled.div`
  border-top: 1px solid #aaa;
  padding: 24px;
`;

const UserListP = styled.p``;

const UserInfoAmend = styled.button`
  background-color: #ececec;
  font-size: 14px;
  outline: none;
  border: none;
  border-radius: 2px;
  box-shadow: none;
  cursor: pointer;
  color: black;
  &:active {
    background-color: #ddd;
  }
`;
