const MEDIA_RESTRICTIONS = {
  accept: ["image/png", "image/gif", "image/jpeg"],
  width: {
    min: 480,
    max: 3840
  },
  height: {
    min: 480,
    max: 2160
  },
  aspectRatio: {
    min: [1, 2],
    max: [2, 1]
  },
  // bytes
  size: {
    min: 0,
    max: 2000000
  },
  animation: {
    fps: {
      min: 1,
      max: 30
    },
    length: {
      min: 0,
      max: 40
    }
  }
};

const ICON_RESTRICTIONS = {
  accept: ["image/png", "image/jpeg", "image/svg"],
  width: {
    min: 40,
    max: 512
  },
  height: {
    min: 40,
    max: 512
  },
  aspectRatio: {
    min: [1, 1],
    max: [1, 1]
  },
  size: {
    min: 0,
    max: 256000
  }
};

export { MEDIA_RESTRICTIONS, ICON_RESTRICTIONS };
