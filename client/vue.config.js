module.exports = {
    devServer: {
        proxy:'http://192.168.99.100:8080',     // for docker toolbox
        /*for ubuntu
        proxy:'http://localhost:8080'
        * */
    }
};