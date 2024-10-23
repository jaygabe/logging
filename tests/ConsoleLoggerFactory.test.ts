import { ConsoleLoggerFactory } from '../src/ConsoleLoggerFactory';
import { ConsoleLogger } from '../src/ConsoleLogger';
import { Logger } from '../src/Logger';

describe('ConsoleLoggerFactory', () => {
    test('should create a ConsoleLogger instance', () => {
        const factory = new ConsoleLoggerFactory();
        const logger = factory.createLogger();
        expect(logger).toBeInstanceOf(ConsoleLogger);
    });

    test('created logger should implement Logger interface', () => {
        const factory = new ConsoleLoggerFactory();
        const logger = factory.createLogger();
        expect(typeof logger.logInfo).toBe('function');
        expect(typeof logger.logWarning).toBe('function');
        expect(typeof logger.logError).toBe('function');
    });
});