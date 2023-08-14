'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('node:fs/promises');
var require$$1 = require('path');
var require$$2 = require('fs');
var require$$3 = require('node-fetch');
var require$$4 = require('os');
var require$$5 = require('jszip');
var require$$6 = require('electron');
var require$$3$1 = require('better-sqlite3-multiple-ciphers');
var require$$3$2 = require('electron-json-storage');
var require$$1$1 = require('crypto');
var require$$2$1 = require('crypto-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
var require$$5__default = /*#__PURE__*/_interopDefaultLegacy(require$$5);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var require$$3__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$3$1);
var require$$3__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$3$2);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
var require$$2__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$2$1);

var src = {};

var GlobalSQLite$1 = {};

Object.defineProperty(GlobalSQLite$1, "__esModule", { value: true });
GlobalSQLite$1.GlobalSQLite = void 0;
class GlobalSQLite {
    constructor() {
        this.secret = 'sqlite secret';
        this.newsecret = 'sqlite new secret';
    }
}
GlobalSQLite$1.GlobalSQLite = GlobalSQLite;

var Database$1 = {};

var exportToJson = {};

var utilsSQLite = {};

var utilsDelete = {};

Object.defineProperty(utilsDelete, "__esModule", { value: true });
utilsDelete.UtilsDelete = void 0;
class UtilsDeleteError {
    constructor(message) {
        this.message = message;
    }
    static upDateWhereForDefault(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForRestrict(message) {
        return new UtilsDeleteError(message);
    }
    static upDateWhereForCascade(message) {
        return new UtilsDeleteError(message);
    }
    static executeUpdateForDelete(message) {
        return new UtilsDeleteError(message);
    }
}
class UtilsDelete {
    getReferencedTableName(refValue) {
        let tableName = '';
        if (refValue.length > 0) {
            const arr = refValue.split(new RegExp('REFERENCES', 'i'));
            if (arr.length === 2) {
                const oPar = arr[1].indexOf("(");
                tableName = arr[1].substring(0, oPar).trim();
            }
        }
        return tableName;
    }
    upDateWhereForDefault(withRefsNames, results) {
        let setStmt = '';
        let uWhereStmt = '';
        try {
            const key = results.key;
            const cols = [];
            for (const relItem of results.relatedItems) {
                const mVal = relItem[key];
                if (mVal !== undefined) {
                    cols.push(mVal);
                }
            }
            // Create the set statement
            for (const name of withRefsNames) {
                setStmt += `${name} = NULL, `;
            }
            setStmt += 'sql_deleted = 0';
            // Create the where statement
            uWhereStmt = `WHERE ${key} IN (`;
            for (const col of cols) {
                uWhereStmt += `${col},`;
            }
            if (uWhereStmt.endsWith(',')) {
                uWhereStmt = uWhereStmt.slice(0, -1);
            }
            uWhereStmt += ');';
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForDefault(msg);
        }
        return { setStmt, uWhereStmt };
    }
    upDateWhereForRestrict(results) {
        try {
            const setStmt = '';
            const uWhereStmt = '';
            if (results.relatedItems.length > 0) {
                const msg = 'Restrict mode related items exist, please delete them first';
                throw UtilsDeleteError.upDateWhereForRestrict(msg);
            }
            return { setStmt, uWhereStmt };
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForRestrict(msg);
        }
    }
    upDateWhereForCascade(results) {
        let setStmt = '';
        let uWhereStmt = '';
        try {
            const key = results.key;
            const cols = [];
            for (const relItem of results.relatedItems) {
                const mVal = relItem[key];
                if (mVal !== undefined) {
                    cols.push(mVal);
                }
            }
            setStmt += 'sql_deleted = 1';
            // Create the where statement
            uWhereStmt = `WHERE ${key} IN (`;
            for (const col of cols) {
                uWhereStmt += `${col},`;
            }
            if (uWhereStmt.endsWith(',')) {
                uWhereStmt = uWhereStmt.slice(0, -1);
            }
            uWhereStmt += ');';
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw UtilsDeleteError.upDateWhereForCascade(msg);
        }
        return { setStmt, uWhereStmt };
    }
    getCurrentTimeAsInteger() {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime;
    }
    checkValuesMatch(array1, array2) {
        for (const value of array1) {
            if (!array2.includes(value)) {
                return false;
            }
        }
        return true;
    }
}
utilsDelete.UtilsDelete = UtilsDelete;

var utilsFile = {};

Object.defineProperty(utilsFile, "__esModule", { value: true });
utilsFile.UtilsFile = void 0;
const promises_1 = require$$0__default["default"];
class UtilsFile {
    constructor() {
        this.pathDB = 'Databases';
        this.Path = null;
        this.NodeFs = null;
        this.NodeFetch = null;
        this.JSZip = null;
        this.Os = null;
        this.Electron = null;
        this.AppName = '';
        this.HomeDir = '';
        this.sep = '/';
        this.isEncryption = false;
        this.Path = require$$1__default["default"];
        this.NodeFs = require$$2__default["default"];
        this.NodeFetch = require$$3__default["default"];
        this.Os = require$$4__default["default"];
        this.JSZip = require$$5__default["default"];
        this.Electron = require$$6__default["default"];
        this.HomeDir = this.Os.homedir();
        const dir = __dirname;
        const idx = dir.indexOf('\\');
        if (idx != -1)
            this.sep = '\\';
        this.appPath = this.Electron.app.getAppPath();
        const rawdata = this.NodeFs.readFileSync(this.Path.resolve(this.appPath, 'package.json'));
        this.AppName = JSON.parse(rawdata).name;
        const pathToBuild = this.Path.join(this.appPath, 'build');
        if (this.NodeFs.existsSync(this.Path.join(pathToBuild, 'capacitor.config.js'))) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            this.capConfig = require(this.Path.join(pathToBuild, 'capacitor.config.js')).default;
        }
        else {
            this.capConfig = JSON.parse(this.NodeFs.readFileSync(this.Path.join(this.appPath, 'capacitor.config.json')).toString());
        }
        this.isEncryption = this.capConfig.plugins.CapacitorSQLite
            .electronIsEncryption
            ? this.capConfig.plugins.CapacitorSQLite.electronIsEncryption
            : false;
        this.osType = this.Os.type();
        switch (this.osType) {
            case 'Darwin':
                this.pathDB = this.capConfig.plugins.CapacitorSQLite.electronMacLocation
                    ? this.capConfig.plugins.CapacitorSQLite.electronMacLocation
                    : 'Databases';
                break;
            case 'Linux':
                this.pathDB = this.capConfig.plugins.CapacitorSQLite
                    .electronLinuxLocation
                    ? this.capConfig.plugins.CapacitorSQLite.electronLinuxLocation
                    : 'Databases';
                break;
            case 'Windows_NT':
                this.pathDB = this.capConfig.plugins.CapacitorSQLite
                    .electronWindowsLocation
                    ? this.capConfig.plugins.CapacitorSQLite.electronWindowsLocation
                    : 'Databases';
                break;
            default:
                console.log('other operating system');
        }
    }
    /**
     * Get isEncryption from config
     * @returns
     */
    getIsEncryption() {
        return this.isEncryption;
    }
    /**
     * GetExtName
     * @param filePath
     * @returns
     */
    getExtName(filePath) {
        return this.Path.extname(filePath);
    }
    getBaseName(filePath) {
        return this.Path.basename(filePath, this.Path.extname(filePath));
    }
    /**
     * IsPathExists
     * @param filePath
     */
    isPathExists(filePath) {
        let ret = false;
        try {
            if (this.NodeFs.existsSync(filePath)) {
                ret = true;
            }
        }
        catch (err) {
            console.error('Error isFileExist: ' + err);
            ret = false;
        }
        return ret;
    }
    /**
     * IsFileExists
     * @param fileName
     */
    isFileExists(fileName) {
        let ret = false;
        const filePath = this.getFilePath(fileName);
        if (filePath.length > 0) {
            ret = this.isPathExists(filePath);
        }
        return ret;
    }
    /**
     * GetFilePath
     * get the file path
     * @param fileName
     */
    getFilePath(fileName) {
        return this.Path.join(this.getDatabasesPath(), fileName);
    }
    /**
     * GetDatabasesPath
     * get the database folder path
     */
    getDatabasesPath() {
        let retPath = '';
        const sep = this.Path.sep;
        const dbFolder = this.pathDB;
        if (dbFolder.includes(sep)) {
            retPath = dbFolder;
            if (this.Path.basename(dbFolder) !== this.AppName) {
                retPath = this.Path.join(dbFolder, this.AppName);
            }
        }
        else {
            retPath = this.Path.join(this.HomeDir, dbFolder, this.AppName);
        }
        const retB = this._createFolderIfNotExists(retPath);
        if (!retB)
            retPath = '';
        return retPath;
    }
    /**
     * GetCachePath
     * get the database cache folder path
     */
    getCachePath() {
        let retPath = '';
        const databasePath = this.getDatabasesPath();
        retPath = this.Path.join(databasePath, 'cache');
        const retB = this._createFolderIfNotExists(retPath);
        if (!retB)
            retPath = '';
        return retPath;
    }
    /**
     * GetAssetsDatabasesPath
     * get the assets databases folder path
     */
    getAssetsDatabasesPath() {
        let retPath = '';
        const webDir = this.capConfig.webDir;
        const dir = webDir === 'www' ? 'src' : 'public';
        let mAppPath = this.appPath;
        if (this.Path.basename(this.appPath) === 'electron') {
            mAppPath = this.Path.dirname(this.appPath);
        }
        retPath = this.Path.resolve(mAppPath, dir, 'assets', 'databases');
        return retPath;
    }
    /**
     * SetPathSuffix
     * @param db
     */
    setPathSuffix(db) {
        let toDb = db;
        const ext = '.db';
        const dirName = this.Path.dirname(db);
        const baseName = this.getBaseName(db);
        if (this.getExtName(db) === ext) {
            if (!baseName.includes('SQLite')) {
                const dbName = `${baseName}SQLite`;
                toDb = `${this.Path.join(dirName, dbName)}${ext}`;
            }
        }
        return toDb;
    }
    /**
     * GetFileList
     * get the file list for a given folder
     * @param path
     */
    async getFileList(path) {
        const filenames = this.NodeFs.readdirSync(path);
        const dbs = [];
        filenames.forEach((file) => {
            if (this.getExtName(file) == '.db' || this.getExtName(file) == '.zip')
                dbs.push(file);
        });
        return Promise.resolve(dbs);
    }
    /**
     * CopyFromAssetToDatabase
     * @param db
     * @param overwrite
     */
    async copyFromAssetToDatabase(db, overwrite) {
        const pAsset = this.Path.join(this.getAssetsDatabasesPath(), db);
        const toDb = this.setPathSuffix(db);
        const pDb = this.Path.join(this.getDatabasesPath(), toDb);
        await this.copyFilePath(pAsset, pDb, overwrite);
        return Promise.resolve();
    }
    /**
     * unzipDatabase
     * @param db
     * @param overwrite
     */
    async unzipDatabase(db, fPath, overwrite) {
        const pZip = this.Path.join(fPath, db);
        // Read the Zip file
        this.NodeFs.readFile(pZip, (err, data) => {
            if (err) {
                console.log(err);
                return Promise.reject(`unzipDatabase ${JSON.stringify(err)}`);
            }
            const zip = new this.JSZip();
            zip.loadAsync(data).then((contents) => {
                Object.keys(contents.files).forEach(filename => {
                    zip
                        .file(filename)
                        .async('nodebuffer')
                        .then(async (content) => {
                        const toDb = this.setPathSuffix(filename);
                        const pDb = this.Path.join(this.getDatabasesPath(), toDb);
                        // check filePath exists
                        const isPath = this.isPathExists(pDb);
                        if (!isPath || overwrite) {
                            if (overwrite && isPath) {
                                await this.deleteFilePath(pDb);
                            }
                            this.NodeFs.writeFileSync(pDb, content);
                        }
                        return Promise.resolve();
                    });
                });
            });
        });
    }
    /**
     * CopyFileName
     * Copy file name
     * @param fileName
     * @param toFileName
     */
    async copyFileName(fileName, toFileName) {
        // get File Paths
        const filePath = this.getFilePath(fileName);
        const toFilePath = this.getFilePath(toFileName);
        if (filePath.length !== 0 && toFilePath.length !== 0) {
            try {
                await this.copyFilePath(filePath, toFilePath, true);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(`CopyFileName: ${err}`);
            }
        }
        else {
            return Promise.reject('CopyFileName: cannot get the ' + 'filePath');
        }
    }
    /**
     * CopyFilePath
     * Copy file Path
     * @param filePath
     * @param toFilePath
     */
    async copyFilePath(filePath, toFilePath, overwrite) {
        if (filePath.length !== 0 && toFilePath.length !== 0) {
            // check filePath exists
            const isPath = this.isPathExists(toFilePath);
            if (!isPath || overwrite) {
                try {
                    if (overwrite && isPath) {
                        await this.deleteFilePath(toFilePath);
                    }
                    this.NodeFs.copyFileSync(filePath, toFilePath);
                }
                catch (err) {
                    return Promise.reject(`CopyFilePath: ${err}`);
                }
            }
            return Promise.resolve();
        }
        else {
            return Promise.reject('CopyFilePath: cannot get the ' + 'filePath');
        }
    }
    async copyFile(fromPath, fromFile, toPath, toFile) {
        const fPath = this.Path.join(fromPath, fromFile);
        const tPath = this.Path.join(toPath, toFile);
        try {
            this.NodeFs.copyFileSync(fPath, tPath);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(`CopyFile: ${err}`);
        }
    }
    /**
     * DeleteFileName
     * Delete a file by its name
     * @param fileName
     */
    async deleteFileName(fileName) {
        // get file path
        const filePath = this.getFilePath(fileName);
        if (filePath.length !== 0) {
            try {
                await this.deleteFilePath(filePath);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject('DeleteFileName: delete filePath ' + `failed ${err}`);
            }
        }
        else {
            return Promise.reject('DeleteFileName: get filePath ' + 'failed');
        }
    }
    /**
     * DeleteFilePath
     * Delete a file by its path
     * @param filePath
     */
    async deleteFilePath(filePath) {
        let unlinkRetries = 50000;
        /**
         * On windows, the file lock behaves unpredictable. Often it claims a databsae file is locked / busy, although
         * the file stream is already closed.
         * Even though we already checked the status with the `waitForFilePathLock()` method previously.
         *
         * The only way to handle this reliably is to retry deletion until it works.
         */
        const deleteFile = async () => {
            try {
                await promises_1.unlink(filePath);
            }
            catch (err) {
                unlinkRetries--;
                if (unlinkRetries > 0) {
                    await deleteFile();
                }
                else {
                    throw err;
                }
            }
        };
        if (filePath.length !== 0) {
            // check if path exists
            const isPath = this.isPathExists(filePath);
            if (isPath) {
                try {
                    await this.waitForFilePathLock(filePath);
                    // actually delete the file
                    await deleteFile();
                    return Promise.resolve();
                }
                catch (err) {
                    return Promise.reject(`DeleteFilePath: ${err}`);
                }
            }
            else {
                return Promise.resolve();
            }
        }
        else {
            return Promise.reject('DeleteFilePath: delete filePath' + 'failed');
        }
    }
    async waitForFilePathLock(filePath, timeoutMS = 4000) {
        let timeIsOver = false;
        setTimeout(() => {
            timeIsOver = true;
        }, timeoutMS);
        return new Promise((resolve, reject) => {
            const check = async () => {
                if (timeIsOver) {
                    reject(new Error(`WaitForFilePathLock: The resource is still locked / busy after ${timeoutMS} milliseconds.`));
                    return;
                }
                // check if path exists
                const isPath = this.isPathExists(filePath);
                // The file path does not exist. A non existant path cannot be locked.
                if (!isPath) {
                    resolve();
                    return;
                }
                try {
                    const stream = await promises_1.open(filePath, 'r+');
                    // We need to close the stream afterwards, because otherwise, we're locking the file
                    await stream.close();
                    resolve();
                }
                catch (err) {
                    if (err.code === 'EBUSY') {
                        // The resource is busy. Retry in 100ms
                        setTimeout(() => {
                            check();
                        }, 100);
                        return;
                    }
                    else if (err.code === 'ENOENT') {
                        // The file does not exist (anymore). So it cannot be locked.
                        resolve();
                        return;
                    }
                    else {
                        // Something else went wrong.
                        reject(new Error(`WaitForFilePathLock: Error while checking the file: ${err}`));
                    }
                }
            };
            check();
        });
    }
    /**
     * RenameFileName
     * @param fileName
     * @param toFileName
     */
    async renameFileName(fileName, toFileName) {
        // get File Paths
        const filePath = this.getFilePath(fileName);
        const toFilePath = this.getFilePath(toFileName);
        if (filePath.length !== 0 && toFilePath.length !== 0) {
            try {
                await this.renameFilePath(filePath, toFilePath);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(`RenameFileName: ${err}`);
            }
        }
        else {
            return Promise.reject('RenameFileName: filePaths do not ' + 'exist');
        }
    }
    /**
     * RenameFilePath
     * @param filePath
     * @param toFilePath
     */
    async renameFilePath(filePath, toFilePath) {
        if (filePath.length !== 0 && toFilePath.length !== 0) {
            // check filePath exists
            const isPath = this.isPathExists(filePath);
            if (isPath) {
                // delete toFilePath if exists
                try {
                    await this.deleteFilePath(toFilePath);
                    this.NodeFs.renameSync(filePath, toFilePath);
                    return Promise.resolve();
                }
                catch (err) {
                    return Promise.reject('RenameFilePath: ' + `${err}`);
                }
            }
            else {
                return Promise.reject(`RenameFilePath: ${filePath} does not exist`);
            }
        }
        else {
            return Promise.reject('RenameFilePath: filePath not found');
        }
    }
    async moveDatabaseFromCache() {
        const cachePath = this.getCachePath();
        const databasePath = this.getDatabasesPath();
        const dbCacheList = await this.getFileList(cachePath);
        for (const name of dbCacheList) {
            const ext = this.getExtName(name);
            const fromDBName = this.Path.join(cachePath, name);
            if (ext === '.db') {
                const pDb = this.setPathSuffix(this.Path.join(databasePath, name));
                try {
                    await this.renameFilePath(fromDBName, pDb);
                }
                catch (err) {
                    return Promise.reject('moveDatabaseFromCache: ' + `${err}`);
                }
            }
            if (ext === '.zip') {
                try {
                    await this.deleteFilePath(fromDBName);
                }
                catch (err) {
                    return Promise.reject('moveDatabaseFromCache: ' + `${err}`);
                }
            }
        }
    }
    /**
     * RestoreFileName
     * @param fileName
     * @param prefix
     */
    async restoreFileName(fileName, prefix) {
        const mFileName = `${prefix}-${fileName}`;
        // check if file exists
        const isFilePre = this.isFileExists(mFileName);
        if (isFilePre) {
            const isFile = this.isFileExists(fileName);
            if (isFile) {
                try {
                    await this.deleteFileName(fileName);
                    await this.renameFileName(mFileName, fileName);
                    return Promise.resolve();
                }
                catch (err) {
                    return Promise.reject('RestoreFileName: ' + `${err}`);
                }
            }
            else {
                return Promise.reject(`RestoreFileName: ${fileName} ` + 'does not exist');
            }
        }
        else {
            return Promise.reject(`RestoreFileName: ${mFileName} ` + 'does not exist');
        }
    }
    /**
     * DownloadFileFromHTTP
     * @param url
     * @param path
     */
    async downloadFileFromHTTP(url, pathFolder) {
        const res = await this.NodeFetch(url);
        const ext = this.getExtName(url);
        const dbName = this.getBaseName(url);
        const filePath = `${this.Path.join(pathFolder, dbName)}${ext}`;
        const fileStream = this.NodeFs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on('error', reject);
            fileStream.on('finish', resolve);
        });
    }
    readFileAsPromise(path, options) {
        return new Promise((resolve, reject) => {
            const fileStream = this.NodeFs.createReadStream(path, options);
            const chunks = [];
            fileStream.on('data', (data) => {
                chunks.push(data);
            });
            fileStream.on('close', () => {
                resolve(chunks.toString());
            });
            fileStream.on('error', (err) => {
                const msg = err.message ? err.message : err;
                reject(msg);
            });
        });
    }
    /**
     * CreateFolderIfNotExists
     * Create directory
     * @param folder
     */
    _createFolderIfNotExists(folder) {
        let ret;
        try {
            if (!this.NodeFs.existsSync(folder)) {
                this._mkdirSyncRecursive(folder);
            }
            ret = true;
        }
        catch (e) {
            console.log('Error: in getDBPath', e);
            ret = false;
        }
        return ret;
    }
    /**
     * MkdirSyncRecursive
     * Create directories recursively
     * @param directory
     */
    _mkdirSyncRecursive(directory) {
        const sep = this.Path.sep;
        const path = directory.replace(/\/$/, '').split(sep);
        for (let i = 1; i <= path.length; i++) {
            const segment = path.slice(0, i).join(sep);
            segment.length > 0 && !this.NodeFs.existsSync(segment)
                ? this.NodeFs.mkdirSync(segment)
                : null;
        }
        return;
    }
}
utilsFile.UtilsFile = UtilsFile;

