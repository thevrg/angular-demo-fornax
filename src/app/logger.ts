const defaultLoggerProvider = (parent: Logger, name: string) => {
    return new Logger(parent, name);
};

export class LogManager {

    constructor(readonly loggerMap = new Map<string, Logger>(), private loggerProvider = defaultLoggerProvider) {
    }

     getLogger(name: string): Logger {
         let logger = this.loggerMap[name];
         if (logger) {
             return logger;
         }
         const parsed = this.parseName(name);
         let parentLogger: Logger = null;
         if (parsed.parentName) {
             parentLogger = this.getLogger(parsed.parentName);
         }
         logger = this.loggerProvider(parentLogger, parsed.name);
         return logger;
    }

    parseName(name: string): {name: string, parentName: string} {
        const lastDotPosition = name.lastIndexOf('.');
        if (lastDotPosition < 0) {
            return {name: name, parentName: null};
        } else {
            return {name: name.substr(lastDotPosition + 1), parentName: name.substring(0, lastDotPosition)};
        }
    }


}

enum LogLevel {
    SEVERE = 1000,
    WARNING = 900,
    INFO = 800,
    CONFIG = 700,
    FINE = 500,
    FINER = 400,
    FINEST = 300,
    ALL = 0
}

export interface LogHandler {
    handleLogMessage(level: LogLevel, message: string, timestamp: Date, exception: any);
}

export class Logger {

    private _level: LogLevel = null;
    private _handlers: LogHandler[] = [];

    constructor(readonly parent: Logger, readonly name: string) {
        if (this.parent === null) {
            this._level = LogLevel.INFO;
        }
    }

    set level(level: LogLevel) {
        this._level = level;
    }

    get level() {
        if (this._level !== null || this.parent === null) {
            return this._level;
        } else {
            return this.parent.level;
        }
    }

    addHandler(handler: LogHandler) {
        this._handlers.push(handler);
    }

    handleMessage(level: LogLevel, message: string, exception: any) {
        this._handlers.forEach(handler =>  handler.handleLogMessage(level, message, new Date(), exception));
        console.log(`${level}: ${message}`);
    }

    log(level: LogLevel, message: string, exception?: object): void {
        if (this.level <= level) {
            this.handleMessage(level, message, exception);
        }
    }

    logp(level: LogLevel, messageProvider: (() => string)): void {
        if (this.level <= level) {
            this.handleMessage(level, messageProvider(), null);
        }
    }
}
