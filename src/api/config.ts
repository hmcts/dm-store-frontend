export const config = {
    proxies: {
        dmStore: {
            endpoints: ["/documents"],
            target: process.env["DM_STORE_API_URL"] || "http://localhost:4603"
        }
    },
    s2s: {
        url: process.env["S2S_URL"] || "http://localhost:4502",
        secret: process.env["S2S_KEY"] || "AAAAAAAAAAAAAAAA",
        microservice: "em_gw"
    },
    port: process.env.PORT || 1337,
    tokenRefreshTime: 60 * 60 * 1000
};
