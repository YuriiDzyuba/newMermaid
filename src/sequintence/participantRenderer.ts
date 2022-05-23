import { Participant } from './participant';
import { ParticipantConfig } from '../types/rendererConfig.type';

export class ParticipantRenderer {
  private addLine(context: CanvasRenderingContext2D, coordinates, config) {
    context.strokeStyle = config.lineColor;
    context.lineWidth = config.lineWidth;
    context.beginPath();
    context.moveTo(coordinates.topX, coordinates.topY);
    context.lineTo(coordinates.bottomX, coordinates.bottomY);
    context.stroke();
  }

  private addBoxWithText(
    context: CanvasRenderingContext2D,
    coordinates,
    boxText,
    config: Omit<ParticipantConfig, 'lineColor' | 'lineWidth' | 'width'>,
  ): void {
    context.font = config.font;
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = config.boxColor;

    const textWidth = context.measureText(boxText).width;
    const rectangleWidth = textWidth + 20;
    const rectangleHeight = config.rectangleHeight;
    const rectangleStartTopX = coordinates.x - rectangleWidth / 2;

    context.fillRect(rectangleStartTopX, coordinates.y, rectangleWidth, rectangleHeight);
    context.fillStyle = config.textColor;
    context.fillText(boxText, coordinates.x, coordinates.y);
  }

  renderParticipants(
    context: CanvasRenderingContext2D,
    participants: Participant[],
    rowsNum: number,
    rowsHeight: number,
    config: ParticipantConfig,
  ): void {
    for (let i = 0; i < participants.length; i++) {
      const { lineColor, lineWidth, width, ...restConfig } = config;

      const topX = i === 0 ? width / 2 : i * width + width / 2;
      const topY = 10;
      const bottomX = topX;
      const bottomY = rowsNum * rowsHeight;

      this.addLine(context, { topX, topY, bottomX, bottomY }, { lineColor, lineWidth });
      this.addBoxWithText(context, { x: topX, y: topY }, participants[i].name, restConfig);
      this.addBoxWithText(context, { x: bottomX, y: bottomY }, participants[i].name, restConfig);
    }
  }
}
