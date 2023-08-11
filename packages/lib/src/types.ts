export type ApiPostRequest = {
  type: "like" | "comment";
  id: string;
  name?: string;
  body?: string;
};

export type ApiComment = {
  fieldId: string;
  name: string;
  body: string;
};

export type ApiPostDetailResponse = {
  like: number;
  comments: ApiComment[];
};
