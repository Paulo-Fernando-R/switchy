import os from "os";

export const getServerIp = () => {
    for (let devName in os.networkInterfaces()) {
        let iface = os.networkInterfaces()[devName];
        for (let i = 0; i < iface!.length; i++) {
            let alias = iface![i];

            if (alias.family === "IPv4" && (alias.address === "127.0.0.1" || alias.internal)) {
                return "localhost";
            }

            if (alias.family === "IPv4") {
                return alias.address;
            }
        }
    }
};


