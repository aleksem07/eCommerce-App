type authMiddleware = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
  };
  scopes: string[];
  fetch: typeof fetch;
};

type httpMiddleware = {
  host: string;
  fetch: typeof fetch;
};

export { authMiddleware, httpMiddleware };
