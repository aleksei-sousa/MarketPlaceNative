import 'dotenv/config';

export default {
  expo: {
    scheme: "seuapp",
    name: 'SeuApp',
    slug: 'seu-app',
    version: '1.0.0',
    newArchEnabled: true,
    extra: {
      DATA_BASE_URL: process.env.DATA_BASE_URL,
    },
  },
};
