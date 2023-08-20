module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*))',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
