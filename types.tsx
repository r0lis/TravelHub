import { ReactNode } from 'react';

export type UserPosts = {
  id: number;
  user: {
    id: number;
    nickname: string;
    firstname: string;
    surname: string;
    avatarIcon: string;
  };
  date: ReactNode;
  title: string;
  text: string;
  // eslint-disable-next-line no-use-before-define
  comments: Array<Comment>;
  likes: number;
  img: ReactNode;
};
type Comment = {
  id: number;
  postId: number;
  userId: number;
  text: string;
  date: ReactNode;
};
