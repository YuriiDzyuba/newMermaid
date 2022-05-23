export interface NodeCanvas extends HTMLCanvasElement {
  toBuffer(mimeType?: string, config?: any): Buffer;
}
