import { setupServer } from 'msw/node';
import { handlers } from '~/mocks/handler';

export default setupServer(...handlers);
