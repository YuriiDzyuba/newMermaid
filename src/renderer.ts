import * as fs from 'fs';
import { Buffer } from 'buffer';

import { Diagram } from './types/diagram.type';
import { NodeCanvas } from './types/nodeCanvas.interface';
import { RendererConfig } from './types/rendererConfig.type';
import { ParticipantRenderer } from './sequintence/participantRenderer';
import { RelationRenderer } from './sequintence/relationRenderer';
import { Participant } from './sequintence/participant';
import { Relation } from './sequintence/relation';

const { createCanvas } = require('canvas');

export class Renderer {
  private readonly participantsRenderer: ParticipantRenderer;
  private readonly relationRenderer: RelationRenderer;
  private readonly config: RendererConfig;
  private readonly participants: Participant[];
  private readonly relations: Relation[];
  private canvas: NodeCanvas;
  private context: CanvasRenderingContext2D;

  constructor(diagram: Diagram, config: RendererConfig) {
    this.participantsRenderer = new ParticipantRenderer();
    this.relationRenderer = new RelationRenderer();
    this.participants = diagram.participants;
    this.config = config;
    this.relations = diagram.relations;
    this.createCanvasAndContext(diagram.participants.length, diagram.relations.length, config);
  }

  private createCanvasAndContext(participantsCount: number, relationsCount: number, config: RendererConfig): void {
    const canvasWidth = participantsCount * config.columnWidth;
    const canvasHeight = relationsCount * config.relationHeight + 60;
    this.canvas = createCanvas(canvasWidth, canvasHeight);
    this.context = this.canvas.getContext('2d');
  }

  private createBackground(context, canvasWidth: number, canvasHeight: number, backgroundColor: string): void {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  printDiagram(): Buffer {
    this.createBackground(this.context, this.canvas.width, this.canvas.height, this.config.background);
    this.participantsRenderer.renderParticipants(
      this.context,
      this.participants,
      this.relations.length,
      this.config.relationHeight,
      this.config.participant,
    );
    this.relationRenderer.createRelation(this.context, this.relations, this.config.participant.width, this.config.relation);
    const buffer = this.canvas.toBuffer('image/png');

    return buffer;
  }
}
