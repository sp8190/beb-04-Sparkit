import MainList from "../components/MainList";

import { gql, useQuery } from "@apollo/client";
import { GetPostsByUserId } from "../types/spark";
import styled from "styled-components";

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
  const UserInfoAmendClick = () => {
    console.log("hi");
  };
  if (!data) return <>loading</>;
  return (
    <>
      <UserTitleBox>유저 정보</UserTitleBox>
      <UserInfoContainer>
        <UserTitleBox>
          <h4>토큰 잔액 정보</h4>
        </UserTitleBox>
        <UserContentBox>
          <UserListP>balances: {`${data.getUserInfo.balance}`}</UserListP>
          <UserListP>accounts: {`${data.getUserInfo.account}`}</UserListP>
        </UserContentBox>
      </UserInfoContainer>
      <UserInfoContainer>
        <UserTitleBox>
          <h4>개인정보</h4>
        </UserTitleBox>
        <UserContentBox>
          <UserListP>id: {`${data.getUserInfo.id}`}</UserListP>
          <UserListP>eamil id: {`${data.getUserInfo.email}`}</UserListP>
          <UserListP>nickname: {`${data.getUserInfo.nickname}`}</UserListP>
        </UserContentBox>
        <UserInfoAmendBox>
          <UserInfoAmend type="button" onClick={UserInfoAmendClick}>
            개인정보 수정
          </UserInfoAmend>
        </UserInfoAmendBox>
      </UserInfoContainer>
      <UserListContainer>
        <UserTitleBox>
          <h3>토큰 리스트</h3>
        </UserTitleBox>
        {data && <MainList data={data.getUserInfo.posts} />}
      </UserListContainer>
    </>
  );
}

const UserTitleBox = styled.div`
  height: 30px;
  > h4 {
    font-size: 18px;
  }
`;

const UserInfoContainer = styled.div`
  height: 180px;
  min-width: 400px;
  background-color: tomato;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 40px;
`;

const UserContentBox = styled.div`
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
