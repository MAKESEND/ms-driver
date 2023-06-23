// enabling chaining methods with IoC
export const httpClient = <T>(clientConstructor: T) => {
  let httpClient: T | null = null;

  return {
    server: {
      init: () => {
        if (typeof window !== 'undefined')
          throw new Error('this method only allows in server runtime');

        httpClient = clientConstructor;
        return httpClient;
      },
    },
    client: {
      init: () => {
        httpClient = clientConstructor;
        return httpClient;
      },
    },
  };
};
