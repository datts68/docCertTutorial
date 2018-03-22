module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*"
        },
        live: {
            host: "192.168.0.20",
            port: 8545,
            network_id: "*",
            gas: 4000000,
            from: "0x80d8a5e72e6395cdfab0b872171761405a1f0058"
        }
    }
};
