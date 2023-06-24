import { customRender } from '~/test/test-utils';
import AddImage from './add-image';
import { fireEvent } from '@testing-library/react';

describe('AddImage', () => {
  test('should click on the button', async () => {
    const callbackMock = jest.fn();

    const { findByRole } = customRender(<AddImage onClick={callbackMock} />);

    fireEvent.click(await findByRole('button'));

    expect(callbackMock).toBeCalled();
  });
});
