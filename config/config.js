module.exports = {

    secret: process.env.SECRET || 'ZSDFsoifchusepodusj',
    jwtExpiresAfter: 60 * 60 * 1000,
    cookieName: '_wab_auth_jwt',
    db: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'taskboard',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    },
    minify: true,
};