import {DiagramType} from "./sequintence/diagram.type";
import * as fs from 'fs';
import {Participant} from "./sequintence/participant";
import {Relation} from "./sequintence/relation";

const { createCanvas, loadImage } = require('canvas')

export class Renderer {
    private readonly background = '#acc4e2'
    private readonly font = 'bold 20pt Menlo'
    private readonly lineColor = '#8165b8'
    private readonly arrowColor = '#8165b8'
    private readonly textColor = '#fff'
    private readonly participantBoxColor = '#26134b'
    private readonly lineWidth = 4
    private readonly columnWidth = 300
    private readonly lineHeight = 130
    private readonly topOffset = 50
    private readonly bottomOffset = 100
    private readonly participantsAxisCoordinateX: number[]
    private readonly relationsAxisCoordinateY: number[]
    private canvas: any
    private ctx: any
    private readonly participants: Participant[]
    private readonly relations: Relation[]
    private canvasWidth: number
    private canvasHeight: number

    constructor(diagram: DiagramType) {
        this.participants = diagram.participants
        this.relations = diagram.relations
        this.participantsAxisCoordinateX = this.getParticipantsAxisCoordinateX()
        this.relationsAxisCoordinateY = this.getRelationsAxisCoordinateX()
        this.createBackground()
    }

    private getParticipantsAxisCoordinateX () {
        return this.participants.map((_, i) => (i === 0 ? this.columnWidth / 2 : i * this.columnWidth + this.columnWidth / 2))
    }
    private getRelationsAxisCoordinateX () {
        return this.relations.map((_, i) => ( i===0 ? this.topOffset+100 :  i*70 + this.topOffset+100))
    }

    private createBackground () {
        this.canvasWidth = this.participants.length * this.columnWidth
        this.canvasHeight = this.relations.length * this.lineHeight
        this.canvas = createCanvas (this.canvasWidth, this.canvasHeight)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = this.background
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    private addLineToCanvas (index, lineStart) {
        this.ctx.strokeStyle = this.lineColor
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(lineStart, this.canvasHeight-this.bottomOffset);
        this.ctx.lineTo(this.participantsAxisCoordinateX[index], this.topOffset);
        this.ctx.stroke();
    }

    private addArrowWithInscriptionToCanvas (fromx, fromy, tox, toy, text="lfgl") {
        const headlen = 15; // length of head in pixels
        const dx = tox - fromx;
        const dy = toy - fromy;
        const angle = Math.atan2(dy, dx);

        this.ctx.strokeStyle = this.arrowColor
        this.ctx.lineWidth = this.lineWidth;

        this.ctx.font = this.font
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'bottom'
        this.ctx.fillStyle = this.textColor

        this.ctx.beginPath();
        this.ctx.fillText(text, (fromx+tox)/2, toy)
        this.ctx.moveTo(fromx, fromy);

        this.ctx.lineTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    private addBoxWithInscription (text, baseCoordinate) {
        this.ctx.font = this.font
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'top'
        this.ctx.fillStyle = this.participantBoxColor

        const textWidth = this.ctx.measureText(text).width
        const rectangleWidth = textWidth +20

        this.ctx.fillRect(baseCoordinate-rectangleWidth/2, this.topOffset, rectangleWidth, this.topOffset)
        this.ctx.fillRect(baseCoordinate-rectangleWidth/2, this.canvasHeight-this.bottomOffset, rectangleWidth, this.topOffset)

        this.ctx.fillStyle = this.textColor

        this.ctx.fillText(text, baseCoordinate, 50)
        this.ctx.fillText(text, baseCoordinate, this.canvasHeight-this.bottomOffset)
    }

    createParticipants () {
        for (let i = 0; i < this.participants.length; i++) {
            this.addLineToCanvas(i, this.participantsAxisCoordinateX[i])
            this.addBoxWithInscription(this.participants[i].name, this.participantsAxisCoordinateX[i])
        }
    }

    createRelation () {
        for (let i = 0; i < this.relations.length; i++) {
            const sourceParticipantCoordinateX = this.participantsAxisCoordinateX[this.relations[i].sourceParticipantIndex]
            const targetParticipantCoordinateX = this.participantsAxisCoordinateX[this.relations[i].targetParticipantIndex]

            this.addArrowWithInscriptionToCanvas(sourceParticipantCoordinateX,  this.relationsAxisCoordinateY[i], targetParticipantCoordinateX, this.relationsAxisCoordinateY[i], this.relations[i].name )
        }
    }

    printDiagram() {
        this.createParticipants()
        this.createRelation()
        const buffer = this.canvas.toBuffer('image/png')
        fs.writeFileSync('./image.png', buffer)
    }
}