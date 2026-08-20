import { PostSortBy, SortDirection } from '@project/types';

export const POST_DEFAULT_LIMIT = 25;
export const POST_DEFAULT_PAGE = 1;
export const POST_DEFAULT_SORT_BY = PostSortBy.CreatedAt;
export const POST_DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const POST_MAX_LIMIT = 100;

export const POST_EXISTS = 'Post already exists';
export const POST_NOT_FOUND = 'Post not found';
export const POST_PAYLOAD_IS_NOT_OBJECT = 'Post payload must be an object';
export const POST_TYPE_IS_INVALID = 'Post type is invalid';

export const STARTS_WITH_LETTER_REGEXP = /^\p{L}/u;
