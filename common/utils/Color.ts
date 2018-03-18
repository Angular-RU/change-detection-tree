export class Color {
  static generateRGB(color: string = null) {
    return color || `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  }
}
