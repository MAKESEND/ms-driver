import { customRender } from '~/test/test-utils';
import { ImageUploadPlaceholder } from './image-upload-placeholder';
import { fireEvent } from '@testing-library/react';

describe('ImageUploadPlaceholder', () => {
  test('should click to upload image', async () => {
    const onClickMock = jest.fn();

    const { findByRole } = customRender(
      <ImageUploadPlaceholder onClick={onClickMock} />
    );

    fireEvent.click(await findByRole('button'));

    expect(onClickMock).toBeCalled();
  });
});
