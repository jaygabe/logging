import { ConsoleLogger } from '../src/ConsoleLogger';

describe('ConsoleLogger', () => {
    let logger: ConsoleLogger;

    beforeEach(() => {
        logger = new ConsoleLogger();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should log info messages', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        logger.logInfo("Test info message");
        expect(consoleLogSpy).toHaveBeenCalledWith('INFO: Test info message');
    });

    test('should log warning messages', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        logger.logWarning('Test warning message');
        expect(consoleWarnSpy).toHaveBeenCalledWith('WARNING: Test warning message');
    });

    test('should log error messages', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        logger.logError('Test error message');
        expect(consoleErrorSpy).toHaveBeenCalledWith('ERROR: Test error message');
    });

    test('should log info messages asynchronously', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await logger.logInfo('Async test message');
        expect(consoleLogSpy).toHaveBeenCalledWith('INFO: Async test message');
    });

    test('should handle null messages gracefully', () => {
        const ConsoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        logger.logInfo(null as any);
        expect(ConsoleLogSpy).toHaveBeenCalledWith('INFO: null');
    });
});