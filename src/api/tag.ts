import http from '@/utils/http';

export const reqFetchTags = (params: any) =>
  http({
    url: `/v1/tags`,
    method: 'GET',
    params
  });

export const reqStoreTag = (data: any) =>
  http({
    url: `/v1/tags`,
    method: 'POST',
    data
  });

export const reqDestroyTag = (id: number) =>
  http({
    url: `/v1/tags/${id}`,
    method: 'DELETE'
  });
