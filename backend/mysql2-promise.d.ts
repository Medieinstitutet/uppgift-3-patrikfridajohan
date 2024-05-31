import { Connection, ConnectionOptions } from 'mysql2';

declare module 'mysql2/promise' {
    import { Connection, ConnectionOptions } from 'mysql2';

    interface MySQLPromise extends Connection {
        execute: (...args: any[]) => any;
        query: (...args: any[]) => any;
    }

    export function createConnection(options: ConnectionOptions): MySQLPromise;
}
