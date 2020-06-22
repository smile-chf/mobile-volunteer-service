const path = require("path");
const resolve = function (dir) {
    return path.join(__dirname, dir);
};
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/volunteerServiceVueMobile/" : "./",
    outputDir: "volunteerServiceVueMobile",
    assetsDir: "static",
    lintOnSave: true, // 是否开启eslint保存检测
    productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@v", resolve("src/views"))
            .set("@c", resolve("src/components"))
            .set("@u", resolve("src/utils"))
            .set("@s", resolve("src/service")); /* 别名配置 */
        config.optimization.runtimeChunk("single");
    },
    devServer: {
        // host: "localhost",
        /* 本地ip地址 */
        // host: "www.ahshequ.cn",
        // host: "www.0551cx.com",
        // host: "192.168.1.110",
        host: "192.168.1.245",
        port: "80",
        // port: "8080",
        hot: true,
        /* 自动打开浏览器 */
        open: false,
        overlay: {
            warning: false,
            error: true
        },
        /* 跨域代理 */
        proxy: {
            "/volunteerService": {
                /* 目标代理服务器地址 */
                // target: " https://www.0551cx.com",
                target: " http://www.ahshequ.cn",
                // target: " http://192.168.1.142:8891",
                // target: " http://192.168.1.210:8891",
                // target: " http://192.168.1.180:8080",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/volunteerService": "/volunteerService"
                }
            },
            '/hfcx_multi_project': {
                target: 'https://www.0551cx.com',
                changeOrigin: true,
                pathRewrite: {"^/hfcx_multi_project": "/hfcx_multi_project"}
            }
        }
    }
};