// mocking react native simple toast
jest.mock('react-native-simple-toast', () =>
  jest.fn(() => {
    show: jest.fn();
    showWithGravity: jest.fn();
  }),
);

// mocking axios
jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: {use: jest.fn(), eject: jest.fn()},
        response: {use: jest.fn(), eject: jest.fn()},
      },
    })),
  };
});
// mocking bootsplash
jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
