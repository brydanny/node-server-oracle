/**
 * Created by dchambi on 03/02/2017.
 */
const config = module.exports;
config.db = {
    user          : process.env.NODE_ORACLEDB_USER || "USER",

    // Instead of hard coding the password, consider prompting for it,
    // passing it in an environment variable via process.env, or using
    // External Authentication.
    password      : process.env.NODE_ORACLEDB_PASSWORD || "PASS",

    // For information on connection strings see:
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "HOST:PORT/BD",
    //connectString : proce0ss.env.NODE_ORACLEDB_CONNECTIONSTRING || "DESKTOP-7NAQHP4:1521/XE",
    //externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
    poolMax: 10,
    poolMin: 2,
    poolIncrement: 4,
    poolTimeout: 4
};
config.express = {
    port: process.env.EXPRESS_PORT || 8000,
    ip: process.env.EXPRESS_IP || 'IP'

};
config.pagination = {
    maxRowsDefault: process.env.MAX_ROWS || 150,
    limitSelectDefault: process.env.LIMIT_SELECT || 25,
    offsetSelectDefault: process.env.OFFSET_SELECT || 0,
};
