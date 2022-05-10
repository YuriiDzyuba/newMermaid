export class Relation {
    constructor(
        readonly sourceParticipantName: string,
        readonly targetParticipantName: string,
        readonly sourceParticipantIndex: number,
        readonly targetParticipantIndex: number,
        readonly name: string
    ) {}
}