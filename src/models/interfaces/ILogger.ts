import { ILogFn } from "./ILogFn";

export interface ILogger {
    log: ILogFn;
    warn: ILogFn;
    error: ILogFn;
  }