export const httpClient = <T>(clientConstructor: T) => {
  let httpClient: typeof clientConstructor | null = null;

  return {
    server: {
      init: () => {
        if (typeof window !== 'undefined')
          throw new Error('this method only allows in server runtime');

        httpClient = clientConstructor;
      },
      getHttpClient: () => {
        if (!httpClient) throw new Error('http client is not initiated');

        return httpClient;
      },
    },
    client: {
      init: () => clientConstructor,
    },
  };
};
