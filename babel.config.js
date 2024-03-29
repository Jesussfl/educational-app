module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // env: {
    //    development: {
    //       plugins: ["transform-react-jsx-source"],
    //    },
    // },
    plugins: [
      [
        "module-resolver",
        {
          // root: ["./"],
          alias: {
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@assets": "./assets",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@features": "./src/features",
            "@stores": "./src/stores",
            "@config": "./src/config",
            "@": "./src",
          },
          // extensions: [".ios.js", ".android.js", ".js", ".jsx", ".json", ".tsx", ".ts", ".native.js"],
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
