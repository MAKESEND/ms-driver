import { renderHook, waitFor } from '@testing-library/react';
import { useVideoDevices } from './use-video-devices';

describe('use video devices hook', () => {
  test('should return devices', async () => {
    const mockDevices = [{ kind: 'videoinput' }] as any;
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        enumerateDevices: jest.fn().mockResolvedValue(mockDevices),
      },
    });

    const { result } = renderHook(() => useVideoDevices());

    await waitFor(() => expect(result.current).toEqual(mockDevices));
  });
});
