

export default {
  expo: {
    name: "Lab App",
    slug: "lab-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      backgroundColor: "#254282"
    },
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_googleMap // La API Key para iOS desde .env
      },
      bundleIdentifier: "com.albinr3.labapp", // Asegúrate de que sea único
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_googleMap// Obtiene la API Key desde .env
        }
      },
      permissions: [
        "INTERNET"
      ],
      package: "com.albinr3.labapp"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "13c591db-2ad4-4260-a01c-5c209c7c72bf"
      }
    },
    plugins: [
      "expo-build-properties",
      [
        "expo-build-properties",
        {
          android: {
            minSdkVersion: 23,
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: "34.0.0"
          },
          ios: {
            deploymentTarget: "13.4"
          }
        }
      ],
      [
        "@sentry/react-native/expo",
        {
          "organization": "importadora-fidodido-srl",
          "project": "react-native",
          // If you are using a self-hosted instance, update the value of the url property
          // to point towards your self-hosted instance. For example, https://self-hosted.example.com/.
          "url": "https://sentry.io/"
        }
      ]
    ]
  }
};
