interface User {
  name: string;
}

export declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
