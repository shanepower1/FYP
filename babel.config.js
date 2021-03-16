module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
            assets: "./src/assets",
            components: "./src/components",
            functions: "./src/functions",
            navigation: "./src/navigation",
            screens: "./src/screens",
          },
        },
      ],
    ]
  };
};
