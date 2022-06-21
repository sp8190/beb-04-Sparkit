require('dotenv').config();
const env = process.env;

declare var process : {
  env: {
    SPARK_IT_DB_USERNAME: string,
    SPARK_IT_DB_PASSWORD: string,
    SPARK_IT_DB_DATABASE: string,
    SPARK_IT_DB_ENDPOINT: string,
    SPARK_IT_DB_PORT: string
  }
}

export const config = {
  development: {
      username: process.env.SPARK_IT_DB_USERNAME,
      password: process.env.SPARK_IT_DB_PASSWORD,
      database: process.env.SPARK_IT_DB_DATABASE,
      host: process.env.SPARK_IT_DB_ENDPOINT,
      dialect: 'mysql',
      port: process.env.SPARK_IT_DB_PORT
  },
};