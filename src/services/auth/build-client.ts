import { ClientBuilder } from "@commercetools/sdk-client-v2";

const URI = {
  GET_ALL_CUSTOMERS: "/random-team-19/customers",
  GET_EMAIL_CUSTOMER: (email: string) => `/random-team-19/customers?where=email%3D%22${email}%22`,
};

const projectKey = process.env.CTP_PROJECT_KEY;
const scopes = [process.env.CTP_SCOPES];
const authUrl = process.env.CTP_AUTH_URL;
const apiUrl = process.env.CTP_API_URL;
const adminID = process.env.CTP_ADMIN_ID;
const adminSecret = process.env.CTP_ADMIN_SECRET;

const authMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: adminID,
    clientSecret: adminSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions = {
  host: apiUrl,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

async function getUser(uri: string) {
  const { body } = await ctpClient.execute({
    method: "GET",
    uri: uri,
  });
  const user = body.results;
  return user;
}

getUser(URI.GET_ALL_CUSTOMERS);
