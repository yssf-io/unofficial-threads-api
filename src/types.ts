export type HdProfilePic = {
  height: number;
  width: number;
  url: string;
};

export type BioLink = {
  url: string;
};

export type User = {
  isPrivate: boolean;
  profilePicUrl: string;
  username: string;
  hdProfilePicVersions: HdProfilePic[];
  isVerified: boolean;
  biography: string;
  biographyWithEntities?: string;
  followerCount: number;
  bioLinks: BioLink[];
  pk: string;
  fullName: string;
  id?: string;
};

export type UserFragment = {
  profilePicUrl: string;
  username: string;
  id?: string;
  isVerified: boolean;
  pk: string;
};

export type Caption = {
  text: string;
};

export type Media = {
  height: number;
  width: number;
  url: string;
};

export type ImageVersions = {
  candidates: Media[];
};

export type Post = {
  user: UserFragment;
  images: ImageVersions;
  caption: Caption;
  takenAt: number;
  likeCount: number;
  pk: string;
  originalWidth: number;
  originalHeight: number;
};

export type ThreadItem = {
  post: Post;
};

export type Thread = {
  id: string;
  threadItems: ThreadItem[];
};
