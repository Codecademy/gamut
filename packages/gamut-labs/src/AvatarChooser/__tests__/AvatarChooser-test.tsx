import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { AvatarChooser } from '..';

const testImageSource = 'testImageSource';
const renderView = setupRtl(AvatarChooser, {
  src: testImageSource,
});

const mockAvatarImageFile = new File(['fileBlob'], 'profileImage.png', {
  type: 'image/png',
});

global.URL.createObjectURL = jest.fn();

describe('AvatarChooser', () => {
  it('Renders "Choose Photo"', () => {
    const { view } = renderView();
    view.getByText('Choose Photo');
  });

  it('Renders image default src', () => {
    const { view } = renderView();
    const img = view.getByRole('img') as HTMLImageElement;
    expect(img.src).toMatch(testImageSource);
  });

  it('Renders image alt text', () => {
    const { view } = renderView();
    const img = view.getByRole('img') as HTMLImageElement;
    expect(img.alt).toBe('Avatar Photo');
  });

  it('Renders error', () => {
    const error = 'This is a test error!';
    const { view } = renderView({ error });
    view.getByText(error);
  });

  it('Calls onImageChanged with the uploaded image', () => {
    const onImageChanged = jest.fn();
    const { view } = renderView({ onImageChanged });

    userEvent.upload(
      view.getByLabelText('Choose Photo') as HTMLInputElement,
      mockAvatarImageFile
    );

    const fileList: FileList = onImageChanged.mock.calls[0][0];
    expect(fileList[0]).toBe(mockAvatarImageFile);
  });

  it('Updates the img src when an image is uploaded', () => {
    const uploadedImageUrl = 'uploadedImageUrl';
    global.URL.createObjectURL = jest
      .fn()
      .mockImplementation(() => uploadedImageUrl);
    const { view } = renderView();

    userEvent.upload(
      view.getByLabelText('Choose Photo') as HTMLInputElement,
      mockAvatarImageFile
    );

    const img = view.getByRole('img') as HTMLImageElement;
    expect(global.URL.createObjectURL).toBeCalledWith(mockAvatarImageFile);
    expect(img.src).toMatch(uploadedImageUrl);
  });
});
