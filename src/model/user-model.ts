export type UserResponse = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
  created_at?: string;
  updated_at?: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
};
