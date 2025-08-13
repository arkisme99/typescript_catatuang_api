import { User } from "@prisma/client";
import { dateToString } from "../helpers/date-helper";

export type UserResponse = {
  id: number;
  username: string;
  name: string;
  email: string | null;
  avatar: string | null;
  token?: string; //bisa tidak tampil
  created_at: string | null;
  updated_at: string | null;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  email?: string;
  password: string;
  avatar?: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateProfileRequest = {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    created_at: user.created_at ? dateToString(user.created_at) : null,
    updated_at: user.updated_at ? dateToString(user.updated_at) : null,
  };
}
