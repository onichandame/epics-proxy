declare module 'epics'{
  export type State={
    ECA_NORMAL: 1;
    ECA_TIMEOUT: 80;
    ECA_IODONE: 339;
    ECA_ISATTACHED: 424;
    OP_CONN_UP: 6;
    OP_CONN_DOWN: 7;
    CS_NEVER_CONN: 0;
    CS_PREV_CONN: 1;
    CS_CONN: 2;
    CS_CLOSED: 3;
    CS_NEVER_SEARCH: 4;
  }

  type Option={
    timeout?: number;
    fieldType?: string;
  }
  export type Data = number | string
  export class Channel {
    constructor (pvName: string)
    public state(): State
    public connected(): boolean
    public connect(options?: Option, callback?: (err?: Error) => void): Channel
    public connect(callback?: (err?: Error) => void): Channel
    public disconnect(callback?: (err?: Error) => void): void
    public get(options?: Option, callback?: (err?: Error, data?: Data) => void): Channel
    public get(callback?: (err?: Error, data?: Data) => void): Channel
    public monitor(options?: Option): Channel
    public put(value?: Data, callback?: (err?: Error) => void): void
    public put(callback?: (err?: Error) => void): void
    public on(event: string, callback: (data: Data) => void): void
  }
}
