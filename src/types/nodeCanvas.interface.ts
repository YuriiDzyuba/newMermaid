/** NodeCanvas extends native HTMLCanvasElement with additional method toBuffer */
export interface NodeCanvas extends HTMLCanvasElement {
  /** Creates a Buffer object representing the image contained in the canvas
   * mimeType A string indicating the image format. Valid options are image/png, image/jpeg
   * */
  toBuffer(mimeType?: string): Buffer;
}



