export default ({ env }) => ({
    host: env('HOST_URL', '0.0.0.0'),
    proxy: true,
    app: {
      keys: env.array('APP_KEYS'),
    },
  });