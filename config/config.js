/**
 * Created by dchambi on 03/02/2017.
 */
//var config = module.exports;
const config = module.exports;
config.db = {
    user          : process.env.NODE_ORACLEDB_USER || "DAZ",

    // Instead of hard coding the password, consider prompting for it,
    // passing it in an environment variable via process.env, or using
    // External Authentication.
    password      : process.env.NODE_ORACLEDB_PASSWORD || "DAZ123$",

    // For information on connection strings see:
    // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
    //connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "192.168.1.4:1522/APUE",
    //connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "192.168.1.147:1523/ASUR",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "192.168.1.21:1522/APUE",
    //connectString : proce0ss.env.NODE_ORACLEDB_CONNECTIONSTRING || "DESKTOP-7NAQHP4:1521/XE",
    // Setting externalAuth is optional.  It defaults to false.  See:
    // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#extauth
    //externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
    poolMax: 10,
    poolMin: 2,
    poolIncrement: 4,
    poolTimeout: 4
};
config.express = {
    port: process.env.EXPRESS_PORT || 8000,
    ip: process.env.EXPRESS_IP || '192.168.3.35'

};
config.pagination = {
    maxRowsDefault: process.env.MAX_ROWS || 150,
    limitSelectDefault: process.env.LIMIT_SELECT || 25,
    offsetSelectDefault: process.env.OFFSET_SELECT || 0,
};
