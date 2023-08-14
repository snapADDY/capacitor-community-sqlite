var capacitorCapacitorSQLite = (function (exports, core) {
    'use strict';

    //import { Capacitor } from '@capacitor/core';
    /**
     * SQLiteConnection Class
     */
    class SQLiteConnection {
        constructor(sqlite) {
            this.sqlite = sqlite;
            this._connectionDict = new Map();
        }
        async initWebStore() {
            try {
                await this.sqlite.initWebStore();
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async saveToStore(database) {
            try {
                await this.sqlite.saveToStore({ database });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async saveToLocalDisk(database) {
            try {
                await this.sqlite.saveToLocalDisk({ database });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getFromLocalDiskToStore(overwrite) {
            const mOverwrite = overwrite != null ? overwrite : true;
            try {
                await this.sqlite.getFromLocalDiskToStore({ overwrite: mOverwrite });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async echo(value) {
            try {
                const res = await this.sqlite.echo({ value });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isSecretStored() {
            try {
                const res = await this.sqlite.isSecretStored();
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async setEncryptionSecret(passphrase) {
            try {
                await this.sqlite.setEncryptionSecret({ passphrase: passphrase });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async changeEncryptionSecret(passphrase, oldpassphrase) {
            try {
                await this.sqlite.changeEncryptionSecret({
                    passphrase: passphrase,
                    oldpassphrase: oldpassphrase,
                });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async clearEncryptionSecret() {
            try {
                await this.sqlite.clearEncryptionSecret();
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async checkEncryptionSecret(passphrase) {
            try {
                const res = await this.sqlite.checkEncryptionSecret({
                    passphrase: passphrase,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async addUpgradeStatement(database, toVersion, statements) {
            const upgrade = {
                toVersion,
                statements,
            };
            try {
                if (database.endsWith('.db'))
                    database = database.slice(0, -3);
                await this.sqlite.addUpgradeStatement({
                    database,
                    upgrade: [upgrade],
                });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async createConnection(database, encrypted, mode, version, readonly) {
            try {
                if (database.endsWith('.db'))
                    database = database.slice(0, -3);
                await this.sqlite.createConnection({
                    database,
                    encrypted,
                    mode,
                    version,
                    readonly,
                });
                const conn = new SQLiteDBConnection(database, readonly, this.sqlite);
                const connName = readonly ? `RO_${database}` : `RW_${database}`;
                this._connectionDict.set(connName, conn);
                return Promise.resolve(conn);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async closeConnection(database, readonly) {
            try {
                if (database.endsWith('.db'))
                    database = database.slice(0, -3);
                await this.sqlite.closeConnection({ database, readonly });
                const connName = readonly ? `RO_${database}` : `RW_${database}`;
                this._connectionDict.delete(connName);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isConnection(database, readonly) {
            const res = {};
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            const connName = readonly ? `RO_${database}` : `RW_${database}`;
            res.result = this._connectionDict.has(connName);
            return Promise.resolve(res);
        }
        async retrieveConnection(database, readonly) {
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            const connName = readonly ? `RO_${database}` : `RW_${database}`;
            if (this._connectionDict.has(connName)) {
                const conn = this._connectionDict.get(connName);
                if (typeof conn != 'undefined')
                    return Promise.resolve(conn);
                else {
                    return Promise.reject(`Connection ${database} is undefined`);
                }
            }
            else {
                return Promise.reject(`Connection ${database} does not exist`);
            }
        }
        async getNCDatabasePath(path, database) {
            try {
                const databasePath = await this.sqlite.getNCDatabasePath({
                    path,
                    database,
                });
                return Promise.resolve(databasePath);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async createNCConnection(databasePath, version) {
            try {
                await this.sqlite.createNCConnection({
                    databasePath,
                    version,
                });
                const conn = new SQLiteDBConnection(databasePath, true, this.sqlite);
                const connName = `RO_${databasePath})`;
                this._connectionDict.set(connName, conn);
                return Promise.resolve(conn);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async closeNCConnection(databasePath) {
            try {
                await this.sqlite.closeNCConnection({ databasePath });
                const connName = `RO_${databasePath})`;
                this._connectionDict.delete(connName);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isNCConnection(databasePath) {
            const res = {};
            const connName = `RO_${databasePath})`;
            res.result = this._connectionDict.has(connName);
            return Promise.resolve(res);
        }
        async retrieveNCConnection(databasePath) {
            if (this._connectionDict.has(databasePath)) {
                const connName = `RO_${databasePath})`;
                const conn = this._connectionDict.get(connName);
                if (typeof conn != 'undefined')
                    return Promise.resolve(conn);
                else {
                    return Promise.reject(`Connection ${databasePath} is undefined`);
                }
            }
            else {
                return Promise.reject(`Connection ${databasePath} does not exist`);
            }
        }
        async isNCDatabase(databasePath) {
            try {
                const res = await this.sqlite.isNCDatabase({ databasePath });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async retrieveAllConnections() {
            return this._connectionDict;
        }
        async closeAllConnections() {
            const delDict = new Map();
            try {
                for (const key of this._connectionDict.keys()) {
                    const database = key.substring(3);
                    const readonly = key.substring(0, 3) === 'RO_' ? true : false;
                    await this.sqlite.closeConnection({ database, readonly });
                    delDict.set(key, null);
                }
                for (const key of delDict.keys()) {
                    this._connectionDict.delete(key);
                }
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async checkConnectionsConsistency() {
            try {
                const keys = [...this._connectionDict.keys()];
                const openModes = [];
                const dbNames = [];
                for (const key of keys) {
                    openModes.push(key.substring(0, 2));
                    dbNames.push(key.substring(3));
                }
                const res = await this.sqlite.checkConnectionsConsistency({
                    dbNames: dbNames,
                    openModes: openModes,
                });
                if (!res.result)
                    this._connectionDict = new Map();
                return Promise.resolve(res);
            }
            catch (err) {
                this._connectionDict = new Map();
                return Promise.reject(err);
            }
        }
        async importFromJson(jsonstring) {
            try {
                const ret = await this.sqlite.importFromJson({ jsonstring: jsonstring });
                return Promise.resolve(ret);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isJsonValid(jsonstring) {
            try {
                const ret = await this.sqlite.isJsonValid({ jsonstring: jsonstring });
                return Promise.resolve(ret);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async copyFromAssets(overwrite) {
            const mOverwrite = overwrite != null ? overwrite : true;
            try {
                await this.sqlite.copyFromAssets({ overwrite: mOverwrite });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getFromHTTPRequest(url, overwrite) {
            const mOverwrite = overwrite != null ? overwrite : true;
            try {
                await this.sqlite.getFromHTTPRequest({ url, overwrite: mOverwrite });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isDatabaseEncrypted(database) {
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            try {
                const res = await this.sqlite.isDatabaseEncrypted({ database: database });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isInConfigEncryption() {
            try {
                const res = await this.sqlite.isInConfigEncryption();
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isInConfigBiometricAuth() {
            try {
                const res = await this.sqlite.isInConfigBiometricAuth();
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isDatabase(database) {
            if (database.endsWith('.db'))
                database = database.slice(0, -3);
            try {
                const res = await this.sqlite.isDatabase({ database: database });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getDatabaseList() {
            try {
                const res = await this.sqlite.getDatabaseList();
                const values = res.values;
                values.sort();
                const ret = { values: values };
                return Promise.resolve(ret);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getMigratableDbList(folderPath) {
            if (!folderPath || folderPath.length === 0) {
                return Promise.reject('You must provide a folder path');
            }
            try {
                const res = await this.sqlite.getMigratableDbList({
                    folderPath: folderPath,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async addSQLiteSuffix(folderPath, dbNameList) {
            const path = folderPath ? folderPath : 'default';
            const dbList = dbNameList ? dbNameList : [];
            try {
                const res = await this.sqlite.addSQLiteSuffix({
                    folderPath: path,
                    dbNameList: dbList,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async deleteOldDatabases(folderPath, dbNameList) {
            const path = folderPath ? folderPath : 'default';
            const dbList = dbNameList ? dbNameList : [];
            try {
                const res = await this.sqlite.deleteOldDatabases({
                    folderPath: path,
                    dbNameList: dbList,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async moveDatabasesAndAddSuffix(folderPath, dbNameList) {
            const path = folderPath ? folderPath : 'default';
            const dbList = dbNameList ? dbNameList : [];
            return this.sqlite.moveDatabasesAndAddSuffix({
                folderPath: path,
                dbNameList: dbList,
            });
        }
    }
    /**
     * SQLiteDBConnection Class
     */
    class SQLiteDBConnection {
        constructor(dbName, readonly, sqlite) {
            this.dbName = dbName;
            this.readonly = readonly;
            this.sqlite = sqlite;
        }
        getConnectionDBName() {
            return this.dbName;
        }
        getConnectionReadOnly() {
            return this.readonly;
        }
        async open() {
            try {
                await this.sqlite.open({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async close() {
            try {
                await this.sqlite.close({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async loadExtension(path) {
            try {
                console.log(`database: ${this.dbName}`);
                console.log(`readonly: ${this.readonly}}`);
                console.log(`path: ${path}}`);
                await this.sqlite.loadExtension({
                    database: this.dbName,
                    path: path,
                    readonly: this.readonly,
                });
                console.log(`loadExtension successful`);
                return Promise.resolve();
            }
            catch (err) {
                console.log(`loadExtension failed `);
                return Promise.reject(err);
            }
        }
        async enableLoadExtension(toggle) {
            try {
                console.log(`database: ${this.dbName}`);
                console.log(`readonly: ${this.readonly}`);
                console.log(`toggle: ${toggle}`);
                await this.sqlite.enableLoadExtension({
                    database: this.dbName,
                    toggle: toggle,
                    readonly: this.readonly,
                });
                console.log(`enableLoadExtension successful`);
                return Promise.resolve();
            }
            catch (err) {
                console.log(err);
                console.log(`enableLoadExtension failed `);
                return Promise.reject(err);
            }
        }
        async getUrl() {
            try {
                const res = await this.sqlite.getUrl({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getVersion() {
            try {
                const version = await this.sqlite.getVersion({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve(version);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getTableList() {
            try {
                const res = await this.sqlite.getTableList({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async execute(statements, transaction = true) {
            try {
                if (!this.readonly) {
                    const res = await this.sqlite.execute({
                        database: this.dbName,
                        statements: statements,
                        transaction: transaction,
                        readonly: false,
                    });
                    return Promise.resolve(res);
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async query(statement, values) {
            let res;
            try {
                if (values && values.length > 0) {
                    res = await this.sqlite.query({
                        database: this.dbName,
                        statement: statement,
                        values: values,
                        readonly: this.readonly,
                    });
                }
                else {
                    res = await this.sqlite.query({
                        database: this.dbName,
                        statement: statement,
                        values: [],
                        readonly: this.readonly,
                    });
                }
                // reorder rows for ios
                res = await this.reorderRows(res);
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async run(statement, values, transaction = true, returnMode = 'no') {
            let res;
            try {
                if (!this.readonly) {
                    if (values && values.length > 0) {
                        const mRetMode = statement.toUpperCase().includes('RETURNING')
                            ? returnMode
                            : 'no';
                        res = await this.sqlite.run({
                            database: this.dbName,
                            statement: statement,
                            values: values,
                            transaction: transaction,
                            readonly: false,
                            returnMode: mRetMode,
                        });
                        //        }
                    }
                    else {
                        const mRetMode = statement.toUpperCase().includes('RETURNING')
                            ? returnMode
                            : 'no';
                        res = await this.sqlite.run({
                            database: this.dbName,
                            statement: statement,
                            values: [],
                            transaction: transaction,
                            readonly: false,
                            returnMode: mRetMode,
                        });
                    }
                    // reorder rows for ios
                    res.changes = await this.reorderRows(res.changes);
                    return Promise.resolve(res);
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async executeSet(set, transaction = true, returnMode = 'no') {
            let res;
            try {
                if (!this.readonly) {
                    res = await this.sqlite.executeSet({
                        database: this.dbName,
                        set: set,
                        transaction: transaction,
                        readonly: false,
                        returnMode: returnMode,
                    });
                    //      }
                    // reorder rows for ios
                    res.changes = await this.reorderRows(res.changes);
                    return Promise.resolve(res);
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isExists() {
            try {
                const res = await this.sqlite.isDBExists({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isTable(table) {
            try {
                const res = await this.sqlite.isTableExists({
                    database: this.dbName,
                    table: table,
                    readonly: this.readonly,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async isDBOpen() {
            try {
                const res = await this.sqlite.isDBOpen({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async delete() {
            try {
                if (!this.readonly) {
                    await this.sqlite.deleteDatabase({
                        database: this.dbName,
                        readonly: false,
                    });
                    return Promise.resolve();
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async createSyncTable() {
            try {
                if (!this.readonly) {
                    const res = await this.sqlite.createSyncTable({
                        database: this.dbName,
                        readonly: false,
                    });
                    return Promise.resolve(res);
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async setSyncDate(syncdate) {
            try {
                if (!this.readonly) {
                    await this.sqlite.setSyncDate({
                        database: this.dbName,
                        syncdate: syncdate,
                        readonly: false,
                    });
                    return Promise.resolve();
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async getSyncDate() {
            try {
                const res = await this.sqlite.getSyncDate({
                    database: this.dbName,
                    readonly: this.readonly,
                });
                let retDate = '';
                if (res.syncDate > 0)
                    retDate = new Date(res.syncDate * 1000).toISOString();
                return Promise.resolve(retDate);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async exportToJson(mode) {
            try {
                const res = await this.sqlite.exportToJson({
                    database: this.dbName,
                    jsonexportmode: mode,
                    readonly: this.readonly,
                });
                return Promise.resolve(res);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async deleteExportedRows() {
            try {
                if (!this.readonly) {
                    await this.sqlite.deleteExportedRows({
                        database: this.dbName,
                        readonly: false,
                    });
                    return Promise.resolve();
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        async executeTransaction(txn) {
            try {
                if (!this.readonly) {
                    const ret = await this.sqlite.execute({
                        database: this.dbName,
                        statements: 'BEGIN TRANSACTION;',
                        transaction: false,
                    });
                    if (ret.changes.changes < 0) {
                        return Promise.reject('Error in BEGIN TRANSACTION');
                    }
                    for (const task of txn) {
                        if (task.values && task.values.length > 0) {
                            const retMode = task.statement.toUpperCase().includes('RETURNING')
                                ? 'all'
                                : 'no';
                            const ret = await this.sqlite.run({
                                database: this.dbName,
                                statement: task.statement,
                                values: task.values,
                                transaction: false,
                                readonly: false,
                                returnMode: retMode,
                            });
                            if (ret.changes.lastId === -1) {
                                await this.execute('ROLLBACK;', false);
                                return Promise.reject('Error in transaction run ');
                            }
                        }
                        else {
                            const ret = await this.sqlite.execute({
                                database: this.dbName,
                                statements: task.statement,
                                transaction: false,
                                readonly: false,
                            });
                            if (ret.changes.changes < 0) {
                                await this.sqlite.execute({
                                    database: this.dbName,
                                    statements: 'ROLLBACK;',
                                    transaction: false,
                                    readonly: false,
                                });
                                return Promise.reject('Error in transaction execute ');
                            }
                        }
                    }
                    await this.sqlite.execute({
                        database: this.dbName,
                        statements: 'COMMIT;',
                        transaction: false,
                        readonly: false,
                    });
                    return Promise.resolve();
                }
                else {
                    return Promise.reject('not allowed in read-only mode');
                }
            }
            catch (err) {
                await this.sqlite.execute({
                    database: this.dbName,
                    statements: 'ROLLBACK;',
                    transaction: false,
                    readonly: false,
                });
                return Promise.reject(err);
            }
        }
        async reorderRows(res) {
            const retRes = res;
            if (res?.values && typeof res.values[0] === 'object') {
                if (Object.keys(res.values[0]).includes('ios_columns')) {
                    const columnList = res.values[0]['ios_columns'];
                    const iosRes = [];
                    for (let i = 1; i < res.values.length; i++) {
                        const rowJson = res.values[i];
                        const resRowJson = {};
                        for (const item of columnList) {
                            resRowJson[item] = rowJson[item];
                        }
                        iosRes.push(resRowJson);
                    }
                    retRes['values'] = iosRes;
                }
            }
            return Promise.resolve(retRes);
        }
    }

    const CapacitorSQLite = core.registerPlugin('CapacitorSQLite', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.CapacitorSQLiteWeb()),
        electron: () => window.CapacitorCustomPlatform.plugins.CapacitorSQLite,
    });

    class CapacitorSQLiteWeb extends core.WebPlugin {
        constructor() {
            super(...arguments);
            this.jeepSqliteElement = null;
            this.isWebStoreOpen = false;
        }
        async initWebStore() {
            await customElements.whenDefined('jeep-sqlite');
            this.jeepSqliteElement = document.querySelector('jeep-sqlite');
            this.ensureJeepSqliteIsAvailable();
            this.jeepSqliteElement.addEventListener('jeepSqliteImportProgress', (event) => {
                this.notifyListeners('sqliteImportProgressEvent', event.detail);
            });
            this.jeepSqliteElement.addEventListener('jeepSqliteExportProgress', (event) => {
                this.notifyListeners('sqliteExportProgressEvent', event.detail);
            });
            this.jeepSqliteElement.addEventListener('jeepSqliteHTTPRequestEnded', (event) => {
                this.notifyListeners('sqliteHTTPRequestEndedEvent', event.detail);
            });
            this.jeepSqliteElement.addEventListener('jeepSqlitePickDatabaseEnded', (event) => {
                this.notifyListeners('sqlitePickDatabaseEndedEvent', event.detail);
            });
            this.jeepSqliteElement.addEventListener('jeepSqliteSaveDatabaseToDisk', (event) => {
                this.notifyListeners('sqliteSaveDatabaseToDiskEvent', event.detail);
            });
            if (!this.isWebStoreOpen) {
                this.isWebStoreOpen = await this.jeepSqliteElement.isStoreOpen();
            }
            return;
        }
        async saveToStore(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.saveToStore(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async getFromLocalDiskToStore(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.getFromLocalDiskToStore(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async saveToLocalDisk(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.saveToLocalDisk(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async echo(options) {
            this.ensureJeepSqliteIsAvailable();
            const echoResult = await this.jeepSqliteElement.echo(options);
            return echoResult;
        }
        async createConnection(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.createConnection(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async open(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.open(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async closeConnection(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.closeConnection(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async getVersion(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const versionResult = await this.jeepSqliteElement.getVersion(options);
                return versionResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async checkConnectionsConsistency(options) {
            this.ensureJeepSqliteIsAvailable();
            try {
                const consistencyResult = await this.jeepSqliteElement.checkConnectionsConsistency(options);
                return consistencyResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async close(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.close(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async getTableList(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const tableListResult = await this.jeepSqliteElement.getTableList(options);
                return tableListResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async execute(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const executeResult = await this.jeepSqliteElement.execute(options);
                return executeResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async executeSet(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const executeResult = await this.jeepSqliteElement.executeSet(options);
                return executeResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async run(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const runResult = await this.jeepSqliteElement.run(options);
                return runResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async query(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const queryResult = await this.jeepSqliteElement.query(options);
                return queryResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async isDBExists(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const dbExistsResult = await this.jeepSqliteElement.isDBExists(options);
                return dbExistsResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async isDBOpen(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const isDBOpenResult = await this.jeepSqliteElement.isDBOpen(options);
                return isDBOpenResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async isDatabase(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const isDatabaseResult = await this.jeepSqliteElement.isDatabase(options);
                return isDatabaseResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async isTableExists(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const tableExistsResult = await this.jeepSqliteElement.isTableExists(options);
                return tableExistsResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async deleteDatabase(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.deleteDatabase(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async isJsonValid(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const isJsonValidResult = await this.jeepSqliteElement.isJsonValid(options);
                return isJsonValidResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async importFromJson(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const importFromJsonResult = await this.jeepSqliteElement.importFromJson(options);
                return importFromJsonResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async exportToJson(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const exportToJsonResult = await this.jeepSqliteElement.exportToJson(options);
                return exportToJsonResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async createSyncTable(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const createSyncTableResult = await this.jeepSqliteElement.createSyncTable(options);
                return createSyncTableResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async setSyncDate(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.setSyncDate(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async getSyncDate(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const getSyncDateResult = await this.jeepSqliteElement.getSyncDate(options);
                return getSyncDateResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async deleteExportedRows(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.deleteExportedRows(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async addUpgradeStatement(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.addUpgradeStatement(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async copyFromAssets(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.copyFromAssets(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async getFromHTTPRequest(options) {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                await this.jeepSqliteElement.getFromHTTPRequest(options);
                return;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        async getDatabaseList() {
            this.ensureJeepSqliteIsAvailable();
            this.ensureWebstoreIsOpen();
            try {
                const databaseListResult = await this.jeepSqliteElement.getDatabaseList();
                return databaseListResult;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        }
        /**
         * Checks if the `jeep-sqlite` element is present in the DOM.
         * If it's not in the DOM, this method throws an Error.
         *
         * Attention: This will always fail, if the `intWebStore()` method wasn't called before.
         */
        ensureJeepSqliteIsAvailable() {
            if (this.jeepSqliteElement === null) {
                throw new Error(`The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.`);
            }
        }
        ensureWebstoreIsOpen() {
            if (!this.isWebStoreOpen) {
                /**
                 * if (!this.isWebStoreOpen)
                  this.isWebStoreOpen = await this.jeepSqliteElement.isStoreOpen();
                 */
                throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.');
            }
        }
        ////////////////////////////////////
        ////// UNIMPLEMENTED METHODS
        ////////////////////////////////////
        async getUrl() {
            throw this.unimplemented('Not implemented on web.');
        }
        async getMigratableDbList(options) {
            console.log('getMigratableDbList', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async addSQLiteSuffix(options) {
            console.log('addSQLiteSuffix', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async deleteOldDatabases(options) {
            console.log('deleteOldDatabases', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async moveDatabasesAndAddSuffix(options) {
            console.log('moveDatabasesAndAddSuffix', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async isSecretStored() {
            throw this.unimplemented('Not implemented on web.');
        }
        async setEncryptionSecret(options) {
            console.log('setEncryptionSecret', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async changeEncryptionSecret(options) {
            console.log('changeEncryptionSecret', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async clearEncryptionSecret() {
            console.log('clearEncryptionSecret');
            throw this.unimplemented('Not implemented on web.');
        }
        async checkEncryptionSecret(options) {
            console.log('checkEncryptionPassPhrase', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async getNCDatabasePath(options) {
            console.log('getNCDatabasePath', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async createNCConnection(options) {
            console.log('createNCConnection', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async closeNCConnection(options) {
            console.log('closeNCConnection', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async isNCDatabase(options) {
            console.log('isNCDatabase', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async isDatabaseEncrypted(options) {
            console.log('isDatabaseEncrypted', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async isInConfigEncryption() {
            throw this.unimplemented('Not implemented on web.');
        }
        async isInConfigBiometricAuth() {
            throw this.unimplemented('Not implemented on web.');
        }
        async loadExtension(options) {
            console.log('loadExtension', options);
            throw this.unimplemented('Not implemented on web.');
        }
        async enableLoadExtension(options) {
            console.log('enableLoadExtension', options);
            throw this.unimplemented('Not implemented on web.');
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CapacitorSQLiteWeb: CapacitorSQLiteWeb
    });

    exports.CapacitorSQLite = CapacitorSQLite;
    exports.SQLiteConnection = SQLiteConnection;
    exports.SQLiteDBConnection = SQLiteDBConnection;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
