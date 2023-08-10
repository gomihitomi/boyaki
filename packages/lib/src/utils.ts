export const PAGE_POST_LIMIT = 3;

export const getEndPage = (totalCount: number) =>
  Math.ceil(totalCount / PAGE_POST_LIMIT);

export const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);
