declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RDS_DB_SECRET_ID?: string;
      PORT?: string;
      RDS_DB_NAME?: string;
      RDS_DB_HOST?: string;
    }
  }
}

export {};
