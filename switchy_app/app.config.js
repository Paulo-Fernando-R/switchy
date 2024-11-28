module.exports = {
    expo: {
        name: "Switchy",
        slug: "switchy",
        version: "0.0.2",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#3D65C9",
        },
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.ferreira.switchy"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#3D65C9",
            },
            package: "com.ferreira.switchy",
            softwareKeyboardLayoutMode: "pan",
            serviceAccountKeyPath: "process.env.EXPO_UPLOAD_KEYSTORE_GOOGLE",
            track: "internal",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        plugins: [
            "expo-secure-store",
            [
                "expo-splash-screen",
                {
                    backgroundColor: "#3D65C9",
                    image: "./assets/splash.png",
                    dark: {
                        image: "./assets/splash.png",
                        backgroundColor: "#3D65C9",
                    },
                    imageWidth: 1080,
                },
            ],
            [
                "expo-build-properties",
                {
                    android: {
                        usesCleartextTraffic: true,
                    },
                },
            ],
        ],
        extra: {
            eas: {
                projectId: "981ba142-5651-484f-916c-383029f782eb",
            },
        },
    },
};
