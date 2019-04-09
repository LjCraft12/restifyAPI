const dbName = 'restiFy';
module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    URI: process.env.MONGODB_URI || `mongodb+srv://inventoryApi:onClickAdmin2018@university-brzxn.mongodb.net/${dbName}`,
    JWT_SECRET: process.env.JWT_SECRET || 'CBAB340E4E'
};
