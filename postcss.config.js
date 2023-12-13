module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {},
    "postcss-nesting": {},
    "postcss-inline-svg": {},
    "postcss-svgo": {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: true,
              removeComments: true,
              cleanupNumericValues: {
                floatPrecision: 3,
                leadingZero: true,
              },
            },
          },
        },
      ],
    },
  },
};
