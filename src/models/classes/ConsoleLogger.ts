import { ILogger } from "../interfaces/ILogger";

/** Logger which outputs to the browser console */
export class ConsoleLogger implements ILogger {
    log(message?: any, ...optionalParams: any[]): void {
      console.log(message, ...optionalParams);
    }
  
    warn(message?: any, ...optionalParams: any[]): void {
      console.warn(message, ...optionalParams);
    }
  
    error(message?: any, ...optionalParams: any[]): void {
      console.error(message, ...optionalParams);
    }
  }