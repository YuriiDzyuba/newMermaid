import { Relation } from './relation';
import { RelationConfig } from '../types/rendererConfig.type';

export class RelationRenderer {
  private addArrow(context, lineFromX, lineFromY, lineToX, lineToY, config: RelationConfig): void {
    const arrowHeadLength = 15;
    const dx = lineToX - lineFromX;
    const dy = lineToY - lineFromY;
    const angle = Math.atan2(dy, dx);

    context.strokeStyle = config.arrowColor;
    context.lineWidth = config.lineWidth;

    context.beginPath();
    context.moveTo(lineFromX, lineFromY);
    context.lineTo(lineToX, lineToY);

    context.lineTo(lineToX - arrowHeadLength * Math.cos(angle - Math.PI / 6), lineToY - arrowHeadLength * Math.sin(angle - Math.PI / 6));
    context.moveTo(lineToX, lineToY);
    context.lineTo(lineToX - arrowHeadLength * Math.cos(angle + Math.PI / 6), lineToY - arrowHeadLength * Math.sin(angle + Math.PI / 6));
    context.stroke();
  }

  private addText(context: CanvasRenderingContext2D, lineFromX, lineToX, lineToY, text, config: RelationConfig): void {
    context.font = config.font;
    context.textAlign = 'center';
    context.textBaseline = 'bottom';
    context.fillStyle = config.textColor;
    context.fillText(text, (lineFromX + lineToX) / 2, lineToY);
  }

  private getParticipantCoordinateX(columnWidth: number, i: number): number {
    return i === 0 ? columnWidth / 2 : i * columnWidth + columnWidth / 2;
  }

  createRelation(context: CanvasRenderingContext2D, relations: Relation[], columnWidth: number, config: RelationConfig): void {
    for (let i = 0; i < relations.length; i++) {
      const sourceX = this.getParticipantCoordinateX(columnWidth, relations[i].sourceParticipant.order);
      const sourceY = i === 0 ? 130 : i * 70 + 130;
      const targetX = this.getParticipantCoordinateX(columnWidth, relations[i].targetParticipant.order);
      const targetY = sourceY;

      this.addArrow(context, sourceX, sourceY, targetX, targetY, config);
      this.addText(context, sourceX, targetX, targetY, relations[i].name, config);
    }
  }
}
