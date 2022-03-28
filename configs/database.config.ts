export function databaseConfig(){
    return ({
        host: process.env.NEO4J_HOST || 'localhost',
        port: process.env.NEO4J_PORT || 7687,
    });
}