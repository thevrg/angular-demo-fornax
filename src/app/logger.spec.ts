import { Logger, LogManager, defaultLoggerProvider } from './logger';

describe('Logger', () => {
  it('should create an instance', () => {
    expect(new Logger(null, 'myLogger')).toBeTruthy();
  });
});

describe('LogManager', () => {
  it('should create an instance with parameterless constructor', () => {
    const logManager = new LogManager();
    expect(logManager).toEqual(jasmine.any(LogManager));
  });

  describe('When created with spied logger map', () => {
    let loggerMap: Map<string, Logger>;
    let lastCreatedLogger: Logger;
    let logManager: LogManager;
    const loggerProvider = (parentLogger: Logger, name: string) => {
      const logger = defaultLoggerProvider(parentLogger, name);
      lastCreatedLogger = logger;
      return logger;
    };

    beforeEach(() => {
      loggerMap = new Map();
      lastCreatedLogger = null;
      logManager = new LogManager(loggerMap, loggerProvider);
    });

    it('should create the root logger on creating it', () => {
      expect(lastCreatedLogger).toBeTruthy();
    });
    it('should name the root logger as an empty string', () => {
      expect(lastCreatedLogger.name).toBe('');
    });
  });
});
