import http from '@/utils/http';

export const reqFetchPosts = (params: any) =>
  http({
    url: `/v1/posts`,
    method: 'GET',
    params
  });

export const reqShowPost = (id: number, params: any) =>
  http({
    url: `/v1/posts/${id}`,
    method: 'GET',
    params
  });

export const reqDestroyPost = (id: number) =>
  http({
    url: `/v1/posts/${id}`,
    method: 'DELETE'
  });
