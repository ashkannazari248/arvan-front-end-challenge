// @ts-ignore
export const isProd = process.env.NODE_ENV === 'production'
export const LOCAL_PORT = 5000
export const BASE_URL = isProd ? 'https://api.realworld.io/api/' : `http://localhost:${LOCAL_PORT}/api/`
export const PROXY_CONFIG = isProd ? {} : {
    proxy: {
        "/api": {
            target: 'https://api.realworld.io/',
            changeOrigin: true,
            secure: false,
            ws: true
        },
    }
}

