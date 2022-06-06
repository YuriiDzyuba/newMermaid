import * as fs from 'fs';
import { Canvas, createCanvas } from 'canvas';

import { Diagram } from './types/diagram.type';
import { RendererConfig } from './types/rendererConfig.type';
import { ParticipantRenderer } from './sequintence/participantRenderer';
import { RelationRenderer } from './sequintence/relationRenderer';
import { Participant } from './sequintence/participant';
import { Relation } from './sequintence/relation';
import {ParticipantCoordinates} from "./types/participantCoordinates";
import {RelationCoordinates} from "./types/relationCoordinates";

export class Renderer {
  private readonly participantsRenderer: ParticipantRenderer;
  private readonly relationRenderer: RelationRenderer;
  private readonly config: RendererConfig;
  private readonly participants: Participant[];
  private readonly relations: Relation[];
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  constructor(diagram: Diagram, config: RendererConfig) {
    this.participants = diagram.participants;
    this.config = config;
    this.relations = diagram.relations;
    this.createCanvasAndContext(diagram.participants.length, diagram.relations.length, config);
    this.participantsRenderer = new ParticipantRenderer(this.context);
    this.relationRenderer = new RelationRenderer(this.context);
  }

  printDiagram(): Buffer {
    this.createCanvasBackground(this.context, this.canvas.width, this.canvas.height, this.config.background);
    this.addParticipantsToCanvas(this.participants, this.config);
    this.addRelationsToCanvas(this.relations, this.config);

    const buffer = this.canvas.toBuffer('image/png');

    return buffer;
  }

  private createCanvasBackground(
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    backgroundColor: string,
  ): void {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  private addParticipantsToCanvas(participants: Participant[], config: RendererConfig): void {
    const coordinates: ParticipantCoordinates = {
      topX: config.participant.width / 2,
      topY: config.participant.paddingTop,
      bottomX: config.participant.width / 2,
      bottomY: this.canvas.height - config.participant.paddingBottom - config.participant.boxHeight,
    };

    for (const participant of participants) {
      this.participantsRenderer.render(participant, coordinates, config.participant);
      coordinates.topX = coordinates.topX + config.participant.width;
      coordinates.bottomX = coordinates.topX;
    }
  }

  private addRelationsToCanvas(relations: Relation[], config: RendererConfig) {
    for (const [order, relation] of relations.entries()) {
      const coordinates: RelationCoordinates = {
        sourceX: this.getParticipantCoordinateX(config.participant.width, relation.sourceParticipant.order),
        sourceY: order === 0 ? config.relation.paddingTop : order * config.relation.rowHeight + config.relation.paddingTop,
        targetX: this.getParticipantCoordinateX(config.participant.width, relation.targetParticipant.order),
        targetY: order === 0 ? config.relation.paddingTop : order * config.relation.rowHeight + config.relation.paddingTop,
      };
      this.relationRenderer.render(relation, coordinates, config.relation);
    }
  }

  private getParticipantCoordinateX(columnWidth: number, i: number): number {
    return i === 0 ? columnWidth / 2 : i * columnWidth + columnWidth / 2;
  }

  private createCanvasAndContext(participantsCount: number, relationsCount: number, config: RendererConfig): void {
    const canvasWidth = participantsCount * config.participant.width;
    const canvasHeight = relationsCount * config.relation.rowHeight + config.participant.boxHeight*2 + config.participant.paddingTop+ config.participant.paddingBottom;
    this.canvas = createCanvas(canvasWidth, canvasHeight);
    this.context = this.canvas.getContext('2d');
  }
}
