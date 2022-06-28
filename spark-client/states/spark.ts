import { atom } from "recoil";

interface Comments {
  post_id: number;
  user_id: number;
  commnet: string;
  id: number;
}

interface Hashtags {
  id: number;
  hashtag: string;
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

export const postsState = atom<GetPosts[]>({
  key: "postsState",
  default: [],
});
