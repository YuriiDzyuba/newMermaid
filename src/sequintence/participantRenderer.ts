import { Participant } from './participant';
import { ParticipantConfig } from '../types/defaultRendererConfig.type';

export class ParticipantRenderer {
  constructor(private context: CanvasRenderingContext2D) {}

  createParticipant(participant: Participant, rowsNum: number, rowsHeight: number, config: ParticipantConfig, order: number = 0): void {
    const { lineColor, lineWidth, width, ...restConfig } = config;

    const topX = order === 0 ? width / 2 : order * width + width / 2;
    const topY = 10;
    const bottomX = topX;
    const bottomY = rowsNum * rowsHeight;

    this.addLine({ topX, topY, bottomX, bottomY }, { lineColor, lineWidth });
    this.addBoxWithText({ x: topX, y: topY }, participant.name, restConfig);
    this.addBoxWithText({ x: bottomX, y: bottomY }, participant.name, restConfig);
  }

  private addLine(coordinates, config) {
    this.context.strokeStyle = config.lineColor;
    this.context.lineWidth = config.lineWidth;
    this.context.beginPath();
    this.context.moveTo(coordinates.topX, coordinates.topY);
    this.context.lineTo(coordinates.bottomX, coordinates.bottomY);
    this.context.stroke();
  }

  private addBoxWithText(coordinates, boxText, config: Omit<ParticipantConfig, 'lineColor' | 'lineWidth' | 'width'>): void {
    this.context.font = config.font;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    this.context.fillStyle = config.boxColor;

    const textWidth = this.context.measureText(boxText).width;
    const rectangleWidth = textWidth + 20;
    const rectangleHeight = config.rectangleHeight;
    const rectangleStartTopX = coordinates.x - rectangleWidth / 2;

    this.context.fillRect(rectangleStartTopX, coordinates.y, rectangleWidth, rectangleHeight);
    this.context.fillStyle = config.textColor;
    this.context.fillText(boxText, coordinates.x, coordinates.y);
  }
}
