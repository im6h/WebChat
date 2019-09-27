module.exports = {
    devServer: {
        port: 8081,
        proxy:'http://192.168.99.100:8080',     // for docker toolbox
        /*for ubuntu
        proxy:'http:localhost:8080'
        * */
    }
};