var utilsSqlstatement = {};

Object.defineProperty(utilsSqlstatement, "__esModule", { value: true });
utilsSqlstatement.UtilsSQLStatement = void 0;
class UtilsSQLStatement {
    constructor() {
        this.replaceString = (originalStr, searchStr, replaceStr) => {
            const range = originalStr.indexOf(searchStr);
            if (range !== -1) {
                const modifiedStr = originalStr.substring(0, range) + replaceStr + originalStr.substring(range + searchStr.length);
                return modifiedStr;
            }
            return originalStr;
        };
    }
    extractTableName(statement) {
        const pattern = /(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+([^\s]+)/i;
        const match = statement.match(pattern);
        if (match?.[1]) {
            const tableName = match[1];
            return tableName;
        }
        return null;
    }
    extractWhereClause(statement) {
        const pattern = /WHERE(.+?)(?:ORDER\s+BY|LIMIT|$)/i;
        const match = statement.match(pattern);
        if (match?.[1]) {
            const whereClause = match[1].trim();
            return whereClause;
        }
        return null;
    }
    addPrefixToWhereClause(whereClause, colNames, refNames, prefix) {
        let columnValuePairs;
        if (whereClause.includes("AND")) {
            // Split the WHERE clause based on the "AND" keyword
            const subSequenceArray = whereClause.split("AND");
            console.log(" whereClause", whereClause);
            console.log(" subSequenceArray", subSequenceArray);
            columnValuePairs = subSequenceArray.map((pair) => pair.trim());
        }
        else {
            columnValuePairs = [whereClause];
        }
        console.log(" columnValuePairs", columnValuePairs);
        const modifiedPairs = columnValuePairs.map((pair) => {
            const match = pair.match(/(\w+)\s*(=|IN|BETWEEN|LIKE)\s*(.+)/);
            if (!match) {
                return pair;
            }
            const column = match[1].trim();
            const operator = match[2].trim();
            const value = match[3].trim();
            let newColumn = column;
            const index = this.findIndexOfStringInArray(column, refNames);
            if (index !== -1) {
                newColumn = this.getStringAtIndex(colNames, index);
            }
            const modifiedColumn = `${prefix}${newColumn}`;
            const ret = `${modifiedColumn} ${operator} ${value}`;
            return ret;
        });
        return modifiedPairs.join(" AND ");
    }
    findIndexOfStringInArray(target, array) {
        return array.indexOf(target);
    }
    getStringAtIndex(array, index) {
        if (index >= 0 && index < array.length) {
            return array[index];
        }
        else {
            return undefined;
        }
    }
    extractForeignKeyInfo(sqlStatement) {
        // Define the regular expression pattern for extracting the FOREIGN KEY clause
        const foreignKeyPattern = /\bFOREIGN\s+KEY\s*\(([^)]+)\)\s+REFERENCES\s+(\w+)\s*\(([^)]+)\)\s+(ON\s+DELETE\s+(RESTRICT|CASCADE|SET\s+NULL|SET\s+DEFAULT|NO\s+ACTION))?/;
        const matches = sqlStatement.match(foreignKeyPattern);
        if (matches) {
            const foreignKeyInfo = {
                forKeys: matches[1].split(",").map(key => key.trim()),
                tableName: matches[2],
                refKeys: matches[3].split(",").map(key => key.trim()),
                action: matches[5] ? matches[5] : "NO ACTION"
            };
            return foreignKeyInfo;
        }
        else {
            throw new Error("extractForeignKeyInfo: No FOREIGN KEY found");
        }
    }
    extractColumnNames(whereClause) {
        const regex = /\b(\w+)\s*(?=[=<>])|(?<=\()\s*(\w+),\s*(\w+)\s*(?=\))|(?<=\bIN\s*\(VALUES\s*\().*?(?=\))|(?<=\bIN\s*\().*?(?=\))|(?<=\bBETWEEN\s*).*?(?=\bAND\b)|(?<=\bLIKE\s*')\w+|\bAND\b/g;
        const matches = whereClause.matchAll(regex);
        const columnNames = [];
        let andGroup = [];
        for (const match of matches) {
            if (match[0] === 'AND') {
                columnNames.push(...andGroup);
                andGroup = [];
            }
            else if (match[1]) {
                andGroup.push(match[1]);
            }
            else if (match[2] && match[3]) {
                andGroup.push(match[2]);
                andGroup.push(match[3]);
            }
            else if (match[0]) {
                const values = match[0]
                    .replace(/[()']/g, '') // Remove parentheses and single quotes
                    .split(',')
                    .map(value => value.trim());
                andGroup.push(...values);
            }
        }
        columnNames.push(...andGroup);
        return columnNames;
    }
    flattenMultilineString(input) {
        const lines = input.split(/\r?\n/);
        return lines.join(" ");
    }
    getStmtAndRetColNames(sqlStmt, retMode) {
        const retWord = "RETURNING";
        const retStmtNames = { stmt: sqlStmt, names: "" };
        const retWordIndex = sqlStmt.toUpperCase().indexOf(retWord);
        if (retWordIndex !== -1) {
            const prefix = sqlStmt.substring(0, retWordIndex);
            retStmtNames.stmt = `${prefix};`;
            if (retMode.substring(0, 2) === "wA") {
                const suffix = sqlStmt.substring(retWordIndex + retWord.length);
                const names = suffix.trim();
                if (names.endsWith(";")) {
                    retStmtNames.names = names.substring(0, names.length - 1);
                }
                else {
                    retStmtNames.names = names;
                }
            }
        }
        return retStmtNames;
    }
    extractCombinedPrimaryKey(whereClause) {
        const pattern = /WHERE\s*\((.+?)\)\s*(?:=|IN)\s*\((.+?)\)/g;
        const regex = new RegExp(pattern);
        const matches = whereClause.matchAll(regex);
        const primaryKeySets = [];
        for (const match of matches) {
            const keysString = match[1].trim();
            const keys = keysString.split(",").map((key) => key.trim());
            primaryKeySets.push(keys);
        }
        return primaryKeySets.length === 0 ? null : primaryKeySets;
    }
    getWhereStmtForCombinedPK(whStmt, withRefs, colNames, keys) {
        let retWhere = whStmt;
        for (const grpKeys of keys) {
            const repKeys = grpKeys.join(",") === withRefs.join(",") ? colNames : withRefs;
            for (const [index, key] of grpKeys.entries()) {
                retWhere = this.replaceAllString(retWhere, key, repKeys[index]);
            }
        }
        return retWhere;
    }
    replaceAllString(originalStr, searchStr, replaceStr) {
        return originalStr.split(searchStr).join(replaceStr);
    }
    indicesOf(str, searchStr, fromIndex = 0) {
        // Helper function to find indices of a substring within a string
        const indices = [];
        let currentIndex = str.indexOf(searchStr, fromIndex);
        while (currentIndex !== -1) {
            indices.push(currentIndex);
            currentIndex = str.indexOf(searchStr, currentIndex + 1);
        }
        return indices;
    }
    getWhereStmtForNonCombinedPK(whStmt, withRefs, colNames) {
        let whereStmt = "";
        let stmt = whStmt.substring(6);
        for (let idx = 0; idx < withRefs.length; idx++) {
            let colType = "withRefsNames";
            let idxs = this.indicesOf(stmt, withRefs[idx]);
            if (idxs.length === 0) {
                idxs = this.indicesOf(stmt, colNames[idx]);
                colType = "colNames";
            }
            if (idxs.length > 0) {
                let valStr = "";
                const indicesEqual = this.indicesOf(stmt, "=", idxs[0]);
                if (indicesEqual.length > 0) {
                    const indicesAnd = this.indicesOf(stmt, "AND", indicesEqual[0]);
                    if (indicesAnd.length > 0) {
                        valStr = stmt.substring(indicesEqual[0] + 1, indicesAnd[0] - 1);
                        stmt = stmt.substring(indicesAnd[0] + 3);
                    }
                    else {
                        valStr = stmt.substring(indicesEqual[0] + 1);
                    }
                    if (idx > 0) {
                        whereStmt += " AND ";
                    }
                    if (colType === "withRefsNames") {
                        whereStmt += colNames[idx] + " = " + valStr;
                    }
                    else {
                        whereStmt += withRefs[idx] + " = " + valStr;
                    }
                }
            }
        }
        whereStmt = "WHERE " + whereStmt;
        return whereStmt;
    }
    updateWhere(whStmt, withRefs, colNames) {
        let whereStmt = "";
        if (whStmt.length <= 0) {
            return whereStmt;
        }
        if (whStmt.toUpperCase().substring(0, 5) !== "WHERE") {
            return whereStmt;
        }
        if (withRefs.length === colNames.length) {
            // get whereStmt for primary combined key
            const keys = this.extractCombinedPrimaryKey(whStmt);
            if (keys) {
                whereStmt = this.getWhereStmtForCombinedPK(whStmt, withRefs, colNames, keys);
            }
            else {
                // get for non primary combined key
                whereStmt = this.getWhereStmtForNonCombinedPK(whStmt, withRefs, colNames);
            }
        }
        return whereStmt;
    }
}
utilsSqlstatement.UtilsSQLStatement = UtilsSQLStatement;

Object.defineProperty(utilsSQLite, "__esModule", { value: true });
utilsSQLite.UtilsSQLite = void 0;
const utilsDelete_1 = utilsDelete;
const utilsFile_1$4 = utilsFile;
const utilsSqlstatement_1 = utilsSqlstatement;
//const SQLITE_OPEN_READONLY = 1;
class UtilsSQLite {
    constructor() {
        this.fileUtil = new utilsFile_1$4.UtilsFile();
        this.statUtil = new utilsSqlstatement_1.UtilsSQLStatement();
        this.delUtil = new utilsDelete_1.UtilsDelete();
        this.BCSQLite3 = require$$3__default$1["default"];
    }
    /**
     * OpenOrCreateDatabase
     * @param pathDB
     * @param password
     */
    openOrCreateDatabase(pathDB, password, readonly) {
        const msg = 'OpenOrCreateDatabase';
        // open sqlite3 database
        let mDB;
        if (!readonly) {
            mDB = new this.BCSQLite3(pathDB, {
                //        verbose: console.log,
                fileMustExist: false,
            });
        }
        else {
            mDB = new this.BCSQLite3(pathDB, {
                //        verbose: console.log,
                readonly: true,
                fileMustExist: true,
            });
        }
        if (mDB != null) {
            try {
                this.dbChanges(mDB);
            }
            catch (err) {
                const errmsg = err.message ? err.message : err;
                throw new Error(`${msg} ${errmsg}`);
            }
            try {
                // set the password
                if (password.length > 0) {
                    this.setCipherPragma(mDB, password);
                }
                // set Foreign Keys On
                this.setForeignKeyConstraintsEnabled(mDB, true);
            }
            catch (err) {
                const errmsg = err.message ? err.message : err;
                throw new Error(`${msg} ${errmsg}`);
            }
            return mDB;
        }
        else {
            throw new Error(msg + 'open database failed');
        }
    }
    /**
     * SetCipherPragma
     * @param mDB
     * @param password
     */
    setCipherPragma(mDB, passphrase) {
        const msg = 'setCipherPragma';
        try {
            mDB.pragma(`cipher='sqlcipher'`);
            mDB.pragma(`legacy=4`);
            mDB.pragma(`key='${passphrase}'`);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * SetForeignKeyConstraintsEnabled
     * @param mDB
     * @param toggle
     */
    setForeignKeyConstraintsEnabled(mDB, toggle) {
        const msg = 'SetForeignKeyConstraintsEnabled';
        let key = 'OFF';
        if (toggle) {
            key = 'ON';
        }
        try {
            mDB.pragma(`foreign_keys = '${key}'`);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * CloseDB
     * @param mDB
     */
    closeDB(mDB) {
        const msg = 'closeDB';
        try {
            mDB.close();
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * GetVersion
     * @param mDB
     */
    getVersion(mDB) {
        const msg = 'GetVersion';
        try {
            const result = mDB.pragma('user_version');
            return result[0].user_version;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * SetVersion
     * @param mDB
     * @param version
     */
    setVersion(mDB, version) {
        const msg = 'SetVersion';
        try {
            mDB.pragma(`user_version = '${version}'`);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * ChangePassword
     * @param pathDB
     * @param password
     * @param newpassword
     */
    changePassword(pathDB, password, newpassword) {
        let mDB;
        const msg = 'ChangePassword';
        try {
            mDB = this.openOrCreateDatabase(pathDB, password, false);
            this.pragmaReKey(mDB, password, newpassword);
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
        finally {
            this.closeDB(mDB);
        }
        return;
    }
    /**
     * PragmaReKey
     * @param mDB
     * @param passphrase
     * @param newpassphrase
     */
    pragmaReKey(mDB, passphrase, newpassphrase) {
        const msg = 'PragmaReKey: ';
        try {
            mDB.pragma(`cipher='sqlcipher'`);
            mDB.pragma(`legacy=4`);
            mDB.pragma(`key='${passphrase}'`);
            mDB.pragma(`rekey='${newpassphrase}'`);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * BeginTransaction
     * @param db
     * @param isOpen
     */
    beginTransaction(db, isOpen) {
        // eslint-disable-next-line no-async-promise-executor
        const msg = 'BeginTransaction: ';
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        const sql = 'BEGIN TRANSACTION;';
        try {
            db.exec(sql);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * RollbackTransaction
     * @param db
     * @param isOpen
     */
    rollbackTransaction(db, isOpen) {
        const msg = 'RollbackTransaction: ';
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        const sql = 'ROLLBACK TRANSACTION;';
        try {
            db.exec(sql);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * CommitTransaction
     * @param db
     * @param isOpen
     */
    commitTransaction(db, isOpen) {
        const msg = 'CommitTransaction: ';
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        const sql = 'COMMIT TRANSACTION;';
        try {
            db.exec(sql);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * DbChanges
     * return total number of changes
     * @param db
     */
    dbChanges(db) {
        const msg = 'DbChanges: ';
        let changes = 0;
        try {
            const statement = db.prepare('SELECT total_changes()');
            const firstRow = statement.get();
            if (firstRow != null) {
                const key = Object.keys(firstRow)[0];
                changes = firstRow[key];
            }
            return changes;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * GetLastId
     * @param db
     */
    getLastId(db) {
        const msg = 'GetLastId: ';
        let lastId = -1;
        try {
            const statement = db.prepare('SELECT last_insert_rowid()');
            const firstRow = statement.get();
            if (firstRow != null) {
                const key = Object.keys(firstRow)[0];
                lastId = firstRow[key];
            }
            return lastId;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * Execute
     * @param mDB
     * @param sql
     */
    execute(mDB, sql, fromJson) {
        const result = { changes: 0, lastId: -1 };
        const msg = 'Execute';
        let changes = -1;
        let lastId = -1;
        let initChanges = -1;
        try {
            initChanges = this.dbChanges(mDB);
            let sqlStmt = sql;
            if (sql.toLowerCase().includes('DELETE FROM'.toLowerCase()) ||
                sql.toLowerCase().includes('INSERT INTO'.toLowerCase()) ||
                sql.toLowerCase().includes('UPDATE'.toLowerCase())) {
                sqlStmt = this.checkStatements(mDB, sql, fromJson);
            }
            this.execDB(mDB, sqlStmt);
            changes = this.dbChanges(mDB) - initChanges;
            lastId = this.getLastId(mDB);
            result.changes = changes;
            result.lastId = lastId;
            return result;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    checkStatements(mDB, sql, fromJson) {
        // split the statements in an array of statement
        let sqlStmt = sql.replace(/\n/g, '');
        // deal with trigger
        sqlStmt = sqlStmt.replace(/end;/g, 'END;');
        sqlStmt = sqlStmt.replace(/;END;/g, '&END;');
        const sqlStmts = sqlStmt.split(';');
        const resArr = [];
        // loop through the statement
        for (const stmt of sqlStmts) {
            const method = stmt
                .trim()
                .substring(0, Math.min(stmt.trim().length, 6))
                .toUpperCase();
            let rStmt = stmt.trim();
            switch (method) {
                case 'CREATE':
                    if (rStmt.includes('&END')) {
                        rStmt = rStmt.replace(/&END/g, ';END');
                    }
                    break;
                case 'DELETE':
                    if (!fromJson && stmt.toLowerCase().includes('WHERE'.toLowerCase())) {
                        const whereStmt = this.cleanStatement(`${stmt.trim()}`);
                        rStmt = this.deleteSQL(mDB, whereStmt, []);
                    }
                    break;
                case 'INSERT':
                    if (stmt.toLowerCase().includes('VALUES'.toLowerCase())) {
                        rStmt = this.cleanStatement(`${stmt.trim()}`);
                    }
                    break;
                case 'UPDATE':
                    if (stmt.toLowerCase().includes('SET'.toLowerCase())) {
                        rStmt = this.cleanStatement(`${stmt.trim()}`);
                    }
                    break;
                case 'SELECT':
                    if (!fromJson && stmt.toLowerCase().includes('WHERE'.toLowerCase())) {
                        rStmt = this.cleanStatement(`${stmt.trim()}`);
                    }
                    break;
            }
            resArr.push(rStmt);
        }
        sqlStmt = resArr.join(';');
        return sqlStmt;
    }
    /**
     * ExecDB
     * @param mDB
     * @param sql
     */
    execDB(mDB, sql) {
        const msg = 'execDB: ';
        try {
            mDB.exec(sql);
            return;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * ExecuteSet
     * @param mDB
     * @param set
     * @param fromJson
     */
    executeSet(mDB, set, fromJson, returnMode) {
        const ret = { changes: 0, lastId: -1, values: [] };
        let result = { changes: 0, lastId: -1 };
        const msg = 'ExecuteSet';
        for (let i = 0; i < set.length; i++) {
            const statement = 'statement' in set[i] ? set[i].statement : null;
            const values = 'values' in set[i] && set[i].values.length > 0 ? set[i].values : [];
            if (statement == null) {
                let msg = 'ExecuteSet: Error Nostatement';
                msg += ` for index ${i}`;
                throw new Error(msg);
            }
            try {
                if (Array.isArray(values[0])) {
                    for (const val of values) {
                        const mVal = this.replaceUndefinedByNull(val);
                        result = this.prepareRun(mDB, statement, mVal, fromJson, returnMode);
                        ret.changes += result.changes;
                        ret.lastId = result.lastId;
                        const keys = Object.keys(result);
                        if (keys.includes('values') && result.values.length > 0) {
                            ret.values.push(result.values);
                        }
                    }
                }
                else {
                    if (values.length > 0) {
                        const mVal = this.replaceUndefinedByNull(values);
                        result = this.prepareRun(mDB, statement, mVal, fromJson, returnMode);
                    }
                    else {
                        result = this.prepareRun(mDB, statement, [], fromJson, returnMode);
                    }
                    ret.changes += result.changes;
                    ret.lastId = result.lastId;
                    const keys = Object.keys(result);
                    if (keys.includes('values') && result.values.length > 0) {
                        ret.values.push(result.values);
                    }
                }
            }
            catch (err) {
                const errmsg = err.message ? err.message : err;
                throw new Error(`${msg} ${errmsg}`);
            }
        }
        return ret;
    }
    /**
     * PrepareRun
     * @param mDB
     * @param statement
     * @param values
     * @param fromJson
     */
    prepareRun(mDB, statement, values, fromJson, returnMode) {
        const result = { changes: 0, lastId: -1 };
        const msg = 'PrepareRun';
        const stmtType = statement
            .replace(/\n/g, '')
            .trim()
            .substring(0, 6)
            .toUpperCase();
        let sqlStmt = statement;
        try {
            if (!fromJson && stmtType === 'DELETE') {
                sqlStmt = this.deleteSQL(mDB, statement, values);
            }
            const mValues = values ? values : [];
            let mVal = [];
            if (mValues.length > 0) {
                mVal = this.replaceUndefinedByNull(mValues);
            }
            else {
                const findVals = sqlStmt.match(/\?/gi);
                const nbValues = findVals ? findVals.length : 0;
                for (let i = 0; i < nbValues; i++) {
                    mVal.push(null);
                }
            }
            const ret = this.runExec(mDB, sqlStmt, mVal, returnMode);
            if (ret.values != null) {
                result.values = ret.values;
                result.changes = ret.changes;
                result.lastId = ret.lastInsertRowid;
            }
            else {
                result.changes = ret.changes;
                result.lastId = ret.lastInsertRowid;
            }
            return result;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    runExec(mDB, stmt, values = [], returnMode) {
        let result = { changes: 0, lastInsertRowid: -1, values: [] };
        const msg = 'runExec: ';
        try {
            const cStmt = this.cleanStatement(stmt);
            const params = this.getStmtAndNames(cStmt, returnMode);
            switch (params.mMode) {
                case 'one': {
                    const iniChanges = this.dbChanges(mDB);
                    if (values.length === 0) {
                        const value = mDB.prepare(params.stmt).get();
                        result.values.push(value);
                        result.lastInsertRowid = this.getLastId(mDB);
                    }
                    else {
                        const lowerId = this.getLastId(mDB) + 1;
                        const statement = mDB.prepare(params.stmt);
                        const res = statement.run(values);
                        result.lastInsertRowid = res.lastInsertRowid;
                        const sql = `SELECT ${params.names} FROM ${params.tableName} WHERE rowid = ${lowerId};`;
                        const value = this.queryOne(mDB, sql, []);
                        result.values.push(value);
                    }
                    result.changes = this.dbChanges(mDB) - iniChanges;
                    break;
                }
                case 'all': {
                    const iniChanges = this.dbChanges(mDB);
                    if (values.length === 0) {
                        result.values = mDB.prepare(params.stmt).all();
                        result.lastInsertRowid = this.getLastId(mDB);
                    }
                    else {
                        const lowerId = this.getLastId(mDB) + 1;
                        const statement = mDB.prepare(params.stmt);
                        const res = statement.run(values);
                        const upperId = res.lastInsertRowid;
                        const sql = `SELECT ${params.names} FROM ${params.tableName} WHERE rowid BETWEEN ${lowerId} AND ${upperId};`;
                        result.values = this.queryAll(mDB, sql, []);
                        result.lastInsertRowid = res.lastInsertRowid;
                    }
                    result.changes = this.dbChanges(mDB) - iniChanges;
                    break;
                }
                default: {
                    const statement = mDB.prepare(params.stmt);
                    if (values != null && values.length > 0) {
                        result = statement.run(values);
                    }
                    else {
                        result = statement.run();
                    }
                }
            }
            return result;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * replaceUndefinedByNull
     * @param values
     * @returns
     */
    replaceUndefinedByNull(values) {
        const retValues = [];
        if (values.length > 0) {
            for (const val of values) {
                let mVal = val;
                if (typeof val === 'undefined')
                    mVal = null;
                retValues.push(mVal);
            }
        }
        return retValues;
    }
    /**
     * deleteSQL
     * @param mDB
     * @param statement
     * @param values
     * @returns
     */
    deleteSQL(mDB, statement, values) {
        let sqlStmt = statement;
        const msg = 'DeleteSQL';
        try {
            const isLast = this.isLastModified(mDB, true);
            const isDel = this.isSqlDeleted(mDB, true);
            if (!isLast || !isDel) {
                return sqlStmt;
            }
            // Replace DELETE by UPDATE
            // set sql_deleted to 1 and the last_modified to
            // timenow
            const whereClause = this.statUtil.extractWhereClause(sqlStmt);
            if (!whereClause) {
                const msg = 'deleteSQL: cannot find a WHERE clause';
                throw new Error(`${msg}`);
            }
            const tableName = this.statUtil.extractTableName(sqlStmt);
            if (!tableName) {
                const msg = 'deleteSQL: cannot find a WHERE clause';
                throw new Error(`${msg}`);
            }
            const colNames = this.statUtil.extractColumnNames(whereClause);
            if (colNames.length === 0) {
                const msg = 'deleteSQL: Did not find column names in the WHERE Statement';
                throw new Error(`${msg}`);
            }
            const setStmt = 'sql_deleted = 1';
            // Find REFERENCES if any and update the sql_deleted
            // column
            const hasToUpdate = this.findReferencesAndUpdate(mDB, tableName, whereClause, colNames, values);
            if (hasToUpdate) {
                const whereStmt = whereClause.endsWith(';')
                    ? whereClause.slice(0, -1)
                    : whereClause;
                sqlStmt = `UPDATE ${tableName} SET ${setStmt} WHERE ${whereStmt} AND sql_deleted = 0;`;
            }
            else {
                sqlStmt = '';
            }
            return sqlStmt;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * findReferencesAndUpdate
     * @param mDB
     * @param tableName
     * @param whereStmt
     * @param initColNames
     * @param values
     * @returns
     */
    findReferencesAndUpdate(mDB, tableName, whereStmt, initColNames, values) {
        try {
            const retBool = true;
            const result = this.getReferences(mDB, tableName);
            const references = result.retRefs;
            const tableNameWithRefs = result.tableWithRefs;
            if (references.length <= 0) {
                return retBool;
            }
            if (tableName === tableNameWithRefs) {
                return retBool;
            }
            // Loop through references
            for (const ref of references) {
                // Extract the FOREIGN KEY constraint info from the ref statement
                const foreignKeyInfo = this.statUtil.extractForeignKeyInfo(ref);
                // Get the tableName of the references
                const refTable = foreignKeyInfo.tableName;
                if (refTable === '' || refTable !== tableName) {
                    continue;
                }
                // Get the with ref column names
                const withRefsNames = foreignKeyInfo.forKeys;
                // Get the column names
                const colNames = foreignKeyInfo.refKeys;
                if (colNames.length !== withRefsNames.length) {
                    const msg = "findReferencesAndUpdate: mismatch length";
                    throw new Error(msg);
                }
                const action = foreignKeyInfo.action;
                if (action === 'NO_ACTION') {
                    continue;
                }
                const updTableName = tableNameWithRefs;
                const updColNames = withRefsNames;
                let results = {
                    uWhereStmt: '',
                    setStmt: '',
                };
                if (!this.delUtil.checkValuesMatch(withRefsNames, initColNames)) {
                    // Case: no match
                    // Search for related items in tableName
                    const result = this.searchForRelatedItems(mDB, updTableName, tableName, whereStmt, withRefsNames, colNames, values);
                    if (result.relatedItems.length === 0 && result.key.length <= 0) {
                        continue;
                    }
                    if (updTableName !== tableName) {
                        switch (action) {
                            case 'RESTRICT':
                                results = this.delUtil.upDateWhereForRestrict(result);
                                break;
                            case 'CASCADE':
                                results = this.delUtil.upDateWhereForCascade(result);
                                break;
                            default:
                                results = this.delUtil.upDateWhereForDefault(withRefsNames, result);
                                break;
                        }
                    }
                }
                else {
                    throw new Error('Not implemented. Please transfer your example to the maintener');
                }
                if (results.setStmt.length > 0 &&
                    results.uWhereStmt.length > 0) {
                    this.executeUpdateForDelete(mDB, updTableName, results.uWhereStmt, results.setStmt, updColNames, values);
                }
            }
            return retBool;
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw new Error(msg);
        }
    }
    /**
     * getReferences
     * @param db
     * @param tableName
     * @returns
     */
    getReferences(db, tableName) {
        const sqlStmt = "SELECT sql FROM sqlite_master " +
            "WHERE sql LIKE('%FOREIGN KEY%') AND sql LIKE('%REFERENCES%') AND " +
            "sql LIKE('%" + tableName + "%') AND sql LIKE('%ON DELETE%');";
        try {
            const res = this.queryAll(db, sqlStmt, []);
            // get the reference's string(s)
            let retRefs = [];
            let tableWithRefs = "";
            if (res.length > 0) {
                const result = this.getRefs(res[0].sql);
                retRefs = result.foreignKeys;
                tableWithRefs = result.tableName;
            }
            return { tableWithRefs: tableWithRefs, retRefs: retRefs };
        }
        catch (err) {
            const error = err.message ? err.message : err;
            const msg = `getReferences: ${error}`;
            throw new Error(msg);
        }
    }
    /**
     * getRefs
     * @param sqlStatement
     * @returns
     */
    getRefs(sqlStatement) {
        let tableName = '';
        const foreignKeys = [];
        const statement = this.statUtil.flattenMultilineString(sqlStatement);
        try {
            // Regular expression pattern to match the table name
            const tableNamePattern = /CREATE\s+TABLE\s+(\w+)\s+\(/;
            const tableNameMatch = statement.match(tableNamePattern);
            if (tableNameMatch) {
                tableName = tableNameMatch[1];
            }
            // Regular expression pattern to match the FOREIGN KEY constraints
            const foreignKeyPattern = /FOREIGN\s+KEY\s+\([^)]+\)\s+REFERENCES\s+(\w+)\s*\([^)]+\)\s+ON\s+DELETE\s+(CASCADE|RESTRICT|SET\s+DEFAULT|SET\s+NULL|NO\s+ACTION)/g;
            const foreignKeyMatches = statement.matchAll(foreignKeyPattern);
            for (const foreignKeyMatch of foreignKeyMatches) {
                const foreignKey = foreignKeyMatch[0];
                foreignKeys.push(foreignKey);
            }
        }
        catch (error) {
            const msg = `getRefs: Error creating regular expression: ${error}`;
            throw new Error(msg);
        }
        return { tableName, foreignKeys };
    }
    /**
     * executeUpdateForDelete
     * @param mDB
     * @param tableName
     * @param whereStmt
     * @param setStmt
     * @param colNames
     * @param values
     */
    executeUpdateForDelete(mDB, tableName, whereStmt, setStmt, colNames, values) {
        try {
            let lastId = -1;
            // Update sql_deleted for this references
            const stmt = `UPDATE ${tableName} SET ${setStmt} ${whereStmt}`;
            const selValues = [];
            if (values.length > 0) {
                const arrVal = whereStmt.split('?');
                if (arrVal[arrVal.length - 1] === ';') {
                    arrVal.pop();
                }
                for (let jdx = 0; jdx < arrVal.length; jdx++) {
                    for (const updVal of colNames) {
                        const indices = this.statUtil.indicesOf(arrVal[jdx], updVal);
                        if (indices.length > 0) {
                            selValues.push(values[jdx]);
                        }
                    }
                }
            }
            const retObj = this.runExec(mDB, stmt, selValues, 'no');
            lastId = retObj["lastInsertRowid"];
            if (lastId === -1) {
                const msg = `UPDATE sql_deleted failed for table: ${tableName}`;
                throw new Error(msg);
            }
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw new Error(msg);
        }
    }
    /**
     * QueryAll
     * @param mDB
     * @param sql
     * @param values
     */
    queryAll(mDB, sql, values) {
        const msg = 'QueryAll';
        try {
            const cSql = this.cleanStatement(sql);
            const stmt = mDB.prepare(cSql);
            let rows;
            if (values != null && values.length > 0) {
                rows = stmt.all(values);
            }
            else {
                rows = stmt.all();
            }
            if (rows == null) {
                rows = [];
            }
            return rows;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * QueryOne
     * @param mDB
     * @param sql
     * @param values
     */
    queryOne(mDB, sql, values) {
        const msg = 'QueryOne';
        try {
            const cSql = this.cleanStatement(sql);
            const stmt = mDB.prepare(cSql);
            let row;
            if (values != null && values.length > 0) {
                row = stmt.get(values);
            }
            else {
                row = stmt.get();
            }
            return row;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * GetTablesNames
     * @param mDb
     */
    getTablesNames(mDb) {
        const msg = 'getTablesNames';
        let sql = 'SELECT name FROM sqlite_master WHERE ';
        sql += "type='table' AND name NOT LIKE 'sync_table' ";
        sql += "AND name NOT LIKE '_temp_%' ";
        sql += "AND name NOT LIKE 'sqlite_%' ";
        sql += 'ORDER BY rootpage DESC;';
        const retArr = [];
        try {
            const retQuery = this.queryAll(mDb, sql, []);
            for (const query of retQuery) {
                retArr.push(query.name);
            }
            return retArr;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * GetViewsNames
     * @param mDb
     */
    getViewsNames(mDb) {
        const msg = 'GetViewsNames';
        let sql = 'SELECT name FROM sqlite_master WHERE ';
        sql += "type='view' AND name NOT LIKE 'sqlite_%' ";
        sql += 'ORDER BY rootpage DESC;';
        const retArr = [];
        try {
            const retQuery = this.queryAll(mDb, sql, []);
            for (const query of retQuery) {
                retArr.push(query.name);
            }
            return retArr;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * isLastModified
     * @param mDB
     * @param isOpen
     */
    isLastModified(mDB, isOpen) {
        const msg = 'IsLastModified';
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        try {
            const tableList = this.getTablesNames(mDB);
            for (const table of tableList) {
                const tableNamesTypes = this.getTableColumnNamesTypes(mDB, table);
                const tableColumnNames = tableNamesTypes.names;
                if (tableColumnNames.includes('last_modified')) {
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    /**
     * isSqlDeleted
     * @param mDB
     * @param isOpen
     */
    isSqlDeleted(mDB, isOpen) {
        const msg = 'IsSqlDeleted';
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        try {
            const tableList = this.getTablesNames(mDB);
            for (const table of tableList) {
                const tableNamesTypes = this.getTableColumnNamesTypes(mDB, table);
                const tableColumnNames = tableNamesTypes.names;
                if (tableColumnNames.includes('sql_deleted')) {
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    getJournalMode(mDB) {
        const msg = 'getJournalMode';
        try {
            const retMode = mDB.pragma('journal_mode');
            console.log(`journal_mode: ${retMode[0].journal_mode}`);
            return retMode[0].journal_mode;
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    async isDatabaseEncrypted(dbName) {
        const msg = 'isDatabaseEncrypted';
        try {
            const isExists = this.fileUtil.isFileExists(dbName);
            if (isExists) {
                const filePath = this.fileUtil.getFilePath(dbName);
                return await this.isDBEncrypted(filePath);
            }
            else {
                throw new Error(`${msg}: Database ${dbName} does not exist`);
            }
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    async isDBEncrypted(filePath) {
        try {
            const retStr = await this.fileUtil.readFileAsPromise(filePath, {
                start: 0,
                end: 12,
            });
            if (retStr === 'SQLite format')
                return false;
            else
                return true;
        }
        catch (error) {
            return true;
        }
    }
    /**
     * GetTableColumnNamesTypes
     * @param mDB
     * @param tableName
     */
    getTableColumnNamesTypes(mDB, tableName) {
        const msg = 'getTableColumnNamesTypes';
        try {
            const infos = mDB.pragma(`table_info('${tableName}')`);
            const retNames = [];
            const retTypes = [];
            for (const info of infos) {
                retNames.push(info.name);
                retTypes.push(info.type);
            }
            return { names: retNames, types: retTypes };
        }
        catch (err) {
            const errmsg = err.message ? err.message : err;
            throw new Error(`${msg} ${errmsg}`);
        }
    }
    searchForRelatedItems(mDB, updTableName, tableName, whStmt, withRefsNames, colNames, values) {
        const relatedItems = [];
        let key = "";
        const t1Names = withRefsNames.map((name) => `t1.${name}`);
        const t2Names = colNames.map((name) => `t2.${name}`);
        console.log(" whStmt ", whStmt);
        console.log(" t1Names ", t1Names);
        console.log(" t2Names ", t2Names);
        try {
            // addPrefix to the whereClause and swap colNames with  withRefsNames
            let whereClause = this.statUtil
                .addPrefixToWhereClause(whStmt, colNames, withRefsNames, "t2.");
            // look at the whereclause and change colNames with  withRefsNames
            if (whereClause.endsWith(";")) {
                whereClause = whereClause.slice(0, -1);
            }
            console.log(" whereClause ", whereClause);
            const resultString = t1Names
                .map((t1, index) => `${t1} = ${t2Names[index]}`)
                .join(" AND ");
            const sql = `SELECT t1.rowid FROM ${updTableName} t1 ` +
                `JOIN ${tableName} t2 ON ${resultString} ` +
                `WHERE ${whereClause} AND t1.sql_deleted = 0;`;
            console.log(" sql ", sql);
            const vals = this.queryAll(mDB, sql, values);
            if (vals.length > 0) {
                key = (Object.keys(vals[0]))[0];
                relatedItems.push(...vals);
            }
            return { key: key, relatedItems: relatedItems };
        }
        catch (error) {
            const msg = error.message ? error.message : error;
            throw new Error(msg);
        }
    }
    cleanStatement(stmt) {
        let sql = '';
        if (stmt.toLowerCase().includes('INSERT INTO'.toLowerCase()) ||
            stmt.toLowerCase().includes('SELECT'.toLowerCase()) ||
            stmt.toLowerCase().includes('UPDATE'.toLowerCase()) ||
            stmt.toLowerCase().includes('DELETE FROM'.toLowerCase())) {
            // check for JSON string
            sql = this.dealJsonString(stmt);
            // sql = sql.replaceAll('"', "'"); // commented out to ensure compatibility with typeorm
            sql = sql.replaceAll('§', '"');
        }
        else {
            sql = stmt;
        }
        return sql;
    }
    findIndex(str, char) {
        const a = [];
        for (let i = str.length; i--;)
            if (str[i] == char)
                a.push(i);
        return a.reverse();
    }
    dealJsonString(stmt) {
        let retStmt = stmt;
        const oJ = this.findIndex(stmt, '{');
        const eJ = this.findIndex(stmt, '}');
        for (let i = 0; i < oJ.length; i++) {
            const g = retStmt.substring(oJ[i] + 1, eJ[i]).replaceAll('"', '§');
            retStmt = retStmt.substring(0, oJ[i] + 1) + g + retStmt.substring(eJ[i]);
        }
        return retStmt;
    }
    getStmtAndNames(stmt, returnMode) {
        const retObj = {};
        const mStmt = stmt;
        if (mStmt.toUpperCase().includes('RETURNING') &&
            (returnMode === 'all' || returnMode === 'one')) {
            retObj.tableName = this.getTableName(mStmt);
            retObj.mMode = returnMode;
            const idx = mStmt.toUpperCase().indexOf('RETURNING') + 9;
            const names = mStmt.substring(idx).trim();
            retObj.names = names.slice(-1) === ';' ? names.slice(0, -1) : names;
            retObj.stmt = mStmt;
        }
        else {
            retObj.mMode = 'no';
            if (mStmt.toUpperCase().includes('RETURNING')) {
                const idx = mStmt.toUpperCase().indexOf('RETURNING');
                retObj.stmt = mStmt.slice(0, idx).trim() + ';';
            }
            else {
                retObj.stmt = mStmt;
            }
        }
        return retObj;
    }
    getTableName(sqlStatement) {
        const patterns = {
            insert: /INSERT\s+INTO\s+(\w+)/i,
            delete: /DELETE\s+FROM\s+(\w+)/i,
            update: /UPDATE\s+(\w+)/i,
            select: /SELECT.*\s+FROM\s+(\w+)/i,
        };
        let tableName = null;
        Object.keys(patterns).some((key) => {
            const pattern = patterns[key];
            const match = pattern.exec(sqlStatement);
            if (match) {
                tableName = match[1];
                return true; // Stop iterating through patterns
            }
            return false;
        });
        return tableName;
    }
}
utilsSQLite.UtilsSQLite = UtilsSQLite;

var utilsJson = {};

Object.defineProperty(utilsJson, "__esModule", { value: true });
utilsJson.UtilsJson = void 0;
const utilsSQLite_1$8 = utilsSQLite;
class UtilsJson {
    constructor() {
        this.sqliteUtil = new utilsSQLite_1$8.UtilsSQLite();
    }
    /**
     * IsTableExists
     * @param mDB
     * @param isOpen
     * @param tableName
     */
    isTableExists(mDB, isOpen, tableName) {
        const msg = 'IsTableExists';
        let ret = false;
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        let query = 'SELECT name FROM sqlite_master WHERE ';
        query += `type='table' AND name='${tableName}';`;
        const rows = this.sqliteUtil.queryAll(mDB, query, []);
        if (rows.length > 0) {
            ret = true;
        }
        return ret;
    }
    /**
     * IsViewExists
     * @param db
     * @param isOpen
     * @param viewName
     */
    isViewExists(mDB, isOpen, viewName) {
        const msg = 'IsViewExists';
        let ret = false;
        if (!isOpen) {
            throw new Error(`${msg} database not opened`);
        }
        let query = 'SELECT name FROM sqlite_master WHERE ';
        query += `type='view' AND name='${viewName}';`;
        const rows = this.sqliteUtil.queryAll(mDB, query, []);
        if (rows.length > 0) {
            ret = true;
        }
        return ret;
    }
    /**
     * CreateSchema
     * @param mDB
     * @param jsonData
     */
    createSchema(mDB, jsonData) {
        // create the database schema
        const msg = 'CreateSchema';
        let changes = 0;
        try {
            // start a transaction
            this.sqliteUtil.beginTransaction(mDB, true);
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
        const stmts = this.createSchemaStatement(jsonData);
        if (stmts.length > 0) {
            const schemaStmt = stmts.join('\n');
            try {
                const results = this.sqliteUtil.execute(mDB, schemaStmt, true);
                changes = results.changes;
                if (changes < 0) {
                    try {
                        this.sqliteUtil.rollbackTransaction(mDB, true);
                    }
                    catch (err) {
                        throw new Error(`${msg} changes < 0 ${err}`);
                    }
                }
            }
            catch (err) {
                const msg = err;
                try {
                    this.sqliteUtil.rollbackTransaction(mDB, true);
                    throw new Error(`CreateSchema: ${msg}`);
                }
                catch (err) {
                    throw new Error(`${msg} changes < 0${err}: ${msg}`);
                }
            }
        }
        try {
            this.sqliteUtil.commitTransaction(mDB, true);
            return changes;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * CreateSchemaStatement
     * @param jsonData
     */
    createSchemaStatement(jsonData) {
        const msg = 'CreateSchemaStatement';
        const statements = [];
        let isLastModified = false;
        let isSqlDeleted = false;
        // Prepare the statement to execute
        try {
            for (const jTable of jsonData.tables) {
                if (jTable.schema != null && jTable.schema.length >= 1) {
                    // create table
                    statements.push('CREATE TABLE IF NOT EXISTS ' + `${jTable.name} (`);
                    for (let j = 0; j < jTable.schema.length; j++) {
                        if (j === jTable.schema.length - 1) {
                            if (jTable.schema[j].column) {
                                statements.push(`${jTable.schema[j].column} ${jTable.schema[j].value}`);
                                if (jTable.schema[j].column === 'last_modified') {
                                    isLastModified = true;
                                }
                                if (jTable.schema[j].column === 'sql_deleted') {
                                    isSqlDeleted = true;
                                }
                            }
                            else if (jTable.schema[j].foreignkey) {
                                statements.push(`FOREIGN KEY (${jTable.schema[j].foreignkey}) ${jTable.schema[j].value}`);
                            }
                            else if (jTable.schema[j].constraint) {
                                statements.push(`CONSTRAINT ${jTable.schema[j].constraint} ${jTable.schema[j].value}`);
                            }
                        }
                        else {
                            if (jTable.schema[j].column) {
                                statements.push(`${jTable.schema[j].column} ${jTable.schema[j].value},`);
                                if (jTable.schema[j].column === 'last_modified') {
                                    isLastModified = true;
                                }
                                if (jTable.schema[j].column === 'sql_deleted') {
                                    isSqlDeleted = true;
                                }
                            }
                            else if (jTable.schema[j].foreignkey) {
                                statements.push(`FOREIGN KEY (${jTable.schema[j].foreignkey}) ${jTable.schema[j].value},`);
                            }
                            else if (jTable.schema[j].constraint) {
                                statements.push(`CONSTRAINT ${jTable.schema[j].constraint} ${jTable.schema[j].value},`);
                            }
                        }
                    }
                    statements.push(');');
                    if (isLastModified && isSqlDeleted) {
                        // create trigger last_modified associated with the table
                        let trig = 'CREATE TRIGGER IF NOT EXISTS ';
                        trig += `${jTable.name}`;
                        trig += `_trigger_last_modified `;
                        trig += `AFTER UPDATE ON ${jTable.name} `;
                        trig += 'FOR EACH ROW WHEN NEW.last_modified < ';
                        trig += 'OLD.last_modified BEGIN UPDATE ';
                        trig += `${jTable.name} `;
                        trig += `SET last_modified = `;
                        trig += "(strftime('%s','now')) WHERE id=OLD.id; END;";
                        statements.push(trig);
                    }
                }
                if (jTable.indexes != null && jTable.indexes.length >= 1) {
                    for (const jIndex of jTable.indexes) {
                        const tableName = jTable.name;
                        let stmt = `CREATE ${Object.keys(jIndex).includes('mode') ? jIndex.mode + ' ' : ''} INDEX IF NOT EXISTS `;
                        stmt += `${jIndex.name} ON ${tableName} (${jIndex.value});`;
                        statements.push(stmt);
                    }
                }
                if (jTable.triggers != null && jTable.triggers.length >= 1) {
                    for (const jTrg of jTable.triggers) {
                        const tableName = jTable.name;
                        if (jTrg.timeevent.toUpperCase().endsWith(' ON')) {
                            jTrg.timeevent = jTrg.timeevent.substring(0, jTrg.timeevent.length - 3);
                        }
                        let stmt = `CREATE TRIGGER IF NOT EXISTS `;
                        stmt += `${jTrg.name} ${jTrg.timeevent} ON ${tableName} `;
                        if (jTrg.condition)
                            stmt += `${jTrg.condition} `;
                        stmt += `${jTrg.logic};`;
                        statements.push(stmt);
                    }
                }
            }
            return statements;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * CreateDataTable
     * @param mDB
     * @param table
     * @param mode
     */
    createDataTable(mDB, table, mode) {
        let lastId = -1;
        const msg = 'CreateDataTable';
        let results;
        try {
            // Check if the table exists
            const tableExists = this.isTableExists(mDB, true, table.name);
            if (!tableExists) {
                throw new Error(`${msg} ${table.name} does not exist`);
            }
            // Get the column names and types
            const tableNamesTypes = this.sqliteUtil.getTableColumnNamesTypes(mDB, table.name);
            const tableColumnTypes = tableNamesTypes.types;
            const tableColumnNames = tableNamesTypes.names;
            if (tableColumnTypes.length === 0) {
                throw new Error(`${msg} ${table.name} info does not exist`);
            }
            // Loop on Table Values
            for (let j = 0; j < table.values.length; j++) {
                let row = table.values[j];
                let isRun = true;
                const stmt = this.createRowStatement(mDB, tableColumnNames, row, j, table.name, mode);
                isRun = this.checkUpdate(mDB, stmt, row, table.name, tableColumnNames);
                if (isRun) {
                    if (stmt.substring(0, 6).toUpperCase() === 'DELETE') {
                        row = [];
                    }
                    results = this.sqliteUtil.prepareRun(mDB, stmt, row, true, 'no');
                    lastId = results.lastId;
                    if (lastId < 0) {
                        throw new Error(`${msg} lastId < 0`);
                    }
                }
                else {
                    lastId = 0;
                }
            }
            return results;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * CreateRowStatement
     * @param mDB
     * @param tColNames
     * @param row
     * @param j
     * @param tableName
     * @param mode
     * @returns
     */
    createRowStatement(mDB, tColNames, row, j, tableName, mode) {
        // Check the row number of columns
        const msg = 'CreateRowStatement';
        if (row.length != tColNames.length ||
            row.length === 0 ||
            tColNames.length === 0) {
            throw new Error(`${msg} Table ${tableName} ` + `values row ${j} not correct length`);
        }
        try {
            const retisIdExists = this.isIdExists(mDB, tableName, tColNames[0], row[0]);
            let stmt;
            if (mode === 'full' || (mode === 'partial' && !retisIdExists)) {
                // Insert
                const nameString = tColNames.join();
                const questionMarkString = this.createQuestionMarkString(tColNames.length);
                stmt = `INSERT INTO ${tableName} (${nameString}) VALUES (`;
                stmt += `${questionMarkString});`;
            }
            else {
                // Update or Delete
                let isUpdate = true;
                const isColDeleted = (element) => element === `sql_deleted`;
                const idxDelete = tColNames.findIndex(isColDeleted);
                if (idxDelete >= 0) {
                    if (row[idxDelete] === 1) {
                        isUpdate = false;
                        stmt = `DELETE FROM ${tableName} WHERE `;
                        if (typeof row[0] == 'string') {
                            stmt += `${tColNames[0]} = '${row[0]}';`;
                        }
                        else {
                            stmt += `${tColNames[0]} = ${row[0]};`;
                        }
                    }
                }
                if (isUpdate) {
                    // Update
                    const setString = this.setNameForUpdate(tColNames);
                    if (setString.length === 0) {
                        throw new Error(`${msg} Table ${tableName} ` +
                            `values row ${j} not set to String`);
                    }
                    stmt = `UPDATE ${tableName} SET ${setString} WHERE `;
                    if (typeof row[0] == 'string') {
                        stmt += `${tColNames[0]} = '${row[0]}';`;
                    }
                    else {
                        stmt += `${tColNames[0]} = ${row[0]};`;
                    }
                }
            }
            return stmt;
        }
        catch (err) {
            throw new Error(`${msg} ${err.message}`);
        }
    }
    /**
     *
     * @param mDB
     * @param values
     * @param tbName
     * @param tColNames
     * @returns
     */
    checkUpdate(mDB, stmt, values, tbName, tColNames) {
        const msg = 'CheckUpdate';
        const isRun = true;
        if (stmt.substring(0, 6) === 'UPDATE') {
            try {
                let query = `SELECT * FROM ${tbName} WHERE `;
                if (typeof values[0] == 'string') {
                    query += `${tColNames[0]} = '${values[0]}';`;
                }
                else {
                    query += `${tColNames[0]} = ${values[0]};`;
                }
                const resQuery = this.getValues(mDB, query, tbName);
                let resValues = [];
                if (resQuery.length > 0) {
                    resValues = resQuery[0];
                }
                if (values.length > 0 &&
                    resValues.length > 0 &&
                    values.length === resValues.length) {
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] !== resValues[i]) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    const msg1 = 'Both arrays not the same length';
                    throw new Error(`${msg} ${msg1}`);
                }
            }
            catch (err) {
                throw new Error(`${msg} ${err.message}`);
            }
        }
        else {
            return isRun;
        }
    }
    /**
     * GetValues
     * @param mDb
     * @param query
     * @param tableName
     */
    getValues(mDb, query, tableName) {
        const msg = 'GetValues';
        const values = [];
        try {
            // get table column names and types
            const tableNamesTypes = this.sqliteUtil.getTableColumnNamesTypes(mDb, tableName);
            let rowNames = [];
            if (Object.keys(tableNamesTypes).includes('names')) {
                rowNames = tableNamesTypes.names;
            }
            else {
                throw new Error(`${msg} Table ${tableName} no names`);
            }
            const retValues = this.sqliteUtil.queryAll(mDb, query, []);
            for (const rValue of retValues) {
                const row = [];
                for (const rName of rowNames) {
                    if (Object.keys(rValue).includes(rName)) {
                        row.push(rValue[rName]);
                    }
                    else {
                        row.push('NULL');
                    }
                }
                values.push(row);
            }
            return values;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * CheckColumnTypes
     * @param tableTypes
     * @param rowValues
     */
    /*
    private async checkColumnTypes(
      tableTypes: any[],
      rowValues: any[],
    ): Promise<boolean> {
      const isType = true;
      for (let i = 0; i < rowValues.length; i++) {
        if (rowValues[i].toString().toUpperCase() != 'NULL') {
          try {
            await this.isType(tableTypes[i], rowValues[i]);
          } catch (err) {
            return Promise.reject(new Error('checkColumnTypes: Type not found'));
          }
        }
      }
      return Promise.resolve(isType);
    }
  */
    /**
     * IsType
     * @param type
     * @param value
     */
    /*
    private async isType(type: string, value: any): Promise<void> {
      let ret = false;
      if (type === 'NULL' && typeof value === 'object') ret = true;
      if (type === 'TEXT' && typeof value === 'string') ret = true;
      if (type === 'INTEGER' && typeof value === 'number') ret = true;
      if (type === 'REAL' && typeof value === 'number') ret = true;
      if (type === 'BLOB' && typeof value === 'string') ret = true;
      if (ret) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('IsType: not a SQL Type'));
      }
    }
  */
    /**
     * IsIdExists
     * @param mDB
     * @param dbName
     * @param firstColumnName
     * @param key
     */
    isIdExists(mDB, dbName, firstColumnName, key) {
        const msg = 'IsIdExists';
        let ret = false;
        let query = `SELECT ${firstColumnName} FROM ` +
            `${dbName} WHERE ${firstColumnName} = `;
        if (typeof key === 'number')
            query += `${key};`;
        if (typeof key === 'string')
            query += `'${key}';`;
        try {
            const resQuery = this.sqliteUtil.queryAll(mDB, query, []);
            if (resQuery.length === 1)
                ret = true;
            return ret;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * CreateQuestionMarkString
     * @param length
     */
    createQuestionMarkString(length) {
        const msg = 'CreateQuestionMarkString';
        let retString = '';
        for (let i = 0; i < length; i++) {
            retString += '?,';
        }
        if (retString.length > 1) {
            retString = retString.slice(0, -1);
            return retString;
        }
        else {
            throw new Error(`${msg} length = 0`);
        }
    }
    /**
     * SetNameForUpdate
     * @param names
     */
    setNameForUpdate(names) {
        const msg = 'SetNameForUpdate';
        let retString = '';
        for (const name of names) {
            retString += `${name} = ? ,`;
        }
        if (retString.length > 1) {
            retString = retString.slice(0, -1);
            return retString;
        }
        else {
            throw new Error(`${msg} length = 0`);
        }
    }
    /**
     * IsJsonSQLite
     * @param obj
     */
    isJsonSQLite(obj) {
        const keyFirstLevel = [
            'database',
            'version',
            'overwrite',
            'encrypted',
            'mode',
            'tables',
            'views',
        ];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyFirstLevel.indexOf(key) === -1)
                return false;
            if (key === 'database' && typeof obj[key] != 'string')
                return false;
            if (key === 'version' && typeof obj[key] != 'number')
                return false;
            if (key === 'overwrite' && typeof obj[key] != 'boolean')
                return false;
            if (key === 'encrypted' && typeof obj[key] != 'boolean')
                return false;
            if (key === 'mode' && typeof obj[key] != 'string')
                return false;
            if (key === 'tables' && typeof obj[key] != 'object')
                return false;
            if (key === 'tables') {
                for (const oKey of obj[key]) {
                    const retTable = this.isTable(oKey);
                    if (!retTable)
                        return false;
                }
            }
            if (key === 'views' && typeof obj[key] != 'object')
                return false;
            if (key === 'views') {
                for (const oKey of obj[key]) {
                    const retView = this.isView(oKey);
                    if (!retView)
                        return false;
                }
            }
        }
        return true;
    }
    /**
     * IsTable
     * @param obj
     */
    isTable(obj) {
        const keyTableLevel = [
            'name',
            'schema',
            'indexes',
            'triggers',
            'values',
        ];
        let nbColumn = 0;
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyTableLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'schema' && typeof obj[key] != 'object')
                return false;
            if (key === 'indexes' && typeof obj[key] != 'object')
                return false;
            if (key === 'triggers' && typeof obj[key] != 'object')
                return false;
            if (key === 'values' && typeof obj[key] != 'object')
                return false;
            if (key === 'schema') {
                obj['schema'].forEach((element) => {
                    if (element.column) {
                        nbColumn++;
                    }
                });
                for (let i = 0; i < nbColumn; i++) {
                    const retSchema = this.isSchema(obj[key][i]);
                    if (!retSchema)
                        return false;
                }
            }
            if (key === 'indexes') {
                for (const oKey of obj[key]) {
                    const retIndexes = this.isIndexes(oKey);
                    if (!retIndexes)
                        return false;
                }
            }
            if (key === 'triggers') {
                for (const oKey of obj[key]) {
                    const retTriggers = this.isTriggers(oKey);
                    if (!retTriggers)
                        return false;
                }
            }
            if (key === 'values') {
                if (nbColumn > 0) {
                    for (const oKey of obj[key]) {
                        if (typeof oKey != 'object' || oKey.length != nbColumn)
                            return false;
                    }
                }
            }
        }
        return true;
    }
    /**
     * IsSchema
     * @param obj
     */
    isSchema(obj) {
        const keySchemaLevel = [
            'column',
            'value',
            'foreignkey',
            'primarykey',
            'constraint',
        ];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keySchemaLevel.indexOf(key) === -1)
                return false;
            if (key === 'column' && typeof obj[key] != 'string')
                return false;
            if (key === 'value' && typeof obj[key] != 'string')
                return false;
            if (key === 'foreignkey' && typeof obj[key] != 'string')
                return false;
            if (key === 'primarykey' && typeof obj[key] != 'string')
                return false;
            if (key === 'constraint' && typeof obj[key] != 'string')
                return false;
        }
        return true;
    }
    /**
     * isIndexes
     * @param obj
     */
    isIndexes(obj) {
        const keyIndexesLevel = ['name', 'value', 'mode'];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyIndexesLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'value' && typeof obj[key] != 'string')
                return false;
            if (key === 'mode' &&
                (typeof obj[key] != 'string' || obj[key].toUpperCase() != 'UNIQUE'))
                return false;
        }
        return true;
    }
    /**
     * isTriggers
     * @param obj
     */
    isTriggers(obj) {
        const keyTriggersLevel = [
            'name',
            'timeevent',
            'condition',
            'logic',
        ];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyTriggersLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'timeevent' && typeof obj[key] != 'string')
                return false;
            if (key === 'condition' && typeof obj[key] != 'string')
                return false;
            if (key === 'logic' && typeof obj[key] != 'string')
                return false;
        }
        return true;
    }
    /**
     * IsViews
     * @param obj
     */
    isView(obj) {
        const keyViewLevel = ['name', 'value'];
        if (obj == null ||
            (Object.keys(obj).length === 0 && obj.constructor === Object))
            return false;
        for (const key of Object.keys(obj)) {
            if (keyViewLevel.indexOf(key) === -1)
                return false;
            if (key === 'name' && typeof obj[key] != 'string')
                return false;
            if (key === 'value' && typeof obj[key] != 'string')
                return false;
        }
        return true;
    }
    /**
     * checkSchemaValidity
     * @param schema
     */
    checkSchemaValidity(schema) {
        const msg = 'CheckSchemaValidity';
        for (let i = 0; i < schema.length; i++) {
            const sch = {};
            const keys = Object.keys(schema[i]);
            if (keys.includes('column')) {
                sch.column = schema[i].column;
            }
            if (keys.includes('value')) {
                sch.value = schema[i].value;
            }
            if (keys.includes('foreignkey')) {
                sch.foreignkey = schema[i].foreignkey;
            }
            if (keys.includes('constraint')) {
                sch.constraint = schema[i].constraint;
            }
            const isValid = this.isSchema(sch);
            if (!isValid) {
                throw new Error(`${msg} schema[${i}] not valid`);
            }
        }
        return;
    }
    /**
     * checkIndexesSchemaValidity
     * @param indexes
     */
    checkIndexesValidity(indexes) {
        const msg = 'CheckIndexesValidity';
        for (let i = 0; i < indexes.length; i++) {
            const index = {};
            const keys = Object.keys(indexes[i]);
            if (keys.includes('value')) {
                index.value = indexes[i].value;
            }
            if (keys.includes('name')) {
                index.name = indexes[i].name;
            }
            if (keys.includes('mode')) {
                index.mode = indexes[i].mode;
            }
            const isValid = this.isIndexes(index);
            if (!isValid) {
                throw new Error(`${msg} indexes[${i}] not valid`);
            }
        }
        return;
    }
    /**
     * checkTriggersValidity
     * @param triggers
     */
    checkTriggersValidity(triggers) {
        const msg = 'CheckTriggersValidity';
        for (let i = 0; i < triggers.length; i++) {
            const trigger = {};
            const keys = Object.keys(triggers[i]);
            if (keys.includes('logic')) {
                trigger.logic = triggers[i].logic;
            }
            if (keys.includes('name')) {
                trigger.name = triggers[i].name;
            }
            if (keys.includes('timeevent')) {
                trigger.timeevent = triggers[i].timeevent;
            }
            if (keys.includes('condition')) {
                trigger.condition = triggers[i].condition;
            }
            const isValid = this.isTriggers(trigger);
            if (!isValid) {
                throw new Error(`${msg} triggers[${i}] not valid`);
            }
        }
        return;
    }
    /**
     * checkViewsValidity
     * @param views
     */
    checkViewsValidity(views) {
        const msg = 'CheckViewsValidity';
        for (let i = 0; i < views.length; i++) {
            const view = {};
            const keys = Object.keys(views[i]);
            if (keys.includes('value')) {
                view.value = views[i].value;
            }
            if (keys.includes('name')) {
                view.name = views[i].name;
            }
            const isValid = this.isView(view);
            if (!isValid) {
                throw new Error(`${msg} views[${i}] not valid`);
            }
        }
        return;
    }
    /**
     * CreateView
     * @param mDB
     * @param table
     */
    createView(mDB, view) {
        const msg = 'CreateView';
        const stmt = `CREATE VIEW IF NOT EXISTS ${view.name} AS ${view.value};`;
        try {
            const results = this.sqliteUtil.execute(mDB, stmt, true);
            if (results.changes < 0) {
                throw new Error(`${msg} ${view.name} failed`);
            }
            return results;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
}
utilsJson.UtilsJson = UtilsJson;

Object.defineProperty(exportToJson, "__esModule", { value: true });
exportToJson.ExportToJson = void 0;
const utilsSQLite_1$7 = utilsSQLite;
const utilsJson_1$3 = utilsJson;
class ExportToJson {
    constructor() {
        this.sqliteUtil = new utilsSQLite_1$7.UtilsSQLite();
        this.jsonUtil = new utilsJson_1$3.UtilsJson();
    }
    /**
     * CreateExportObject
     * @param mDB
     * @param sqlObj
     */
    createExportObject(mDB, sqlObj) {
        const msg = 'CreateExportObject';
        const retObj = {};
        let tables = [];
        let views = [];
        let errmsg = '';
        try {
            // get View's name
            views = this.getViewsName(mDB);
            // get Table's name
            const resTables = this.getTablesNameSQL(mDB);
            if (resTables.length === 0) {
                throw new Error(`${msg} table's names failed`);
            }
            else {
                const isTable = this.jsonUtil.isTableExists(mDB, true, 'sync_table');
                if (!isTable && sqlObj.mode === 'partial') {
                    throw new Error(`${msg} No sync_table available`);
                }
                switch (sqlObj.mode) {
                    case 'partial': {
                        tables = this.getTablesPartial(mDB, resTables);
                        break;
                    }
                    case 'full': {
                        tables = this.getTablesFull(mDB, resTables);
                        break;
                    }
                    default: {
                        errmsg = `${msg} expMode ${sqlObj.mode} not defined`;
                        break;
                    }
                }
                if (errmsg.length > 0) {
                    throw new Error(errmsg);
                }
                if (tables.length > 0) {
                    retObj.database = sqlObj.database;
                    retObj.version = sqlObj.version;
                    retObj.encrypted = sqlObj.encrypted;
                    retObj.mode = sqlObj.mode;
                    retObj.tables = tables;
                    if (views.length > 0) {
                        retObj.views = views;
                    }
                }
                return retObj;
            }
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * GetTablesNameSQL
     * @param mDb
     */
    getTablesNameSQL(mDb) {
        const msg = 'GetTablesNameSQL';
        let sql = 'SELECT name,sql FROM sqlite_master WHERE ';
        sql += "type='table' AND name NOT LIKE 'sync_table' ";
        sql += "AND name NOT LIKE '_temp_%' ";
        sql += "AND name NOT LIKE 'sqlite_%';";
        let retQuery = [];
        try {
            retQuery = this.sqliteUtil.queryAll(mDb, sql, []);
            return retQuery;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    getLastExportDate(mDb) {
        const msg = 'GetLastExportDate';
        let retDate = -1;
        try {
            // get the last sync date
            const stmt = `SELECT sync_date FROM sync_table WHERE id = ?;`;
            const row = this.sqliteUtil.queryOne(mDb, stmt, [2]);
            if (row != null) {
                const key = Object.keys(row)[0];
                retDate = row[key];
            }
            return retDate;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * SetLastExportDate
     * @param mDb
     * @param lastExportedDate
     * @returns
     */
    setLastExportDate(mDb, lastExportedDate) {
        const msg = 'SetLastExportDate';
        try {
            const isTable = this.jsonUtil.isTableExists(mDb, true, 'sync_table');
            if (!isTable) {
                throw new Error(`${msg} No sync_table available`);
            }
            const sDate = Math.round(new Date(lastExportedDate).getTime() / 1000);
            let stmt = '';
            if (this.getLastExportDate(mDb) > 0) {
                stmt = `UPDATE sync_table SET sync_date = ${sDate} WHERE id = 2;`;
            }
            else {
                stmt = `INSERT INTO sync_table (sync_date) VALUES (${sDate});`;
            }
            const results = this.sqliteUtil.execute(mDb, stmt, false);
            if (results.changes < 0) {
                return { result: false, message: `${msg} failed` };
            }
            else {
                return { result: true };
            }
        }
        catch (err) {
            return {
                result: false,
                message: `${msg} ${err.message}`,
            };
        }
    }
    delExportedRows(mDb) {
        const msg = 'DelExportedRows';
        let lastExportDate;
        try {
            // check if synchronization table exists
            const isTable = this.jsonUtil.isTableExists(mDb, true, 'sync_table');
            if (!isTable) {
                throw new Error(`${msg} No sync_table available`);
            }
            // get the last export date
            lastExportDate = this.getLastExportDate(mDb);
            if (lastExportDate < 0) {
                throw new Error(`${msg} no last exported date available`);
            }
            // get the table' name list
            const resTables = this.sqliteUtil.getTablesNames(mDb);
            if (resTables.length === 0) {
                throw new Error(`${msg} No table's names returned`);
            }
            // Loop through the tables
            for (const table of resTables) {
                // define the delete statement
                const delStmt = `DELETE FROM ${table}
              WHERE sql_deleted = 1 AND last_modified < ${lastExportDate};`;
                const results = this.sqliteUtil.prepareRun(mDb, delStmt, [], true, 'no');
                if (results.lastId < 0) {
                    throw new Error(`${msg} lastId < 0`);
                }
            }
            return;
        }
        catch (err) {
            throw new Error(`${msg} failed: ${err.message}`);
        }
    }
    /**
     * GetViewsNameSQL
     * @param mDb
     */
    getViewsName(mDb) {
        const views = [];
        let sql = 'SELECT name,sql FROM sqlite_master WHERE ';
        sql += "type='view' AND name NOT LIKE 'sqlite_%';";
        let retQuery = [];
        try {
            retQuery = this.sqliteUtil.queryAll(mDb, sql, []);
            for (const query of retQuery) {
                const view = {};
                view.name = query.name;
                view.value = query.sql.substring(query.sql.indexOf('AS ') + 3);
                views.push(view);
            }
            return views;
        }
        catch (err) {
            throw new Error(`getViewsName: ${err}`);
        }
    }
    /**
     * GetSyncDate
     * @param mDb
     */
    getSyncDate(mDb) {
        const msg = 'GetSyncDate';
        let retDate = -1;
        // get the last sync date
        const stmt = `SELECT sync_date FROM sync_table WHERE id = ?;`;
        const row = this.sqliteUtil.queryOne(mDb, stmt, [1]);
        if (row != null) {
            const key = Object.keys(row)[0];
            retDate = row[key];
            return retDate;
        }
        else {
            throw new Error(`${msg} no syncDate`);
        }
    }
    /**
     * GetTablesFull
     * @param mDb
     * @param resTables
     */
    getTablesFull(mDb, resTables) {
        const msg = 'GetTablesFull';
        const tables = [];
        let errmsg = '';
        try {
            // Loop through the tables
            for (const rTable of resTables) {
                let tableName;
                let sqlStmt;
                if (rTable.name) {
                    tableName = rTable.name;
                }
                else {
                    errmsg = `${msg} no name`;
                    break;
                }
                if (rTable.sql) {
                    sqlStmt = rTable.sql;
                }
                else {
                    errmsg = `${msg} no sql`;
                    break;
                }
                const table = {};
                // create Table's Schema
                const schema = this.getSchema(sqlStmt);
                if (schema.length === 0) {
                    errmsg = `${msg} no Schema returned`;
                    break;
                }
                // check schema validity
                this.jsonUtil.checkSchemaValidity(schema);
                // create Table's indexes if any
                const indexes = this.getIndexes(mDb, tableName);
                if (indexes.length > 0) {
                    // check indexes validity
                    this.jsonUtil.checkIndexesValidity(indexes);
                }
                // create Table's triggers if any
                const triggers = this.getTriggers(mDb, tableName);
                if (triggers.length > 0) {
                    // check triggers validity
                    this.jsonUtil.checkTriggersValidity(triggers);
                }
                // create Table's Data
                const query = `SELECT * FROM ${tableName};`;
                const values = this.jsonUtil.getValues(mDb, query, tableName);
                table.name = tableName;
                if (schema.length > 0) {
                    table.schema = schema;
                }
                else {
                    errmsg = `${msg} must contain schema`;
                    break;
                }
                if (indexes.length > 0) {
                    table.indexes = indexes;
                }
                if (triggers.length > 0) {
                    table.triggers = triggers;
                }
                if (values.length > 0) {
                    table.values = values;
                }
                if (Object.keys(table).length <= 1) {
                    errmsg = `${msg} table ${tableName} is not a jsonTable`;
                    break;
                }
                tables.push(table);
            }
            if (errmsg.length > 0) {
                throw new Error(errmsg);
            }
            return tables;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * GetSchema
     * @param mDb
     * @param sqlStmt
     * @param tableName
     */
    getSchema(sqlStmt /*,tableName: string,*/) {
        const msg = 'GetSchema';
        const schema = [];
        // take the substring between parenthesis
        const openPar = sqlStmt.indexOf('(');
        const closePar = sqlStmt.lastIndexOf(')');
        let sstr = sqlStmt.substring(openPar + 1, closePar);
        // check if there is other parenthesis and replace the ',' by '§'
        try {
            sstr = this.modEmbeddedParentheses(sstr);
            const sch = sstr.split(',');
            // for each element of the array split the
            // first word as key
            for (const sc of sch) {
                const row = [];
                const scht = sc.replace(/\n/g, '').trim();
                row[0] = scht.substring(0, scht.indexOf(' '));
                row[1] = scht.substring(scht.indexOf(' ') + 1);
                const jsonRow = {};
                if (row[0].toUpperCase() === 'FOREIGN') {
                    const oPar = scht.indexOf('(');
                    const cPar = scht.indexOf(')');
                    const fk = scht.substring(oPar + 1, cPar);
                    const fknames = fk.split('§');
                    row[0] = fknames.join(',');
                    row[0] = row[0].replace(/, /g, ',');
                    row[1] = scht.substring(cPar + 2);
                    jsonRow['foreignkey'] = row[0];
                }
                else if (row[0].toUpperCase() === 'PRIMARY') {
                    const oPar = scht.indexOf('(');
                    const cPar = scht.indexOf(')');
                    const pk = scht.substring(oPar + 1, cPar);
                    const pknames = pk.split('§');
                    row[0] = 'CPK_' + pknames.join('_');
                    row[0] = row[0].replace(/_ /g, '_');
                    row[1] = scht;
                    jsonRow['constraint'] = row[0];
                }
                else if (row[0].toUpperCase() === 'CONSTRAINT') {
                    const tRow = [];
                    const row1t = row[1].trim();
                    tRow[0] = row1t.substring(0, row1t.indexOf(' '));
                    tRow[1] = row1t.substring(row1t.indexOf(' ') + 1);
                    row[0] = tRow[0];
                    jsonRow['constraint'] = row[0];
                    row[1] = tRow[1];
                }
                else {
                    jsonRow['column'] = row[0];
                }
                jsonRow['value'] = row[1].replace(/§/g, ',');
                schema.push(jsonRow);
            }
            return schema;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * GetIndexes
     * @param mDb
     * @param sqlStmt
     * @param tableName
     */
    getIndexes(mDb, tableName) {
        const msg = 'GetIndexes';
        const indexes = [];
        let errmsg = '';
        try {
            let stmt = 'SELECT name,tbl_name,sql FROM sqlite_master WHERE ';
            stmt += `type = 'index' AND tbl_name = '${tableName}' `;
            stmt += `AND sql NOTNULL;`;
            const retIndexes = this.sqliteUtil.queryAll(mDb, stmt, []);
            if (retIndexes.length > 0) {
                for (const rIndex of retIndexes) {
                    const keys = Object.keys(rIndex);
                    if (keys.length === 3) {
                        if (rIndex['tbl_name'] === tableName) {
                            const sql = rIndex['sql'];
                            const mode = sql.includes('UNIQUE') ? 'UNIQUE' : '';
                            const oPar = sql.lastIndexOf('(');
                            const cPar = sql.lastIndexOf(')');
                            const index = {};
                            index.name = rIndex['name'];
                            index.value = sql.slice(oPar + 1, cPar);
                            if (mode.length > 0)
                                index.mode = mode;
                            indexes.push(index);
                        }
                        else {
                            errmsg = `${msg} Table ${tableName} doesn't match`;
                            break;
                        }
                    }
                    else {
                        errmsg = `${msg} Table ${tableName} creating indexes`;
                        break;
                    }
                }
                if (errmsg.length > 0) {
                    throw new Error(errmsg);
                }
            }
            return indexes;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * GetTriggers
     * @param mDb
     * @param sqlStmt
     * @param tableName
     */
    getTriggers(mDb, tableName) {
        const msg = 'GetTriggers';
        const triggers = [];
        try {
            let stmt = 'SELECT name,tbl_name,sql FROM sqlite_master WHERE ';
            stmt += `type = 'trigger' AND tbl_name = '${tableName}' `;
            stmt += `AND sql NOT NULL;`;
            const retTriggers = this.sqliteUtil.queryAll(mDb, stmt, []);
            if (retTriggers.length > 0) {
                for (const rTrg of retTriggers) {
                    const keys = Object.keys(rTrg);
                    if (keys.length === 3) {
                        if (rTrg['tbl_name'] === tableName) {
                            const sql = rTrg['sql'];
                            const name = rTrg['name'];
                            let sqlArr = sql.split(name);
                            if (sqlArr.length != 2) {
                                throw new Error(`${msg} sql split name does not return 2 values`);
                            }
                            if (!sqlArr[1].includes(tableName)) {
                                throw new Error(`${msg} sql split does not contains ${tableName}`);
                            }
                            const timeEvent = sqlArr[1].split(tableName, 1)[0].trim();
                            sqlArr = sqlArr[1].split(timeEvent + ' ' + tableName);
                            if (sqlArr.length != 2) {
                                throw new Error(`${msg} sql split tableName does not return 2 values`);
                            }
                            let condition = '';
                            let logic = '';
                            if (sqlArr[1].trim().substring(0, 5).toUpperCase() !== 'BEGIN') {
                                sqlArr = sqlArr[1].trim().split('BEGIN');
                                if (sqlArr.length != 2) {
                                    throw new Error(`${msg} sql split BEGIN does not return 2 values`);
                                }
                                condition = sqlArr[0].trim();
                                logic = 'BEGIN' + sqlArr[1];
                            }
                            else {
                                logic = sqlArr[1].trim();
                            }
                            const trigger = {};
                            trigger.name = name;
                            trigger.logic = logic;
                            if (condition.length > 0)
                                trigger.condition = condition;
                            trigger.timeevent = timeEvent;
                            triggers.push(trigger);
                        }
                        else {
                            throw new Error(`${msg} Table ${tableName} doesn't match`);
                        }
                    }
                    else {
                        throw new Error(`${msg} Table ${tableName} creating indexes`);
                    }
                }
            }
            return triggers;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * GetTablesPartial
     * @param mDb
     * @param resTables
     */
    getTablesPartial(mDb, resTables) {
        const msg = 'GetTablesPartial';
        const tables = [];
        let modTables = {};
        let syncDate = 0;
        let modTablesKeys = [];
        let errmsg = '';
        try {
            // Get the syncDate and the Modified Tables
            const partialModeData = this.getPartialModeData(mDb, resTables);
            if (Object.keys(partialModeData).includes('syncDate')) {
                syncDate = partialModeData.syncDate;
            }
            if (Object.keys(partialModeData).includes('modTables')) {
                modTables = partialModeData.modTables;
                modTablesKeys = Object.keys(modTables);
            }
            // Loop trough tables
            for (const rTable of resTables) {
                let tableName = '';
                let sqlStmt = '';
                if (rTable.name) {
                    tableName = rTable.name;
                }
                else {
                    errmsg = `${msg} no name`;
                    break;
                }
                if (rTable.sql) {
                    sqlStmt = rTable.sql;
                }
                else {
                    errmsg = `${msg} no sql`;
                    break;
                }
                if (modTablesKeys.length == 0 ||
                    modTablesKeys.indexOf(tableName) === -1 ||
                    modTables[tableName] == 'No') {
                    continue;
                }
                const table = {};
                let schema = [];
                let indexes = [];
                let triggers = [];
                table.name = rTable;
                if (modTables[table.name] === 'Create') {
                    // create Table's Schema
                    schema = this.getSchema(sqlStmt);
                    if (schema.length > 0) {
                        // check schema validity
                        this.jsonUtil.checkSchemaValidity(schema);
                    }
                    // create Table's indexes if any
                    indexes = this.getIndexes(mDb, tableName);
                    if (indexes.length > 0) {
                        // check indexes validity
                        this.jsonUtil.checkIndexesValidity(indexes);
                    }
                    // create Table's triggers if any
                    triggers = this.getTriggers(mDb, tableName);
                    if (triggers.length > 0) {
                        // check triggers validity
                        this.jsonUtil.checkTriggersValidity(triggers);
                    }
                }
                // create Table's Data
                let query = '';
                if (modTables[tableName] === 'Create') {
                    query = `SELECT * FROM ${tableName};`;
                }
                else {
                    query =
                        `SELECT * FROM ${tableName} ` +
                            `WHERE last_modified > ${syncDate};`;
                }
                const values = this.jsonUtil.getValues(mDb, query, tableName);
                // check the table object validity
                table.name = tableName;
                if (schema.length > 0) {
                    table.schema = schema;
                }
                if (indexes.length > 0) {
                    table.indexes = indexes;
                }
                if (triggers.length > 0) {
                    table.triggers = triggers;
                }
                if (values.length > 0) {
                    table.values = values;
                }
                if (Object.keys(table).length <= 1) {
                    errmsg = `${msg} table ${tableName} is not a jsonTable`;
                    break;
                }
                tables.push(table);
            }
            if (errmsg.length > 0) {
                throw new Error(errmsg);
            }
            return tables;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    /**
     * GetPartialModeData
     * @param mDb
     * @param resTables
     */
    getPartialModeData(mDb, resTables) {
        const msg = 'GetPartialModeData';
        const retData = {};
        try {
            // get the synchronization date
            const syncDate = this.getSyncDate(mDb);
            if (syncDate <= 0) {
                throw new Error(`${msg} no syncDate`);
            }
            // get the tables which have been updated
            // since last synchronization
            const modTables = this.getTablesModified(mDb, resTables, syncDate);
            if (modTables.length <= 0) {
                throw new Error(`${msg} no modTables`);
            }
            retData.syncDate = syncDate;
            retData.modTables = modTables;
            return retData;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    getTablesModified(mDb, tables, syncDate) {
        const msg = 'GetTablesModified';
        let errmsg = '';
        try {
            const retModified = {};
            for (const rTable of tables) {
                let mode;
                // get total count of the table
                let stmt = 'SELECT count(*) AS tcount  ';
                stmt += `FROM ${rTable.name};`;
                let retQuery = this.sqliteUtil.queryAll(mDb, stmt, []);
                if (retQuery.length != 1) {
                    errmsg = `${msg} total count not returned`;
                    break;
                }
                const totalCount = retQuery[0]['tcount'];
                // get total count of modified since last sync
                stmt = 'SELECT count(*) AS mcount FROM ';
                stmt += `${rTable.name} WHERE last_modified > `;
                stmt += `${syncDate};`;
                retQuery = this.sqliteUtil.queryAll(mDb, stmt, []);
                if (retQuery.length != 1)
                    break;
                const totalModifiedCount = retQuery[0]['mcount'];
                if (totalModifiedCount === 0) {
                    mode = 'No';
                }
                else if (totalCount === totalModifiedCount) {
                    mode = 'Create';
                }
                else {
                    mode = 'Modified';
                }
                const key = rTable.name;
                retModified[key] = mode;
            }
            if (errmsg.length > 0) {
                throw new Error(errmsg);
            }
            return retModified;
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
    }
    modEmbeddedParentheses(sstr) {
        const msg = 'ModEmbeddedParentheses';
        const oParArray = this.indexOfChar(sstr, '(');
        const cParArray = this.indexOfChar(sstr, ')');
        if (oParArray.length != cParArray.length) {
            throw new Error(`${msg} Not same number of '(' & ')'`);
        }
        if (oParArray.length === 0) {
            return sstr;
        }
        let resStmt = sstr.substring(0, oParArray[0] - 1);
        for (let i = 0; i < oParArray.length; i++) {
            let str;
            if (i < oParArray.length - 1) {
                if (oParArray[i + 1] < cParArray[i]) {
                    str = sstr.substring(oParArray[i] - 1, cParArray[i + 1]);
                    i++;
                }
                else {
                    str = sstr.substring(oParArray[i] - 1, cParArray[i]);
                }
            }
            else {
                str = sstr.substring(oParArray[i] - 1, cParArray[i]);
            }
            const newS = str.replace(/,/g, '§');
            resStmt += newS;
            if (i < oParArray.length - 1) {
                resStmt += sstr.substring(cParArray[i], oParArray[i + 1] - 1);
            }
        }
        resStmt += sstr.substring(cParArray[cParArray.length - 1], sstr.length);
        return resStmt;
    }
    indexOfChar(str, char) {
        const tmpArr = [...str];
        char = char.toLowerCase();
        return tmpArr.reduce((results, elem, idx) => elem.toLowerCase() === char ? [...results, idx] : results, []);
    }
}
exportToJson.ExportToJson = ExportToJson;

var importFromJson = {};

var utilsDrop = {};

Object.defineProperty(utilsDrop, "__esModule", { value: true });
utilsDrop.UtilsDrop = void 0;
const utilsSQLite_1$6 = utilsSQLite;
class UtilsDrop {
    constructor() {
        this.sqliteUtil = new utilsSQLite_1$6.UtilsSQLite();
    }
    /**
     * DropElements
     * @param db
     * @param type ["table","index","trigger"]
     */
    dropElements(db, type) {
        let msg = '';
        let stmt1 = `AND name NOT LIKE ('sqlite_%')`;
        switch (type) {
            case 'index':
                msg = 'DropIndexes';
                break;
            case 'trigger':
                msg = 'DropTriggers';
                break;
            case 'table':
                msg = 'DropTables';
                stmt1 += ` AND name NOT IN ('sync_table')`;
                break;
            case 'view':
                msg = 'DropViews';
                break;
            default:
                throw new Error(`DropElements: ${type} ` + 'not found');
        }
        // get the element's names
        let stmt = 'SELECT name FROM sqlite_master WHERE ';
        stmt += `type = '${type}' ${stmt1};`;
        try {
            const elements = this.sqliteUtil.queryAll(db, stmt, []);
            if (elements.length > 0) {
                const upType = type.toUpperCase();
                const statements = [];
                for (const elem of elements) {
                    let stmt = `DROP ${upType} IF EXISTS `;
                    stmt += `${elem.name};`;
                    statements.push(stmt);
                }
                for (const stmt of statements) {
                    const results = this.sqliteUtil.prepareRun(db, stmt, [], false, 'no');
                    if (results.lastId < 0) {
                        throw new Error(`${msg}: lastId < 0`);
                    }
                }
            }
            return;
        }
        catch (err) {
            throw new Error(`${msg}: ${err}`);
        }
    }
    /**
     * DropAll
     * Drop all database's elements
     * @param db
     */
    dropAll(db) {
        try {
            // drop tables
            this.dropElements(db, 'table');
            // drop indexes
            this.dropElements(db, 'index');
            // drop triggers
            this.dropElements(db, 'trigger');
            // drop views
            this.dropElements(db, 'view');
            // vacuum the database
            this.sqliteUtil.prepareRun(db, 'VACUUM;', [], false, 'no');
            return;
        }
        catch (err) {
            throw new Error(`DropAll: ${err}`);
        }
    }
    /**
     * DropTempTables
     * @param db
     * @param alterTables
     */
    dropTempTables(db, alterTables) {
        const tempTables = Object.keys(alterTables);
        const statements = [];
        for (const tTable of tempTables) {
            let stmt = 'DROP TABLE IF EXISTS ';
            stmt += `_temp_${tTable};`;
            statements.push(stmt);
        }
        try {
            const results = this.sqliteUtil.execute(db, statements.join('\n'), false);
            if (results.changes < 0) {
                throw new Error('DropTempTables: changes < 0');
            }
            return;
        }
        catch (err) {
            throw new Error(`DropTempTables: ${err}`);
        }
    }
}
utilsDrop.UtilsDrop = UtilsDrop;

Object.defineProperty(importFromJson, "__esModule", { value: true });
importFromJson.ImportFromJson = void 0;
const utilsDrop_1 = utilsDrop;
const utilsSQLite_1$5 = utilsSQLite;
const utilsJson_1$2 = utilsJson;
class ImportFromJson {
    constructor() {
        this.jsonUtil = new utilsJson_1$2.UtilsJson();
        this.sqliteUtil = new utilsSQLite_1$5.UtilsSQLite();
        this.dropUtil = new utilsDrop_1.UtilsDrop();
    }
    /**
     * CreateDatabaseSchema
     * @param mDB
     * @param jsonData
     */
    createDatabaseSchema(mDB, jsonData) {
        let changes = -1;
        const version = jsonData.version;
        try {
            // set User Version PRAGMA
            this.sqliteUtil.setVersion(mDB, version);
            // DROP ALL when mode="full"
            if (jsonData.mode === 'full') {
                this.dropUtil.dropAll(mDB);
            }
            // create database schema
            changes = this.jsonUtil.createSchema(mDB, jsonData);
            return changes;
        }
        catch (err) {
            throw new Error('CreateDatabaseSchema: ' + `${err}`);
        }
    }
    createTablesData(mDB, jsonData) {
        const msg = 'CreateTablesData';
        let results;
        let isValue = false;
        let message = '';
        try {
            // start a transaction
            this.sqliteUtil.beginTransaction(mDB, true);
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
        for (const jTable of jsonData.tables) {
            if (jTable.values != null && jTable.values.length >= 1) {
                // Create the table's data
                try {
                    results = this.jsonUtil.createDataTable(mDB, jTable, jsonData.mode);
                    if (results.lastId < 0)
                        break;
                    isValue = true;
                }
                catch (err) {
                    message = err;
                    isValue = false;
                    break;
                }
            }
        }
        if (isValue) {
            try {
                this.sqliteUtil.commitTransaction(mDB, true);
                return results.changes;
            }
            catch (err) {
                throw new Error(`${msg} ${err}`);
            }
        }
        else {
            if (message.length > 0) {
                try {
                    this.sqliteUtil.rollbackTransaction(mDB, true);
                    throw new Error(`${msg} ${message}`);
                }
                catch (err) {
                    throw new Error(`${msg} ${err}: ${message}`);
                }
            }
            else {
                // case were no values given
                return 0;
            }
        }
    }
    /**
     * CreateViews
     * @param mDB
     * @param jsonData
     */
    createViews(mDB, jsonData) {
        const msg = 'CreateViews';
        let isView = false;
        let message = '';
        let results;
        try {
            // start a transaction
            this.sqliteUtil.beginTransaction(mDB, true);
        }
        catch (err) {
            throw new Error(`${msg} ${err}`);
        }
        for (const jView of jsonData.views) {
            if (jView.value != null) {
                // Create the view
                try {
                    results = this.jsonUtil.createView(mDB, jView);
                    isView = true;
                }
                catch (err) {
                    message = err;
                    isView = false;
                    break;
                }
            }
        }
        if (isView) {
            try {
                this.sqliteUtil.commitTransaction(mDB, true);
                return results.changes;
            }
            catch (err) {
                throw new Error(`${msg} ${err}`);
            }
        }
        else {
            if (message.length > 0) {
                try {
                    this.sqliteUtil.rollbackTransaction(mDB, true);
                    throw new Error(`${msg} ${message}`);
                }
                catch (err) {
                    throw new Error(`${msg} ${err}: ${message}`);
                }
            }
            else {
                // case were no views given
                return 0;
            }
        }
    }
}
importFromJson.ImportFromJson = ImportFromJson;

var utilsJsonEncryption = {};

var utilsSecret = {};

Object.defineProperty(utilsSecret, "__esModule", { value: true });
utilsSecret.UtilsSecret = void 0;
const GlobalSQLite_1$2 = GlobalSQLite$1;
const utilsFile_1$3 = utilsFile;
const utilsSQLite_1$4 = utilsSQLite;
class UtilsSecret {
    constructor() {
        this.globalUtil = new GlobalSQLite_1$2.GlobalSQLite();
        this.sqliteUtil = new utilsSQLite_1$4.UtilsSQLite();
        this.fileUtil = new utilsFile_1$3.UtilsFile();
        this.storage = require$$3__default$2["default"];
    }
    isSecretStored() {
        const secret = this.getPassphrase();
        if (secret.length <= 0)
            return false;
        return true;
    }
    setEncryptSecret(passphrase) {
        try {
            let oldpassphrase = this.getPassphrase();
            if (oldpassphrase.length > 0) {
                throw new Error(`setEncryptSecret: passphrase already stored`);
            }
            else {
                oldpassphrase = this.globalUtil != null ? this.globalUtil.secret : '';
                if (oldpassphrase.length <= 0) {
                    throw new Error(`setEncryptSecret: globalUtil is null`);
                }
                // check if some databases were encrypted with the initial secret 'sqlite secret'
                this.changeDatabaseSecret(oldpassphrase, passphrase).then(() => {
                    this.storage.set('userData', { passphrase: passphrase }, function (error) {
                        if (error)
                            throw new Error(`setEncryptSecret: ${error.message}`);
                    });
                });
            }
        }
        catch (err) {
            throw new Error(`setEncryptSecret: ${err}`);
        }
    }
    changeEncryptSecret(oldpassphrase, passphrase) {
        try {
            // check if some databases were encrypted with the oldpassphrase
            this.changeDatabaseSecret(oldpassphrase, passphrase).then(() => {
                this.setPassphrase(passphrase);
            });
        }
        catch (err) {
            throw new Error(`changeEncryptSecret: ${err}`);
        }
    }
    clearEncryptSecret() {
        try {
            let oldpassphrase = this.getPassphrase();
            if (oldpassphrase.length <= 0) {
                oldpassphrase = this.globalUtil.secret;
            }
            // check if some databases were encrypted with the oldpassphrase
            this.changeDatabaseSecret(oldpassphrase, '').then(() => {
                this.removePassphrase();
            });
        }
        catch (err) {
            throw new Error(`clearEncryptSecret: ${err}`);
        }
    }
    checkEncryptSecret(passphrase) {
        const storedPassphrase = this.getPassphrase();
        if (storedPassphrase.length <= 0) {
            throw new Error(`checkEncryptSecret: No passphrase stored`);
        }
        if (storedPassphrase === passphrase) {
            return true;
        }
        else {
            return false;
        }
    }
    async changeDatabaseSecret(oldpassphrase, newpassphrase) {
        try {
            // get the database folder
            const pathDatabase = this.fileUtil.getDatabasesPath();
            // get the list of databases
            const files = await this.fileUtil.getFileList(pathDatabase);
            files.forEach(async (dbName) => {
                const filePath = this.fileUtil.getFilePath(dbName);
                const isEncrypt = await this.sqliteUtil.isDBEncrypted(filePath);
                if (isEncrypt) {
                    this.sqliteUtil.changePassword(filePath, oldpassphrase, newpassphrase);
                }
            });
            return;
        }
        catch (err) {
            throw new Error(`changeDatabaseSecret: ${err}`);
        }
    }
    getPassphrase() {
        const data = this.storage.getSync('userData');
        const keys = Object.keys(data);
        if (data == null || keys.length <= 0)
            return '';
        if (Object.keys(data).includes('passphrase')) {
            return data.passphrase;
        }
        else {
            return '';
        }
    }
    setPassphrase(passphrase) {
        const data = this.storage.getSync('userData');
        data.passphrase = passphrase;
        this.storage.set('userData', data, function (error) {
            if (error)
                throw new Error(`setPassphrase: ${error.message}`);
        });
    }
    removePassphrase() {
        const data = this.storage.getSync('userData');
        delete data.passphrase;
        this.storage.set('userData', data, function (error) {
            if (error)
                throw new Error(`removePassphrase: ${error.message}`);
        });
    }
}
utilsSecret.UtilsSecret = UtilsSecret;

Object.defineProperty(utilsJsonEncryption, "__esModule", { value: true });
utilsJsonEncryption.UtilsJsonEncryption = void 0;
const utilsSecret_1$2 = utilsSecret;
class UtilsJsonEncryption {
    constructor() {
        this.fileSecret = new utilsSecret_1$2.UtilsSecret();
        this.SALT = 'jeep_capacitor_sqlite';
        this.Crypto = require$$1__default$1["default"];
        this.CryptoJS = require$$2__default$1["default"];
    }
    /**
     * deriveKeyFromPassphrase
     * Function to derive a symmetric key from passphrase and salt using PBKDF2
     * @param passphrase
     * @param salt
     * @returns
     */
    deriveKeyFromPassphrase(passphrase, salt) {
        const iterations = 10000; // Recommended number of iterations for PBKDF2
        const keyLength = 32;
        const key = this.Crypto.pbkdf2Sync(passphrase, salt, iterations, keyLength, 'sha256');
        const keyHex = Buffer.from(key).toString('hex');
        return keyHex;
    }
    /**
     * encryptJSONObject
     * Function to encrypt JSON object with AES and return as Base64
     * @param jsonObj
     * @returns
     */
    encryptJSONObject(jsonObj) {
        const jsonString = JSON.stringify(jsonObj);
        // get the passphrase
        const passphrase = this.fileSecret.getPassphrase();
        // derived a combined key from passphrase and salt
        const key = this.deriveKeyFromPassphrase(passphrase, this.SALT);
        const encrypted = this.CryptoJS.AES.encrypt(jsonString, key).toString();
        const encryptedBase64 = Buffer.from(encrypted).toString('base64');
        return encryptedBase64;
    }
    /**
     * decryptJSONObject
     * Function to decrypt AES encrypted JSON object from Base64
     * @param encryptedBase64
     * @returns
     */
    decryptJSONObject(encryptedBase64) {
        const encryptedData = Buffer.from(encryptedBase64, 'base64').toString();
        // get the passphrase
        const passphrase = this.fileSecret.getPassphrase();
        // derived a combined key from passphrase and salt
        const key = this.deriveKeyFromPassphrase(passphrase, this.SALT);
        const bytes = this.CryptoJS.AES.decrypt(encryptedData, key);
        const decryptedString = bytes.toString(this.CryptoJS.enc.Utf8);
        const decryptedObj = JSON.parse(decryptedString);
        return decryptedObj;
    }
}
utilsJsonEncryption.UtilsJsonEncryption = UtilsJsonEncryption;

var utilsEncryption = {};

Object.defineProperty(utilsEncryption, "__esModule", { value: true });
utilsEncryption.UtilsEncryption = void 0;
const utilsFile_1$2 = utilsFile;
const utilsSQLite_1$3 = utilsSQLite;
class UtilsEncryption {
    constructor() {
        this.fileUtil = new utilsFile_1$2.UtilsFile();
        this.sqliteUtil = new utilsSQLite_1$3.UtilsSQLite();
    }
    /**
     * EncryptDatabase
     * @param pathDB
     * @param password
     */
    async encryptDatabase(pathDB, password) {
        const msg = 'EncryptDatabase: ';
        const retB = this.fileUtil.isPathExists(pathDB);
        if (retB) {
            try {
                const mDB = await this.sqliteUtil.openOrCreateDatabase(pathDB, '', false);
                this.sqliteUtil.pragmaReKey(mDB, '', password);
                this.sqliteUtil.closeDB(mDB);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(new Error(`${msg} ${err.message} `));
            }
        }
        else {
            return Promise.reject(new Error(`${msg}file path ${pathDB} ` + 'does not exist'));
        }
    }
}
utilsEncryption.UtilsEncryption = UtilsEncryption;

var utilsUpgrade = {};

Object.defineProperty(utilsUpgrade, "__esModule", { value: true });
utilsUpgrade.UtilsUpgrade = void 0;
const utilsSQLite_1$2 = utilsSQLite;
class UtilsUpgrade {
    constructor() {
        this.sqliteUtil = new utilsSQLite_1$2.UtilsSQLite();
    }
    /**
     * OnUpgrade
     * @param mDB
     * @param vUpgDict
     * @param dbName
     * @param curVersion
     * @param targetVersion
     */
    async onUpgrade(mDB, vUpgDict, curVersion, targetVersion) {
        let changes;
        const sortedKeys = new Int32Array(Object.keys(vUpgDict).map(item => parseInt(item))).sort();
        for (const versionKey of sortedKeys) {
            if (versionKey > curVersion && versionKey <= targetVersion) {
                const statements = vUpgDict[versionKey].statements;
                if (statements.length === 0) {
                    return Promise.reject('onUpgrade: statements not given');
                }
                try {
                    // set Foreign Keys Off
                    await this.sqliteUtil.setForeignKeyConstraintsEnabled(mDB, false);
                    const initChanges = await this.sqliteUtil.dbChanges(mDB);
                    await this.executeStatementsProcess(mDB, statements);
                    await this.sqliteUtil.setVersion(mDB, versionKey);
                    // set Foreign Keys On
                    await this.sqliteUtil.setForeignKeyConstraintsEnabled(mDB, true);
                    changes = (await this.sqliteUtil.dbChanges(mDB)) - initChanges;
                }
                catch (err) {
                    return Promise.reject(`onUpgrade: ${err}`);
                }
            }
        }
        return Promise.resolve(changes);
    }
    /**
     * ExecuteStatementProcess
     * @param mDB
     * @param statements
     */
    async executeStatementsProcess(mDB, statements) {
        try {
            await this.sqliteUtil.beginTransaction(mDB, true);
            for (const statement of statements) {
                await this.sqliteUtil.execute(mDB, statement, false);
            }
            await this.sqliteUtil.commitTransaction(mDB, true);
            return Promise.resolve();
        }
        catch (err) {
            await this.sqliteUtil.rollbackTransaction(mDB, true);
            return Promise.reject(`ExecuteStatementProcess: ${err}`);
        }
    }
}
utilsUpgrade.UtilsUpgrade = UtilsUpgrade;

Object.defineProperty(Database$1, "__esModule", { value: true });
Database$1.Database = void 0;
const GlobalSQLite_1$1 = GlobalSQLite$1;
const exportToJson_1 = exportToJson;
const importFromJson_1 = importFromJson;
const utilsJson_1$1 = utilsJson;
const utilsJsonEncryption_1$1 = utilsJsonEncryption;
const utilsEncryption_1 = utilsEncryption;
const utilsFile_1$1 = utilsFile;
const utilsSQLite_1$1 = utilsSQLite;
const utilsSecret_1$1 = utilsSecret;
const utilsUpgrade_1 = utilsUpgrade;
class Database {
    constructor(dbName, encrypted, mode, version, isEncryption, readonly, upgDict, globalUtil) {
        this.jsonEncryptUtil = new utilsJsonEncryption_1$1.UtilsJsonEncryption();
        this.fileUtil = new utilsFile_1$1.UtilsFile();
        this.sqliteUtil = new utilsSQLite_1$1.UtilsSQLite();
        this.jsonUtil = new utilsJson_1$1.UtilsJson();
        this.globalUtil = new GlobalSQLite_1$1.GlobalSQLite();
        this.encryptionUtil = new utilsEncryption_1.UtilsEncryption();
        this.secretUtil = new utilsSecret_1$1.UtilsSecret();
        this.upgradeUtil = new utilsUpgrade_1.UtilsUpgrade();
        this.importFromJsonUtil = new importFromJson_1.ImportFromJson();
        this.exportToJsonUtil = new exportToJson_1.ExportToJson();
        this.upgradeVersionDict = {};
        this.dbName = dbName;
        this._encrypted = encrypted;
        this._mode = mode;
        this._isEncryption = isEncryption;
        this.version = version;
        this.readonly = readonly;
        this.upgradeVersionDict = upgDict;
        this.pathDB = this.fileUtil.getFilePath(dbName);
        this._isDbOpen = false;
        this.globalUtil = globalUtil ? globalUtil : new GlobalSQLite_1$1.GlobalSQLite();
        if (this.pathDB.length === 0)
            throw new Error('Could not generate a path to ' + dbName);
        console.log(`&&& Databases path: ${this.pathDB}`);
    }
    /**
     * IsDBOpen
     * return the database status
     * @param options: capSQLiteOptions
     * @returns boolean
     * @since 0.0.1
     */
    isDBOpen() {
        return this._isDbOpen;
    }
    /**
     * Open
     * open the better-sqlite3 database
     * @returns Promise<boolean>
     */
    async open() {
        this._isDbOpen = false;
        let password = '';
        try {
            if (this._encrypted &&
                (this._mode === 'secret' || this._mode === 'encryption')) {
                password = this.secretUtil.getPassphrase();
                if (password.length <= 0) {
                    password = this.globalUtil.secret;
                }
            }
            if (this._mode === 'encryption') {
                await this.encryptionUtil.encryptDatabase(this.pathDB, password);
            }
            this.database = this.sqliteUtil.openOrCreateDatabase(this.pathDB, password, this.readonly);
            this._isDbOpen = true;
            if (!this.readonly) {
                const curVersion = this.sqliteUtil.getVersion(this.database);
                if (this.version > curVersion &&
                    Object.keys(this.upgradeVersionDict).length > 0) {
                    try {
                        await this.fileUtil.copyFileName(this.dbName, `backup-${this.dbName}`);
                        // execute the upgrade flow process
                        await this.upgradeUtil.onUpgrade(this.database, this.upgradeVersionDict, curVersion, this.version);
                        // delete the backup database
                        await this.fileUtil.deleteFileName(`backup-${this.dbName}`);
                    }
                    catch (err) {
                        // restore the database from backup
                        try {
                            await this.fileUtil.restoreFileName(this.dbName, 'backup');
                        }
                        catch (err) {
                            throw new Error(`Open: ${err}`);
                        }
                    }
                }
            }
            return;
        }
        catch (err) {
            if (this._isDbOpen)
                this.sqliteUtil.closeDB(this.database);
            throw new Error(`Open: ${err}`);
        }
    }
    /**
     * Close
     * close better-sqlite3 database
     * @returns Promise<boolean>
     */
    dbClose() {
        this.ensureDatabaseIsOpen();
        try {
            this.sqliteUtil.closeDB(this.database);
        }
        catch (err) {
            throw new Error(`Close failed: ${this.dbName}  ${err}`);
        }
        finally {
            this._isDbOpen = false;
        }
        return;
    }
    /**
     * ChangeSecret
     * open the @journeyapps/sqlcipher sqlite3 database
     * @returns Promise<void>
     */
    async changeSecret() {
        try {
            if (this._mode === 'encryption') {
                // change the password
                const oPassword = this.globalUtil.secret;
                const nPassword = this.globalUtil.newsecret;
                this.sqliteUtil.changePassword(this.pathDB, oPassword, nPassword);
            }
            return;
        }
        catch (err) {
            throw new Error(`Change secret: ${err}`);
        }
    }
    /**
     * GetVersion
     * get the database version
     * @returns Promise<number>
     */
    getVersion() {
        this.ensureDatabaseIsOpen();
        try {
            const currentVersion = this.sqliteUtil.getVersion(this.database);
            return currentVersion;
        }
        catch (err) {
            if (this._isDbOpen)
                this.sqliteUtil.closeDB(this.database);
            throw new Error(`getVersion: ${err}`);
        }
    }
    /**
     * DeleteDB
     * delete a database
     * @param dbName: string
     * @returns Promise<boolean>
     */
    async deleteDB(dbName) {
        // test if file exists
        const isExists = this.fileUtil.isFileExists(dbName);
        if (isExists && !this._isDbOpen) {
            // open the database
            try {
                await this.open();
            }
            catch (err) {
                throw new Error(`DeleteDB: ${err}`);
            }
        }
        // close the database
        try {
            this.dbClose();
        }
        catch (err) {
            throw new Error('DeleteDB: Close failed');
        }
        // delete the database
        if (isExists) {
            try {
                await this.fileUtil.deleteFileName(dbName);
            }
            catch (err) {
                throw new Error(`DeleteDB: deleteFile ${dbName} failed ${err}`);
            }
        }
        return;
    }
    /**
     * IsTableExists
     * @param tableName
     * @returns
     */
    isTableExists(tableName) {
        this.ensureDatabaseIsOpen();
        const isOpen = this._isDbOpen;
        try {
            const tableExistsResult = this.jsonUtil.isTableExists(this.database, isOpen, tableName);
            return tableExistsResult;
        }
        catch (err) {
            throw new Error(`IsTableExists: ${err}`);
        }
    }
    /**
     * CreateSyncTable
     * create the synchronization table
     * @returns Promise<number>
     */
    createSyncTable() {
        this.ensureDatabaseIsOpen();
        let changes = -1;
        const isOpen = this._isDbOpen;
        // check if the table has already being created
        try {
            const retB = this.jsonUtil.isTableExists(this.database, isOpen, 'sync_table');
            if (!retB) {
                const isLastModified = this.sqliteUtil.isLastModified(this.database, isOpen);
                const isSqlDeleted = this.sqliteUtil.isSqlDeleted(this.database, isOpen);
                if (isLastModified && isSqlDeleted) {
                    const date = Math.round(new Date().getTime() / 1000);
                    let stmts = `
                          CREATE TABLE IF NOT EXISTS sync_table (
                              id INTEGER PRIMARY KEY NOT NULL,
                              sync_date INTEGER
                              );`;
                    stmts += `INSERT INTO sync_table (sync_date) VALUES (
                              ${date});`;
                    const results = this.sqliteUtil.execute(this.database, stmts, false);
                    changes = results.changes;
                    if (results.changes < 0) {
                        throw new Error(`CreateSyncTable: failed changes < 0`);
                    }
                }
                else {
                    throw new Error('No last_modified/sql_deleted columns in tables');
                }
            }
            else {
                changes = 0;
            }
            return changes;
        }
        catch (err) {
            throw new Error(`CreateSyncTable: ${err}`);
        }
    }
    /**
     * SetSyncDate
     * store the synchronization date
     * @param syncDate: string
     * @returns Promise<{result: boolean, message: string}>
     */
    setSyncDate(syncDate) {
        this.ensureDatabaseIsOpen();
        try {
            const isTable = this.jsonUtil.isTableExists(this.database, this._isDbOpen, 'sync_table');
            if (!isTable) {
                throw new Error('No sync_table available');
            }
            const syncDateUnixTimestamp = Math.round(new Date(syncDate).getTime() / 1000);
            let stmt = `UPDATE sync_table SET sync_date = `;
            stmt += `${syncDateUnixTimestamp} WHERE id = 1;`;
            const results = this.sqliteUtil.execute(this.database, stmt, false);
            if (results.changes < 0) {
                return { result: false, message: 'setSyncDate failed' };
            }
            else {
                return { result: true };
            }
        }
        catch (err) {
            return { result: false, message: `setSyncDate failed: ${err}` };
        }
    }
    /**
     * GetSyncDate
     * store the synchronization date
     * @returns Promise<{syncDate: number, message: string}>
     */
    getSyncDate() {
        this.ensureDatabaseIsOpen();
        try {
            const isTable = this.jsonUtil.isTableExists(this.database, this._isDbOpen, 'sync_table');
            if (!isTable) {
                throw new Error('No sync_table available');
            }
            const syncDate = this.exportToJsonUtil.getSyncDate(this.database);
            if (syncDate > 0) {
                return { syncDate };
            }
            else {
                return { syncDate: 0, message: `setSyncDate failed` };
            }
        }
        catch (err) {
            return { syncDate: 0, message: `setSyncDate failed: ${err}` };
        }
    }
    /**
     * ExecuteSQL
     * execute raw sql statements store in a string
     * @param sql: string
     * @returns Promise<number>
     */
    executeSQL(sql, transaction) {
        this.ensureDatabaseIsOpen();
        try {
            if (transaction) {
                const mode = this.sqliteUtil.getJournalMode(this.database);
                console.log(`$$$ in executeSQL journal_mode: ${mode} $$$`);
                this.sqliteUtil.beginTransaction(this.database, this._isDbOpen);
            }
            const results = this.sqliteUtil.execute(this.database, sql, false);
            if (results.changes < 0) {
                throw new Error('ExecuteSQL: changes < 0');
            }
            if (transaction) {
                this.sqliteUtil.commitTransaction(this.database, this._isDbOpen);
            }
            return results.changes;
        }
        catch (executeError) {
            let message = `${executeError}`;
            try {
                if (transaction) {
                    this.sqliteUtil.rollbackTransaction(this.database, this._isDbOpen);
                }
            }
            catch (rollbackErr) {
                message += ` : ${rollbackErr}`;
            }
            throw new Error(`ExecuteSQL: ${message}`);
        }
    }
    /**
     * SelectSQL
     * execute a sql query with/without binding values
     * @param sql: string
     * @param values: string[]
     * @returns Promise<any[]>
     */
    selectSQL(sql, values) {
        this.ensureDatabaseIsOpen();
        try {
            const selectResult = this.sqliteUtil.queryAll(this.database, sql, values);
            return selectResult;
        }
        catch (err) {
            throw new Error(`SelectSQL: ${err}`);
        }
    }
    /**
     * runSQL
     * execute a raw sql statement with/without binding values
     * @param sql: string
     * @param values: string[]
     * @returns Promise<{changes:number, lastId:number}>
     */
    runSQL(statement, values, transaction, returnMode) {
        this.ensureDatabaseIsOpen();
        try {
            // start a transaction
            if (transaction) {
                const mode = this.sqliteUtil.getJournalMode(this.database);
                console.log(`$$$ in runSQL journal_mode: ${mode} $$$`);
                this.sqliteUtil.beginTransaction(this.database, this._isDbOpen);
            }
        }
        catch (err) {
            throw new Error(`RunSQL: ${err}`);
        }
        try {
            const results = this.sqliteUtil.prepareRun(this.database, statement, values, false, returnMode);
            if (results.lastId < 0) {
                if (transaction) {
                    this.sqliteUtil.rollbackTransaction(this.database, this._isDbOpen);
                }
                throw new Error(`RunSQL: return LastId < 0`);
            }
            if (transaction) {
                this.sqliteUtil.commitTransaction(this.database, this._isDbOpen);
            }
            return results;
        }
        catch (err) {
            if (transaction) {
                this.sqliteUtil.rollbackTransaction(this.database, this._isDbOpen);
            }
            throw new Error(`RunSQL: ${err}`);
        }
    }
    /**
     * ExecSet
     * execute a set of raw sql statements with/without binding values
     * @param set: any[]
     * @returns Promise<{changes:number, lastId:number}>
     */
    execSet(set, transaction, returnMode) {
        this.ensureDatabaseIsOpen();
        let results = { changes: 0, lastId: -1 };
        try {
            // start a transaction
            if (transaction) {
                const mode = this.sqliteUtil.getJournalMode(this.database);
                console.log(`$$$ in execSet journal_mode: ${mode} $$$`);
                this.sqliteUtil.beginTransaction(this.database, this._isDbOpen);
            }
        }
        catch (err) {
            throw new Error(`ExecSet: ${err}`);
        }
        try {
            results = this.sqliteUtil.executeSet(this.database, set, false, returnMode);
            if (transaction) {
                this.sqliteUtil.commitTransaction(this.database, this._isDbOpen);
            }
            return results;
        }
        catch (err) {
            const message = err;
            try {
                if (transaction) {
                    this.sqliteUtil.rollbackTransaction(this.database, this._isDbOpen);
                }
            }
            catch (err) {
                throw new Error(`ExecSet: ${message}: ` + `${err}`);
            }
        }
    }
    deleteExportedRows() {
        this.ensureDatabaseIsOpen();
        try {
            this.exportToJsonUtil.delExportedRows(this.database);
            return;
        }
        catch (err) {
            throw new Error(`DeleteExportedRows: ${err}`);
        }
    }
    /**
     * GetTableList
     * get the table's list
     * @returns
     */
    getTableList() {
        this.ensureDatabaseIsOpen();
        try {
            const tableNames = this.sqliteUtil.getTablesNames(this.database);
            return tableNames;
        }
        catch (err) {
            throw new Error(`GetTableList: ${err}`);
        }
    }
    importJson(jsonData) {
        let changes = 0;
        this.ensureDatabaseIsOpen();
        try {
            // set Foreign Keys Off
            this.sqliteUtil.setForeignKeyConstraintsEnabled(this.database, false);
            if (jsonData.tables && jsonData.tables.length > 0) {
                // create the database schema
                changes = this.importFromJsonUtil.createDatabaseSchema(this.database, jsonData);
                if (changes != -1) {
                    // create the tables data
                    changes += this.importFromJsonUtil.createTablesData(this.database, jsonData);
                }
            }
            if (jsonData.views && jsonData.views.length > 0) {
                // create the views
                changes += this.importFromJsonUtil.createViews(this.database, jsonData);
            }
            // set Foreign Keys On
            this.sqliteUtil.setForeignKeyConstraintsEnabled(this.database, true);
            return changes;
        }
        catch (err) {
            throw new Error(`ImportJson: ${err}`);
        }
    }
    exportJson(mode) {
        const inJson = {};
        inJson.database = this.dbName.slice(0, -9);
        inJson.version = this.version;
        inJson.encrypted = false;
        inJson.mode = mode;
        this.ensureDatabaseIsOpen();
        try {
            const isTable = this.jsonUtil.isTableExists(this.database, this._isDbOpen, 'sync_table');
            if (isTable) {
                this.exportToJsonUtil.setLastExportDate(this.database, new Date().toISOString());
            }
            let jsonResult = this.exportToJsonUtil.createExportObject(this.database, inJson);
            const keys = Object.keys(jsonResult);
            if (keys.length === 0) {
                const msg = `ExportJson: return Object is empty ` + `No data to synchronize`;
                throw new Error(msg);
            }
            let isValid = this.jsonUtil.isJsonSQLite(jsonResult);
            if (this._encrypted && this._isEncryption) {
                jsonResult.overwrite = true;
                jsonResult.encrypted = true;
                const base64Str = this.jsonEncryptUtil.encryptJSONObject(jsonResult);
                jsonResult = {};
                jsonResult.expData = base64Str;
                isValid = true;
            }
            if (isValid) {
                return jsonResult;
            }
            else {
                throw new Error(`ExportJson: retJson not valid`);
            }
        }
        catch (err) {
            throw new Error(`ExportJson: ${err}`);
        }
    }
    /**
     * Throws an error if `this._isDbOpen` is `false`.
     */
    ensureDatabaseIsOpen() {
        if (!this._isDbOpen || !this.database) {
            throw new Error(`getVersion: Database ${this.dbName} is not open yet. You should open it first.`);
        }
    }
}
Database$1.Database = Database;

Object.defineProperty(src, "__esModule", { value: true });
exports.CapacitorSQLite = src.CapacitorSQLite = void 0;
const GlobalSQLite_1 = GlobalSQLite$1;
const Database_1 = Database$1;
const utilsJson_1 = utilsJson;
const utilsJsonEncryption_1 = utilsJsonEncryption;
const utilsFile_1 = utilsFile;
const utilsSQLite_1 = utilsSQLite;
const utilsSecret_1 = utilsSecret;
class CapacitorSQLite {
    constructor() {
        this.versionUpgrades = {};
        this.databases = {};
        this.fileUtil = new utilsFile_1.UtilsFile();
        this.sqliteUtil = new utilsSQLite_1.UtilsSQLite();
        this.jsonUtil = new utilsJson_1.UtilsJson();
        this.jsonEncryptUtil = new utilsJsonEncryption_1.UtilsJsonEncryption();
        this.secretUtil = new utilsSecret_1.UtilsSecret();
        this.globalUtil = new GlobalSQLite_1.GlobalSQLite();
        this.isEncryption = this.fileUtil.getIsEncryption();
    }
    async createConnection(options) {
        const optionKeys = Object.keys(options);
        if (!optionKeys.includes('database')) {
            throw new Error('Must provide a database name');
        }
        const dbName = options.database;
        const version = options.version ? options.version : 1;
        let encrypted = options.encrypted ? options.encrypted : false;
        if (!this.isEncryption && encrypted) {
            throw new Error('Must set electronIsEncryption = true in capacitor.config.ts');
        }
        let inMode = encrypted && options.mode === 'secret'
            ? 'secret'
            : encrypted && options.mode === 'encryption'
                ? 'encryption'
                : 'no-encryption';
        if (!this.isEncryption) {
            encrypted = false;
            inMode = 'no-encryption';
        }
        const readonly = options.readonly ? options.readonly : false;
        let upgrades = {};
        const versionUpgradeKeys = Object.keys(this.versionUpgrades);
        if (versionUpgradeKeys.length !== 0 &&
            versionUpgradeKeys.includes(dbName)) {
            upgrades = this.versionUpgrades[dbName];
        }
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const databaseConnection = new Database_1.Database(dbName + 'SQLite.db', encrypted, inMode, version, this.isEncryption, readonly, upgrades, this.globalUtil);
        this.databases[connName] = databaseConnection;
        return;
    }
    async closeConnection(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        try {
            if (database.isDBOpen()) {
                // close the database
                database.dbClose();
            }
        }
        catch (err) {
            throw new Error(`CloseConnection command failed:  close ${dbName} failed ${err.message}`);
        }
        finally {
            // remove the connection from dictionary
            delete this.databases[connName];
        }
        return;
    }
    async echo(options) {
        const echoValue = this.getOptionValue(options, 'value');
        const echoResult = {};
        echoResult.value = echoValue;
        return echoResult;
    }
    async open(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        try {
            await database.open();
            return;
        }
        catch (err) {
            throw new Error(`Open: ${err}`);
        }
    }
    async close(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                database.dbClose();
                return;
            }
            catch (err) {
                throw new Error(`Close: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`Close: ${msg}`);
        }
    }
    async getVersion(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                const version = await database.getVersion();
                const versionResult = {};
                versionResult.version = version;
                return versionResult;
            }
            catch (err) {
                throw new Error(`GetVersion: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`GetVersion: ${msg}`);
        }
    }
    async getTableList(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                const tableList = await database.getTableList();
                const tableListResult = {};
                tableListResult.values = tableList;
                return tableListResult;
            }
            catch (err) {
                throw new Error(`GetTableList: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`GetTableList: ${msg}`);
        }
    }
    async execute(options) {
        const dbName = this.getOptionValue(options, 'database');
        const statements = this.getOptionValue(options, 'statements');
        const transaction = this.getOptionValue(options, 'transaction', true);
        const readonly = options.readonly ? options.readonly : false;
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            if (readonly) {
                const msg = 'not allowed in read-only mode ';
                throw new Error(`Execute: ${msg}`);
            }
            try {
                const executeResult = database.executeSQL(statements, transaction);
                if (executeResult < 0) {
                    throw new Error('Execute changes < 0');
                }
                else {
                    return { changes: { changes: executeResult } };
                }
            }
            catch (err) {
                throw new Error(`Execute: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`Execute: ${msg}`);
        }
    }
    async executeSet(options) {
        const dbName = this.getOptionValue(options, 'database');
        const setOfStatements = this.getOptionValue(options, 'set');
        const transaction = this.getOptionValue(options, 'transaction', true);
        const readonly = options.readonly ? options.readonly : false;
        const returnMode = options.returnMode ? options.returnMode : 'no';
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        for (const sStmt of setOfStatements) {
            if (!('statement' in sStmt) || !('values' in sStmt)) {
                throw new Error('ExecuteSet: Must provide a set as ' + 'Array of {statement,values}');
            }
        }
        if (database.isDBOpen()) {
            if (readonly) {
                const msg = 'not allowed in read-only mode ';
                throw new Error(`ExecuteSet failed: ${msg}`);
            }
            try {
                const execSetResult = database.execSet(setOfStatements, transaction, returnMode);
                if (execSetResult.lastId < 0) {
                    throw new Error(`ExecuteSet failed changes <0`);
                }
                else {
                    return { changes: execSetResult };
                }
            }
            catch (err) {
                throw new Error(`ExecuteSet failed: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`ExecuteSet failed: ${msg}`);
        }
    }
    async run(options) {
        const dbName = this.getOptionValue(options, 'database');
        const statement = this.getOptionValue(options, 'statement');
        const values = this.getOptionValue(options, 'values', []);
        const transaction = this.getOptionValue(options, 'transaction', true);
        const readonly = options.readonly ? options.readonly : false;
        const returnMode = options.returnMode ? options.returnMode : 'no';
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            if (readonly) {
                const msg = 'not allowed in read-only mode ';
                throw new Error(`Run failed: ${msg}`);
            }
            try {
                const runResult = database.runSQL(statement, values, transaction, returnMode);
                return { changes: runResult };
            }
            catch (err) {
                throw new Error(`RUN failed: ${err} `);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`Run failed: ${msg}`);
        }
    }
    async query(options) {
        const dbName = this.getOptionValue(options, 'database');
        const statement = this.getOptionValue(options, 'statement');
        const values = this.getOptionValue(options, 'values', []);
        if (statement.length === 0) {
            throw new Error('Query: Statement may not be an empty string.');
        }
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                const queryResult = database.selectSQL(statement, values);
                return { values: queryResult };
            }
            catch (err) {
                try {
                    if (err.message?.indexOf('QueryAll This statement does not return data. Use run() instead') !== -1) {
                        const queryResult = database.runSQL(statement, values, false, 'no');
                        return { values: queryResult.values };
                    }
                }
                catch (error) {
                    throw new Error(`Query: ${error}`);
                }
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`Query: ${msg}`);
        }
    }
    async isDBExists(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        this.getDatabaseConnectionOrThrowError(connName);
        //    if (database.isDBOpen()) {
        const isExists = this.fileUtil.isFileExists(dbName + 'SQLite.db');
        return { result: isExists };
        //    } else {
        //      const msg = `Database ${dbName} not opened`;
        //     throw new Error(`isDBExists: ${msg}`);
        //    }
    }
    async isDBOpen(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        const isOpen = database.isDBOpen();
        return { result: isOpen };
    }
    async isDatabase(options) {
        const dbName = this.getOptionValue(options, 'database');
        const isExists = this.fileUtil.isFileExists(dbName + 'SQLite.db');
        return { result: isExists };
    }
    async isTableExists(options) {
        const dbName = this.getOptionValue(options, 'database');
        const tableName = this.getOptionValue(options, 'table');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                const isTableExistsResult = await database.isTableExists(tableName);
                return { result: isTableExistsResult };
            }
            catch (err) {
                throw new Error(`isTableExists: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`isTableExists: ${msg}`);
        }
    }
    async deleteDatabase(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (readonly) {
            const msg = 'not allowed in read-only mode ';
            throw new Error(`DeleteDatabase failed: ${msg}`);
        }
        try {
            await database.deleteDB(dbName + 'SQLite.db');
            return;
        }
        catch (err) {
            throw new Error(`DeleteDatabase: ${err}`);
        }
    }
    async isJsonValid(options) {
        const jsonString = this.getOptionValue(options, 'jsonstring');
        const jsonObj = JSON.parse(jsonString);
        const isValid = this.jsonUtil.isJsonSQLite(jsonObj);
        if (!isValid) {
            throw new Error('Stringify Json Object not Valid');
        }
        else {
            return { result: true };
        }
    }
    async importFromJson(options) {
        const jsonString = this.getOptionValue(options, 'jsonstring');
        let jsonObj = JSON.parse(jsonString);
        let inMode = 'no-encryption';
        const key = 'expData';
        if (key in jsonObj) {
            // Decrypt the data
            inMode = 'secret';
            jsonObj = this.jsonEncryptUtil.decryptJSONObject(jsonObj.expData);
        }
        const isValid = this.jsonUtil.isJsonSQLite(jsonObj);
        if (!isValid) {
            throw new Error('Must provide a valid JsonSQLite Object');
        }
        const vJsonObj = jsonObj;
        const dbName = `${vJsonObj.database}SQLite.db`;
        const targetDbVersion = vJsonObj.version ?? 1;
        const overwrite = vJsonObj.overwrite ?? false;
        const encrypted = vJsonObj.encrypted ?? false;
        const mode = vJsonObj.mode ?? 'full';
        if (!this.isEncryption && encrypted) {
            throw new Error('Must set electronIsEncryption = true in capacitor.config.ts');
        }
        // Create the database
        const database = new Database_1.Database(dbName, encrypted, inMode, targetDbVersion, this.isEncryption, false, {}, this.globalUtil);
        try {
            if (overwrite && mode === 'full') {
                const isExists = this.fileUtil.isFileExists(dbName);
                if (isExists) {
                    await this.fileUtil.deleteFileName(dbName);
                }
            }
            // Open the database
            await database.open();
            const tableList = await database.getTableList();
            if (mode === 'full' && tableList.length > 0) {
                const currentVersion = await database.getVersion();
                if (targetDbVersion < currentVersion) {
                    throw new Error(`ImportFromJson: Cannot import a version lower than ${currentVersion}`);
                }
                if (currentVersion === targetDbVersion) {
                    return { changes: { changes: 0 } };
                }
            }
            // Import the JsonSQLite Object
            const changes = await database.importJson(vJsonObj);
            // Close the database
            database.dbClose();
            return { changes: { changes: changes } };
        }
        catch (err) {
            throw new Error(`ImportFromJson: ${err}`);
        }
    }
    async exportToJson(options) {
        const dbName = this.getOptionValue(options, 'database');
        const exportMode = this.getOptionValue(options, 'jsonexportmode');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                const exportJsonResult = database.exportJson(exportMode);
                const resultKeys = Object.keys(exportJsonResult);
                if (resultKeys.includes('message')) {
                    throw new Error(`exportToJson: ${exportJsonResult.message}`);
                }
                else {
                    return { export: exportJsonResult };
                }
            }
            catch (err) {
                throw new Error(`ExportToJson: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`ExportToJson: ${msg}`);
        }
    }
    async createSyncTable(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            if (readonly) {
                const msg = 'not allowed in read-only mode ';
                throw new Error(`CreateSyncTable failed: ${msg}`);
            }
            try {
                const createTableSyncResult = await database.createSyncTable();
                return {
                    changes: { changes: createTableSyncResult },
                };
            }
            catch (err) {
                throw new Error(`CreateSyncTable: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`CreateSyncTable: ${msg}`);
        }
    }
    async setSyncDate(options) {
        const dbName = this.getOptionValue(options, 'database');
        const syncDate = this.getOptionValue(options, 'syncdate');
        const readonly = options.readonly ? options.readonly : false;
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            if (readonly) {
                const msg = 'not allowed in read-only mode ';
                throw new Error(`SetSyncDate failed: ${msg}`);
            }
            try {
                await database.setSyncDate(syncDate);
                return;
            }
            catch (err) {
                throw new Error(`SetSyncDate: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`SetSyncDate: ${msg}`);
        }
    }
    async getSyncDate(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = readonly ? 'RO_' + dbName : 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            try {
                const ret = await database.getSyncDate();
                return Promise.resolve(ret);
            }
            catch (err) {
                throw new Error(`GetSyncDate: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`GetSyncDate: ${msg}`);
        }
    }
    async deleteExportedRows(options) {
        const dbName = this.getOptionValue(options, 'database');
        const readonly = options.readonly ? options.readonly : false;
        const connName = 'RW_' + dbName;
        const database = this.getDatabaseConnectionOrThrowError(connName);
        if (database.isDBOpen()) {
            if (readonly) {
                const msg = 'not allowed in read-only mode ';
                throw new Error(`DeleteExportedRows: ${msg}`);
            }
            try {
                await database.deleteExportedRows();
                return Promise.resolve();
            }
            catch (err) {
                throw new Error(`DeleteExportedRows: ${err}`);
            }
        }
        else {
            const msg = `Database ${dbName} not opened`;
            throw new Error(`DeleteExportedRows: ${msg}`);
        }
    }
    async addUpgradeStatement(options) {
        const dbName = this.getOptionValue(options, 'database');
        const upgrades = this.getOptionValue(options, 'upgrade');
        for (const upgrade of upgrades) {
            const versionUpgradeKeys = Object.keys(upgrade);
            if (!versionUpgradeKeys.includes('toVersion') ||
                !versionUpgradeKeys.includes('statements')) {
                throw new Error('Must provide an upgrade capSQLiteVersionUpgrade Object');
            }
            if (typeof upgrade.toVersion != 'number') {
                throw new Error('upgrade.toVersion must be a number');
            }
            if (this.versionUpgrades[dbName]) {
                this.versionUpgrades[dbName][upgrade.toVersion] = upgrade;
            }
            else {
                const upgradeVersionDict = {};
                upgradeVersionDict[upgrade.toVersion] = upgrade;
                this.versionUpgrades[dbName] = upgradeVersionDict;
            }
        }
        console.log(`this.versionUpgrades: ${JSON.stringify(this.versionUpgrades)}`);
        return;
    }
    async copyFromAssets(options) {
        const overwrite = this.getOptionValue(options, 'overwrite', false);
        // check if the assets/database folder exists
        const assetsDbPath = this.fileUtil.getAssetsDatabasesPath();
        const pathExists = this.fileUtil.isPathExists(assetsDbPath);
        if (pathExists) {
            // get the database files
            const dbList = await this.fileUtil.getFileList(assetsDbPath);
            // loop through the database files
            dbList.forEach(async (db) => {
                if (this.fileUtil.getExtName(db) === '.db') {
                    // for each copy the file to the Application database folder
                    await this.fileUtil.copyFromAssetToDatabase(db, overwrite);
                }
                if (this.fileUtil.getExtName(db) === '.zip') {
                    const assetPath = this.fileUtil.getAssetsDatabasesPath();
                    await this.fileUtil.unzipDatabase(db, assetPath, overwrite);
                }
            });
            return;
        }
        else {
            throw new Error(`CopyFromAssets: assets/databases folder does not exist:[${assetsDbPath}]`);
        }
    }
    async getFromHTTPRequest(options) {
        const url = this.getOptionValue(options, 'url', '');
        const overwrite = this.getOptionValue(options, 'overwrite', false);
        if (url.length === 0) {
            throw new Error(`getFromHTTPRequest: You must give a database url`);
        }
        const cachePath = this.fileUtil.getCachePath();
        await this.fileUtil.downloadFileFromHTTP(url, cachePath);
        if (this.fileUtil.getExtName(url) === '.zip') {
            const zipName = `${this.fileUtil.getBaseName(url)}.zip`;
            await this.fileUtil.unzipDatabase(zipName, cachePath, overwrite);
        }
        if (overwrite) {
            await this.fileUtil.moveDatabaseFromCache();
        }
        else {
            throw new Error(`getFromHTTPRequest: cannot move file from cache overwrite: ${overwrite}`);
        }
    }
    async getDatabaseList() {
        // get the database folder
        const pathDatabase = this.fileUtil.getDatabasesPath();
        // get the list of databases
        const files = await this.fileUtil.getFileList(pathDatabase);
        if (files.length > 0) {
            return { values: files };
        }
        else {
            throw new Error(`isTableExists: No databases found in [${pathDatabase}]`);
        }
    }
    async checkConnectionsConsistency(options) {
        const dbNames = this.getOptionValue(options, 'dbNames');
        const openModes = this.getOptionValue(options, 'openModes');
        const checkConsistencyResult = {};
        checkConsistencyResult.result = false;
        const dbConns = [];
        dbNames.forEach((value, i) => {
            dbConns.push(`${openModes[i]}_${value}`);
        });
        try {
            let inConnectionsSet = new Set(Object.keys(this.databases));
            const outConnectionSet = new Set(dbConns);
            if (outConnectionSet.size === 0) {
                await this.resetDbDict(Object.keys(this.databases));
                return Promise.resolve(checkConsistencyResult);
            }
            if (inConnectionsSet.size < outConnectionSet.size) {
                await this.resetDbDict(Object.keys(this.databases));
                return Promise.resolve(checkConsistencyResult);
            }
            if (inConnectionsSet.size > outConnectionSet.size) {
                for (const key of inConnectionsSet) {
                    if (!Array.from(outConnectionSet.keys()).includes(key)) {
                        const opt = {};
                        let readonly = false;
                        if (key.substring(0, 3) === 'RO_') {
                            readonly = true;
                        }
                        opt.database = key.substring(3);
                        opt.readonly = readonly;
                        await this.closeConnection(opt);
                    }
                }
            }
            inConnectionsSet = new Set(Object.keys(this.databases));
            if (inConnectionsSet.size === outConnectionSet.size) {
                const symmetricDifferenceSet = await this.symmetricDifference(inConnectionsSet, outConnectionSet);
                if (symmetricDifferenceSet.size === 0) {
                    checkConsistencyResult.result = true;
                    return checkConsistencyResult;
                }
                else {
                    await this.resetDbDict(Object.keys(this.databases));
                    return checkConsistencyResult;
                }
            }
            else {
                await this.resetDbDict(Object.keys(this.databases));
                return checkConsistencyResult;
            }
        }
        catch (err) {
            throw new Error(`CheckConnectionsConsistency: ${err}`);
        }
    }
    async isSecretStored() {
        if (!this.isEncryption) {
            throw new Error(`isSecretStored: Not available electronIsEncryption = false in capacitor.config.ts`);
        }
        try {
            const isStored = this.secretUtil.isSecretStored();
            return { result: isStored };
        }
        catch (err) {
            throw new Error(`isSecretStored: ${err}`);
        }
    }
    async setEncryptionSecret(options) {
        const isEncrypt = this.fileUtil.getIsEncryption();
        if (!isEncrypt) {
            throw new Error(`setEncryptionSecret: Not available electronIsEncryption = false in capacitor.config.ts`);
        }
        const passphrase = options.passphrase ? options.passphrase : '';
        if (passphrase.length <= 0) {
            throw new Error(`setEncryptionSecret: You must give a passphrase`);
        }
        try {
            // check if already exists
            const isStored = this.secretUtil.isSecretStored();
            if (isStored) {
                throw new Error(`setEncryptionSecret: passphrase already in store`);
            }
            await this.closeAllConnections();
            this.secretUtil.setEncryptSecret(passphrase);
            return;
        }
        catch (err) {
            throw new Error(`setEncryptionSecret: ${err}`);
        }
    }
    async changeEncryptionSecret(options) {
        const isEncrypt = this.fileUtil.getIsEncryption();
        if (!isEncrypt) {
            throw new Error(`changeEncryptionSecret: Not available electronIsEncryption = false in capacitor.config.ts`);
        }
        const oldsecret = this.secretUtil.getPassphrase();
        const oldpassphrase = options.oldpassphrase ? options.oldpassphrase : '';
        if (oldpassphrase.length <= 0) {
            throw new Error(`changeEncryptionSecret: You must give the oldpassphrase`);
        }
        if (oldpassphrase !== oldsecret) {
            throw new Error(`changeEncryptionSecret: the given oldpassphrase is wrong`);
        }
        const passphrase = options.passphrase ? options.passphrase : '';
        if (passphrase.length <= 0) {
            throw new Error(`changetEncryptionSecret: You must give a passphrase`);
        }
        try {
            await this.closeAllConnections();
            this.secretUtil.changeEncryptSecret(oldpassphrase, passphrase);
            return;
        }
        catch (err) {
            throw new Error(`changetEncryptionSecret: ${err}`);
        }
    }
    async clearEncryptionSecret() {
        const isEncrypt = this.fileUtil.getIsEncryption();
        if (!isEncrypt) {
            throw new Error(`clearEncryptionSecret: Not available electronIsEncryption = false in capacitor.config.ts`);
        }
        if (this.globalUtil == null) {
            throw new Error(`clearEncryptionSecret: No available globalUtil`);
        }
        try {
            await this.closeAllConnections();
            this.secretUtil.clearEncryptSecret();
            return;
        }
        catch (err) {
            throw new Error(`clearEncryptionSecret: ${err}`);
        }
    }
    async isInConfigEncryption() {
        return Promise.resolve({ result: this.isEncryption });
    }
    async isDatabaseEncrypted(options) {
        const dbName = this.getOptionValue(options, 'database');
        try {
            const isEncrypt = await this.sqliteUtil.isDatabaseEncrypted(dbName + 'SQLite.db');
            return { result: isEncrypt };
        }
        catch (err) {
            throw new Error(`isDatabaseEncrypted: ${err}`);
        }
    }
    async checkEncryptionSecret(options) {
        const isEncrypt = this.fileUtil.getIsEncryption();
        if (!isEncrypt) {
            throw new Error(`checkEncryptionSecret: Not available electronIsEncryption = false in capacitor.config.ts`);
        }
        const passphrase = options.passphrase ? options.passphrase : '';
        if (passphrase.length <= 0) {
            throw new Error(`checkEncryptionSecret: You must give a passphrase`);
        }
        try {
            await this.closeAllConnections();
            const isSame = this.secretUtil.checkEncryptSecret(passphrase);
            return { result: isSame };
        }
        catch (err) {
            throw new Error(`checkEncryptionSecret: ${err}`);
        }
    }
    ////////////////////////////////
    //// PRIVATE METHODS
    ////////////////////////////////
    async resetDbDict(keys) {
        try {
            for (const key of keys) {
                const opt = {};
                let readonly = false;
                if (key.substring(0, 3) === 'RO_') {
                    readonly = true;
                }
                opt.database = key.substring(3);
                opt.readonly = readonly;
                await this.closeConnection(opt);
            }
        }
        catch (err) {
            throw new Error(`ResetDbDict: ${err}`);
        }
    }
    async symmetricDifference(setA, setB) {
        const difference = new Set(setA);
        for (const elem of setB) {
            if (difference.has(elem)) {
                difference.delete(elem);
            }
            else {
                difference.add(elem);
            }
        }
        return difference;
    }
    /**
     * Returns a database connection, if it already exists.
     * If the conneciton does not exist yet, it throws an error.
     *
     * @param dbName
     * @returns
     */
    getDatabaseConnectionOrThrowError(dbName) {
        const databaseNames = Object.keys(this.databases);
        if (!databaseNames.includes(dbName)) {
            throw new Error(`No connection available for database "${dbName}"`);
        }
        return this.databases[dbName];
    }
    /**
     * Gets the value of an option from the options object.
     * If the `optionKey` does not exist and there is no `defaultValue` defined, an exception is thrown.
     * If the `optionKey` does not exist but there is a `defaultValue`, the `defaultValue` is returned.
     *
     * @param options
     * @param optionKey
     * @param defaultValue
     * @returns
     */
    getOptionValue(options, optionKey, defaultValue = undefined) {
        const optionKeys = Object.keys(options);
        if (!optionKeys.includes(optionKey)) {
            if (defaultValue === undefined) {
                throw new Error(`Must provide "${optionKey}" in options.`);
            }
            else {
                return defaultValue;
            }
        }
        return options[optionKey];
    }
    async closeAllConnections() {
        const databaseNames = Object.keys(this.databases);
        try {
            for (const name of databaseNames) {
                const db = this.databases[name];
                if (db.isDBOpen()) {
                    db.dbClose();
                }
            }
            return;
        }
        catch (err) {
            throw new Error(`CloseAllConnection command failed: ${err.message}`);
        }
    }
    ////////////////////////////////
    //// UNIMPLEMENTED METHODS
    ////////////////////////////////
    async getMigratableDbList(options) {
        console.log('getCordovaDbList', options);
        throw new Error('Method not implemented.');
    }
    async addSQLiteSuffix(options) {
        console.log(`${JSON.stringify(options)}`);
        throw new Error('Method not implemented.');
    }
    async deleteOldDatabases(options) {
        console.log(`${JSON.stringify(options)}`);
        throw new Error('Method not implemented.');
    }
    async moveDatabasesAndAddSuffix(options) {
        console.log(`${JSON.stringify(options)}`);
        throw new Error('Method not implemented.');
    }
    async getUrl() {
        throw new Error('Method not implemented.');
    }
    async initWebStore() {
        throw new Error('Method not implemented.');
    }
    async saveToStore(options) {
        console.log(`${JSON.stringify(options)}`);
        throw new Error('Method not implemented.');
    }
    async saveToLocalDisk(options) {
        console.log(`${JSON.stringify(options)}`);
        throw new Error('Method not implemented.');
    }
    async getFromLocalDiskToStore(options) {
        console.log(`${JSON.stringify(options)}`);
        throw new Error('Method not implemented.');
    }
    async getNCDatabasePath(options) {
        console.log('getNCDatabasePath', options);
        throw new Error('Method not implemented.');
    }
    async createNCConnection(options) {
        console.log('createNCConnection', options);
        throw new Error('Method not implemented.');
    }
    async closeNCConnection(options) {
        console.log('closeNCConnection', options);
        throw new Error('Method not implemented.');
    }
    async isNCDatabase(options) {
        console.log('isNCDatabase', options);
        throw new Error('Method not implemented.');
    }
    async isInConfigBiometricAuth() {
        throw new Error('Not implemented on web.');
    }
}
exports.CapacitorSQLite = src.CapacitorSQLite = CapacitorSQLite;

exports["default"] = src;
//# sourceMappingURL=plugin.js.map
