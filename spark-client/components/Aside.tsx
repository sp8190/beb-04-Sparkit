import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { postsState } from "../states/spark";
import { gql, useQuery } from "@apollo/client";
import { darkTheme } from "../styles/theme";

interface Hashtags {
  id: number;
  hashtag: string;
}

interface BackColor {
  backgroundColor: string;
}

interface TagsCount {
  [name: string]: number;
}

interface Obj {
  name: string;
  count: number;
}

interface Comments {
  post_id: number;
  user_id: number;
  commnet: string;
  id: number;
}

interface Writer {
  nickname: string;
}

interface GetPosts {
  id: number;
  title: string;
  post_content: string;
  user_id: number;
  created_at: string;
  hashtags: Hashtags[];
  comments: Comments[];
  writer: Writer;
  likes: number;
}

interface Results {
  getPosts: GetPosts[];
}

const ALL_POST = gql`
  query GetPosts {
    getPosts {
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

const Aside = () => {
  const { data, loading } = useQuery<Results>(ALL_POST);
  const [postData, setPostData] = useRecoilState(postsState);
  const [tags, setTags] = useState<Hashtags[]>([]);
  const [obj, setObj] = useState<Obj[]>([]);
  const sortTagCountArr = (arr: Obj[]) => {
    return arr.sort(function (a, b) {
      return b.count - a.count;
    });
  };

  const tagsCountObj = (arr: Hashtags[]) => {
    const newObj: TagsCount = {};
    arr.forEach((item) => {
      const { hashtag } = item;
      if (newObj[hashtag]) newObj[hashtag] += 1;
      else newObj[hashtag] = 1;
    });
    return newObj;
  };

  const tagsCountArr = (obj: TagsCount) => {
    const arr = [];
    for (let key in obj) {
      arr.push({ name: key, count: obj[key] });
    }
    return arr;
  };

  useEffect(() => {
    if (!data) return;
    const tags = data.getPosts.map((item) => item.hashtags).flat();
    setTags(tags);
    setPostData(data.getPosts);
  }, [data]);

  useEffect(() => {
    if (!tags) return;
    const sortedArr = sortTagCountArr(tagsCountArr(tagsCountObj(tags)));
    setObj(sortedArr);
  }, [tags]);
  return (
    <AsideAside>
      <AsideContainer>
        <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
          <ul>
            <AsideLi>공지사항</AsideLi>
            <AsideLi>
              <p>hi</p>
            </AsideLi>
            <AsideLi>
              <p>hi2</p>
            </AsideLi>
          </ul>
        </AsideDiv>
        <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
          <nav>
            <ul>
              <AsideLi>전체 태그</AsideLi>
              {obj !== [] &&
                obj.slice(0, 7).map((item, index) => {
                  return (
                    <AsideLi key={item.name + index}>
                      <AsideLiButton type="button">{item.name}</AsideLiButton>
                    </AsideLi>
                  );
                })}
            </ul>
          </nav>
        </AsideDiv>
      </AsideContainer>
    </AsideAside>
  );
};

export default Aside;

const AsideAside = styled.aside`
  position: relative;
  width: 20vw;
  min-width: 250px;
  max-width: 280px;
`;

const AsideLi = styled.li``;

const AsideContainer = styled.div`
  position: fixed;
  width: inherit;
  min-width: 250px;
  max-width: 280px;
`;

const AsideDiv = styled.div<BackColor>`
  background-color: ${(props) => props.backgroundColor};
  height: 300px;
  border-radius: 4px;
  margin: 20px;
  padding: 16px 20px;
`;

const AsideLiButton = styled.button`
  font-size: 14px;
  outline: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  width: 100%;
  padding: 14px 16px;
  text-align: left;
  color: ${darkTheme.accentColor};
  background-color: transparent;

  &:hover {
    font-weight: bold;
    color: #5fee99;
  }
`;
