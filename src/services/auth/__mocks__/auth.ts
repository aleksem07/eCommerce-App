const AuthMock = jest.fn().mockImplementation(() => {
  return {
    retrieveToken: jest.fn().mockImplementation(() => "mocked-token"),
  };
});

export default AuthMock;
