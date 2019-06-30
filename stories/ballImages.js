const ballImages = [];

for (let i = 1; i < 73; i++) {
  ballImages.push(require(/* webpackPrefetch: true */`./statics/ball/basketball${i}.png`));
}

export default ballImages;
