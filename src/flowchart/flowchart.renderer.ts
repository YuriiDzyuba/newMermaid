import { Renderer } from '../types/renderer';
import { Canvas, createCanvas } from 'canvas';
import { ParsedFlowchartMrd } from './types/parsedFlowchartMrd';
import * as fs from 'fs';
import { SequenceRendererConfig } from '../sequence/types/sequenceRendererConfig.type';

export class FlowchartRenderer implements Renderer {
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  constructor(parsedMrd: ParsedFlowchartMrd, config: any) {
    this.createCanvasAndContext(5, 5, config);
  }

  render(): Buffer {
    const buffer = this.canvas.toBuffer('image/png');
    fs.writeFileSync('./image.png', buffer)
    return buffer;
  }

  private createCanvasAndContext(participantsCount: number, relationsCount: number, config: SequenceRendererConfig): void {
    const canvasWidth = participantsCount * config.participant.width;
    const canvasHeight = relationsCount * config.relation.rowHeight + config.participant.boxHeight*2 + config.participant.paddingTop+ config.participant.paddingBottom;
    this.canvas = createCanvas(canvasWidth, canvasHeight);
    this.context = this.canvas.getContext('2d');
  }
}