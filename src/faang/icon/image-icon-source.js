export class ImageIconSource {
  /**
   *
   * @param {import("../base-image/types").SpritedImage} src
   * @param {*} width
   * @param {*} height
   * @param {string} resizeStrategy
   */
  constructor(src, width, height, resizeStrategy) {
    if (!resizeStrategy) {
      resizeStrategy = 'cover';
    }

    this.$$typeof = 'fb.imageiconsource';
    this.src = src;
    this.width = width;
    this.height = height;
    this.resizeStrategy = resizeStrategy;
  }
}
