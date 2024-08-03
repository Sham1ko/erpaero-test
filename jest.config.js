module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/utils/setupTestDB.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
