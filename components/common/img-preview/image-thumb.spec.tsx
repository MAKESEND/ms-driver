import { mockFn } from 'jest-mock-extended';
import { act, fireEvent } from '@testing-library/react';

import { customRender } from '~/test/test-utils';
import ImageThumb from './image-thumb';

import { blobToBase64 } from '~/utils/img-processor';
import { ToastActionTypes, useToast } from '~/providers/toast-provider';

const blobToBase64Mock = blobToBase64 as jest.Mock;
jest.mock('~/utils/img-processor', () => ({
  blobToBase64: jest.fn(),
}));

const useToastMock = useToast as jest.Mock;
jest.mock('~/providers/toast-provider', () => ({
  ...jest.requireActual('~/providers/toast-provider'),
  useToast: mockFn().mockReturnValue({ dispatch: jest.fn() }),
}));

describe('ImageThumb', () => {
  const fileName = 'hello.png';
  const imgMock = new File([''], fileName);
  const setImageMock = jest.fn((callback) => callback([]));
  const serializedImg = 'data:png/base64';

  test('should render image with based64', async () => {
    blobToBase64Mock.mockResolvedValue(serializedImg);
    const { findByRole } = customRender(
      <ImageThumb image={imgMock} setImages={setImageMock} />
    );

    const image = await findByRole('img');

    expect(blobToBase64Mock).toBeCalledWith(imgMock);
    expect(image).toHaveAttribute('alt', fileName);
    expect(image).toHaveAttribute('src', serializedImg);
  });

  test('should remove image', async () => {
    blobToBase64Mock.mockResolvedValue(serializedImg);
    const { findByRole } = customRender(
      <ImageThumb image={imgMock} setImages={setImageMock} index={0} />
    );

    fireEvent.click(await findByRole('button'));

    expect(setImageMock).toBeCalled();
  });

  test('should fail on encoding and show toast message', async () => {
    const error = new Error('encoding failed');
    const handleToastMock = jest.fn();
    useToastMock.mockReturnValue({ dispatch: handleToastMock });
    blobToBase64Mock.mockRejectedValue(error);

    await act(async () => {
      customRender(<ImageThumb image={imgMock} setImages={setImageMock} />);
    });

    expect(handleToastMock).toBeCalledWith({
      type: ToastActionTypes.OpenToast,
      payload: {
        header: 'failed to load image',
        content: error.message,
        severity: 'error',
      },
    });
  });
});
