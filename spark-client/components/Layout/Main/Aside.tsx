import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { postsState } from "../../../states/spark";
import { gql, useQuery } from "@apollo/client";
import { darkTheme } from "../../../styles/theme";
import { ResultsHashTag, Results, Tags } from "../../../types/spark";
import {
  AsideAside,
  AsideLi,
  AsideContainer,
  AsideDiv,
  AsideLiButton,
} from "./Mainstyle/Saside";
interface TagsCount {
  [name: string]: { id: number; count: number };
}

interface Obj {
  name: string;
  id: number;
  count: number;
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
      likes {
        id
        post_id
        user_id
      }
      comments {
        post_id
        user_id
        id
        comment
        writer {
          id
          nickname
          email
          password
          account
          balance
          private_key
          created_at
          updated_at
          posts {
            id
            title
            post_content
            user_id
            created_at
            hashtags {
              id
              hashtag
            }
            writer {
              nickname
            }
            likes {
              post_id
              user_id
              id
            }
            images {
              id
              image_path
              post_id
            }
          }
        }
      }
    }
  }
`;

const ALL_POST_BY_HASHTAG = gql`
  query GetPostsByHashtag($hashtagId: Int) {
    getPostsByHashtag(hashtag_id: $hashtagId) {
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
          created_at
          updated_at
        }
      }
      images {
        id
        image_path
        post_id
      }
    }
  }
`;

interface Props {
  setTitle: Function;
}

const Aside = ({ setTitle }: Props) => {
  const [, setPostData] = useRecoilState(postsState);
  const [tags, setTags] = useState<Tags[]>([]);
  const [obj, setObj] = useState<Obj[]>([]);

  const [tagId, setTagId] = useState(0);
  const { data, refetch } = useQuery<Results>(ALL_POST);
  const { data: data2, refetch: refetch2 } = useQuery<ResultsHashTag>(
    ALL_POST_BY_HASHTAG,
    {
      variables: { hashtagId: tagId },
    }
  );

  useEffect(() => {
    console.log(tagId);
    refetch2();
  }, [tagId]);

  useEffect(() => {
    if (!data2) return;
    setPostData(data2.getPostsByHashtag);
  }, [data2]);

  const sortTagCountArr = (arr: Obj[]) => {
    return arr.sort(function (a, b) {
      return b.count - a.count;
    });
  };

  const tagsCountObj = (arr: Tags[]) => {
    const newObj: TagsCount = {};
    arr.forEach((item) => {
      for (let i = 0; i < item.tags.length; i++) {
        const tag = item.tags[i].hashtag;
        if (newObj[tag]) newObj[tag].count += 1;
        else newObj[tag] = { count: 1, id: item.tags[i].id };
      }
    });
    return newObj;
  };
  const tagsCountArr = (obj: TagsCount) => {
    const arr = [];
    for (let key in obj) {
      arr.push({ name: key, count: obj[key].count, id: obj[key].id });
    }
    return arr;
  };

  const handleTagClick = (item: number, name: string) => {
    if (!data2) return;
    console.log(data2);
    setPostData(data2.getPostsByHashtag);
    setTitle(name);
    setTagId(item);
  };
  const handleTagAllClick = () => {
    refetch();
    if (!data) return;
    setPostData(data.getPosts);
    setTitle("전체 태그");
  };

  useEffect(() => {
    if (!data) return;
    const tags = data.getPosts
      .map((item) => {
        return { tags: item.hashtags };
      })
      .flat();

    setTags(tags);
    setPostData(data.getPosts);
  }, [data]);

  useEffect(() => {
    if (!tags) return;
    const result1 = tagsCountObj(tags);
    const result2 = tagsCountArr(result1);
    const sortedArr = sortTagCountArr(result2);
    setObj(sortedArr);
  }, [tags]);

  const tagList = useMemo(() => {
    return obj.slice(0, 6).map((item, index) => {
      return (
        <AsideLi key={item.name + index}>
          <AsideLiButton
            type="button"
            onClick={() => handleTagClick(item.id, item.name)}
          >
            {item.name}
          </AsideLiButton>
        </AsideLi>
      );
    });
  }, [obj]);

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
        {
          <AsideDiv backgroundColor={`${darkTheme.contentColor}`}>
            <nav>
              <ul>
                <AsideLi>
                  <AsideLiButton type="button" onClick={handleTagAllClick}>
                    전체 태그
                  </AsideLiButton>
                </AsideLi>
                {obj !== [] && tagList}
              </ul>
            </nav>
          </AsideDiv>
        }
      </AsideContainer>
    </AsideAside>
  );
};

export default Aside;
