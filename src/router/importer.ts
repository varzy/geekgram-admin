export default process.env.NODE_ENV === 'development'
  ? (path: string) => require(`@/views/${path}.vue`).default
  : (path: string) => () => import(`@/views/${path}.vue`);
