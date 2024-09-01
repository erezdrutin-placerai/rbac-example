import { User as PrismaUser, Post as PrismaPost } from '@prisma/client';

export type User = PrismaUser;
export type Post = PrismaPost;

export interface Permission {
  action: string;
  subject: string;
}