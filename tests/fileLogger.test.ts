import * as fs from 'fs';
import { FileLogger, FileLoggerOptions } from '../src/FileLogger';

jest.mock('fs', () => ({
    appendFileSync: jest.fn(),
    statSync: jest.fn().mockReturnValue({ size: 0 }),
    existsSync: jest.fn().mockReturnValue(true),
    writeFileSync: jest.fn(),
    mkDirSync: jest.fn(),
    renameSync: jest.fn()
}));

describe('FileLogger', () => {
    let logger: FileLogger;
    const options: FileLoggerOptions = {
        filePath: 'logs/test.log',
        logLevels: ['info', 'warning', 'error']
    };

    beforeEach(() => {
        jest.clearAllMocks();
        logger = new FileLogger(options);
    });

    afterEach(() => {
        jest.restoreAllMocks();
      });

    test('should write info messages to file', async () => {
        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
        await logger.logInfo('Test info message');
        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            expect.stringContaining('INFO: Test info message'),
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should write warning messages to the log file', async () => {
        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');
        await logger.logWarning('Test warning message');
        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            expect.stringContaining('WARNING: Test warning message\n'),
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should write error messages to the log file', async () => {
        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');
        await logger.logError('Test error message');
        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            expect.stringContaining('ERROR: Test error message'),
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should rotate the log file when maxFileSize is exceeded', async () => {
        const maxFileSize = 100;
        logger = new FileLogger({ ...options, maxFileSize });
        
        const statSyncMock = jest.spyOn(fs, 'statSync').mockReturnValue({ size: 200 } as fs.Stats);
        const renameSyncMock = jest.spyOn(fs, 'renameSync');
        const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');

        await logger.logInfo('Test message after rotation');
        
        expect(renameSyncMock).toHaveBeenCalled();
        expect(writeFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            '',
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should write new log entries to a new file after rotation', async () => {
        const maxFileSize = 100;
        logger = new FileLogger({ ...options, maxFileSize });

        jest.spyOn(fs, 'statSync').mockReturnValueOnce({ size: 200 } as fs.Stats);
        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');

        await logger.logInfo('New log entry');

        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            expect.stringContaining('INFO: New log entry'),
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should write messages for allowed log levels', async () => {
        logger = new FileLogger({ ...options, logLevels: ['info'] });

        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');

        await logger.logInfo('Info message');

        expect(appendFileSyncMock).toHaveBeenCalled();
    });

    test('should not write messages for disallowed log levels', async () => {
        logger = new FileLogger({ ...options, logLevels: ['error']});

        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');

        await logger.logInfo('Info message');

        expect(appendFileSyncMock).not.toHaveBeenCalled();
    });

    test('should handle errors during file writing', async () => {
        const errorMessage = 'Disk is full';
        jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {
            throw new Error(errorMessage);
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await logger.logInfo('Test message');

        expect(consoleErrorSpy).toHaveBeenCalledWith(`Failed to write log: ${errorMessage}`);
    });

    test('should handle errors during log rotation', async () => {
        const errorMessage = 'Permission denied';

        logger = new FileLogger({ ...options, maxFileSize: 100 });
        
        jest.spyOn(fs, 'statSync').mockReturnValue({ size: 200 } as fs.Stats);
        jest.spyOn(fs, 'renameSync').mockImplementation(() => {
            throw new Error(errorMessage);
        });

        // Ensure other fs methods do not throw errors
        jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {}); // Ensure append works
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});  // Ensure write works

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await logger.logInfo('Test message');

        expect(consoleErrorSpy).toHaveBeenCalledWith(`Failed to rotate log file: ${errorMessage}`);
    });

    test('should handle null messages gracefully', async () => {
        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');

        await logger.logInfo(null as any);

        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            expect.stringContaining('INFO: null'),
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should handle empty strings', async () => {
        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');

        await logger.logInfo('');

        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            expect.stringContaining('INFO: '),
            { encoding: options.encoding || 'utf8' }
        );
    });

    test('should use custom format function if provided', async () => {
        const customFormat = jest.fn().mockReturnValue('Custom formatted message');
        logger = new FileLogger({ ...options, format: customFormat });

        const appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');

        await logger.logInfo('Test message');

        expect(customFormat).toHaveBeenCalledWith('info', 'Test message');
        expect(appendFileSyncMock).toHaveBeenCalledWith(
            options.filePath,
            'Custom formatted message\n',
            { encoding: options.encoding || 'utf8' }
        );
    });
});