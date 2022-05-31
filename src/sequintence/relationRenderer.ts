import { Relation } from './relation';
import { RelationConfig } from '../types/defaultRendererConfig.type';

export class RelationRenderer {
  constructor(private context: CanvasRenderingContext2D) {}

  createRelation(relation: Relation, columnWidth: number, config: RelationConfig, order = 0): void {
    const sourceX = this.getParticipantCoordinateX(columnWidth, relation.sourceParticipant.order);
    const sourceY = order === 0 ? 130 : order * 70 + 130;
    const targetX = this.getParticipantCoordinateX(columnWidth, relation.targetParticipant.order);
    const targetY = sourceY;

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

  private getParticipantCoordinateX(columnWidth: number, i: number): number {
    return i === 0 ? columnWidth / 2 : i * columnWidth + columnWidth / 2;
  }
}
