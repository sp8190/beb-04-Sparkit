import { gql, useQuery } from "@apollo/client";
import { GetPostsByUserId } from "../types/spark";
import { useRecoilState } from "recoil";
import { userIdState } from "../states/spark";
import GetUserId from "../states/userId";

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
  // const [userId, setUserId] = useRecoilState(userIdState);

  // const settingUserId = (accessToken: string) => {
  //   const base64 = accessToken.split(".")[1];
  //   const payload = Buffer.from(base64, "base64");
  //   const result = JSON.parse(payload.toString());
  //   setUserId(Number(result.id));
  // };
  // const accessToken = window.sessionStorage.getItem("userInfo");
  // settingUserId(accessToken);
  GetUserId();
  const [userId] = useRecoilState(userIdState);
  const { data } = useQuery<GetPostsByUserId>(USER_INFO, {
    variables: { userId: userId },
  });
  console.log(data, "pagedata");
  console.log(userId, "pagedata");

  if (!data) return <>loading</>;
  return (
    <>
      <MyPage data={data} />
    </>
  );
}
