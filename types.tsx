import { ReactNode } from "react";

export type UserPosts = {
    id: number;
    nickname: ReactNode;
    firstname: ReactNode;
    surname: ReactNode;
    avatarIcon: ReactNode;
    date: ReactNode;
    title: ReactNode;
    text: ReactNode;
    comments: Comment[];
    likes: number;
    img:ReactNode;
}
type Comment = {
    id: number;
    userId: number;
    text: ReactNode;
    date: ReactNode;
  };
  



 