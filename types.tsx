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
  likes: number;
  img: ReactNode;
};
