import { Relation } from './relation';
import { RelationConfig } from '../types/rendererConfig.type';

export class RelationRenderer {
  constructor(private context: CanvasRenderingContext2D) {}

  createRelation(relation: Relation, coordinates, config: RelationConfig): void {
    const { sourceX, sourceY, targetX, targetY } = coordinates;

    this.addArrow(sourceX, sourceY, targetX, targetY, config);
    this.addText(sourceX, targetX, targetY, relation.name, config);
  }

  private addArrow(lineFromX, lineFromY, lineToX, lineToY, config: RelationConfig): void {
    const arrowHeadLength = 15;
    const dx = lineToX - lineFromX;
    const dy = lineToY - lineFromY;
    const angle = Math.atan2(dy, dx);

    this.context.strokeStyle = config.arrowColor;
    this.context.lineWidth = config.lineWidth;

    this.context.beginPath();
    this.context.moveTo(lineFromX, lineFromY);
    this.context.lineTo(lineToX, lineToY);

    this.context.lineTo(
      lineToX - arrowHeadLength * Math.cos(angle - Math.PI / 6),
      lineToY - arrowHeadLength * Math.sin(angle - Math.PI / 6),
    );
    this.context.moveTo(lineToX, lineToY);
    this.context.lineTo(
      lineToX - arrowHeadLength * Math.cos(angle + Math.PI / 6),
      lineToY - arrowHeadLength * Math.sin(angle + Math.PI / 6),
    );
    this.context.stroke();
  }

  private addText(lineFromX, lineToX, lineToY, text, config: RelationConfig): void {
    this.context.font = config.font;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'bottom';
    this.context.fillStyle = config.textColor;
    this.context.fillText(text, (lineFromX + lineToX) / 2, lineToY);
  }
}
