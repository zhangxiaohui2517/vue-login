module.exports = {
    baseUrl: '/',//根路径
    outputDir: 'dist',//构建输出目录
    assetsDir: 'assets',//静态资源目录
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }


    }

}