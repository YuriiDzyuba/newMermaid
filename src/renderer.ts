import * as fs from 'fs';

import { Diagram } from './types/diagram.type';
import { NodeCanvas } from './types/nodeCanvas.interface';
import { DefaultRendererConfig } from './types/defaultRendererConfig.type';
import { ParticipantRenderer } from './sequintence/participantRenderer';
import { RelationRenderer } from './sequintence/relationRenderer';
import { Participant } from './sequintence/participant';
import { Relation } from './sequintence/relation';

const { createCanvas } = require('canvas');

export class Renderer {
  private readonly participantsRenderer: ParticipantRenderer;
  private readonly relationRenderer: RelationRenderer;
  private readonly config: DefaultRendererConfig;
  private readonly participants: Participant[];
  private readonly relations: Relation[];
  private canvas: NodeCanvas;
  private context: CanvasRenderingContext2D;

  constructor(diagram: Diagram, config: DefaultRendererConfig) {
    this.participants = diagram.participants;
    this.config = config;
    this.relations = diagram.relations;
    this.createCanvasAndContext(diagram.participants.length, diagram.relations.length, config);
    this.participantsRenderer = new ParticipantRenderer(this.context);
    this.relationRenderer = new RelationRenderer(this.context);
  }

  private createCanvasAndContext(participantsCount: number, relationsCount: number, config: DefaultRendererConfig): void {
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
    this.participants.forEach((participant, order) => {
      this.participantsRenderer.createParticipant(
        participant,
        this.relations.length,
        this.config.relationHeight,
        this.config.participant,
        order,
      );
    });

    this.relations.forEach((relation, order) => {
      this.relationRenderer.createRelation(relation, this.config.participant.width, this.config.relation, order);
    });

    const buffer = this.canvas.toBuffer('image/png');
    fs.writeFileSync('out.png', buffer);
    return buffer;
  }
}
