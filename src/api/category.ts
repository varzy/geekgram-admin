import http from '@/utils/http';

export const reqFetchCategories = () =>
  http({
    url: `/v1/categories`,
    method: 'GET'
  });
