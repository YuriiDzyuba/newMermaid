import { Participant } from './participant';
import { ParticipantConfig } from '../types/rendererConfig.type';

export class ParticipantRenderer {
  constructor(private context: CanvasRenderingContext2D) {}

  render(participant: Participant, coordinates, config: ParticipantConfig): void {
    const { lineColor, lineWidth, width, paddingTop, ...restConfig } = config;
    const { topX, topY, bottomX, bottomY } = coordinates;

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

  private addBoxWithText(coordinates, boxText, config: Omit<ParticipantConfig, 'lineColor' | 'lineWidth' | 'width' | 'paddingTop'>): void {
    this.context.font = config.font;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = config.boxColor;

    const textWidth = this.context.measureText(boxText).width;
    const rectangleWidth = textWidth + 20;
    const rectangleHeight = config.boxHeight;
    const rectangleStartTopX = coordinates.x - rectangleWidth / 2;

    if (config.boxCornerRadius) {
      const cornerRadius = config.boxCornerRadius
      this.context.strokeStyle = config.boxColor;
      this.context.lineJoin = "round";
      this.context.lineWidth = cornerRadius;
      this.context.strokeRect(rectangleStartTopX+(cornerRadius/2), coordinates.y+(cornerRadius/2), rectangleWidth-cornerRadius, rectangleHeight-cornerRadius);
      this.context.fillRect(rectangleStartTopX+(cornerRadius/2), coordinates.y+(cornerRadius/2), rectangleWidth-cornerRadius, rectangleHeight-cornerRadius);

    } else {
      this.context.fillRect(rectangleStartTopX, coordinates.y, rectangleWidth, rectangleHeight);
    }

    this.context.fillStyle = config.textColor;
    this.context.fillText(boxText, coordinates.x, coordinates.y+rectangleHeight/2);
  }
}
