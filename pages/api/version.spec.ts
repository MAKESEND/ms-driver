import axios from 'axios';

const path = '/api/version';

describe(`${path}`, () => {
  test('get app version', async () => {
    const { data } = await axios(path);

    expect(data.version).toBe('version');
  });
});
