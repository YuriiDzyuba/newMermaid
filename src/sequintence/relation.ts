import { Participant } from './participant';

export class Relation {
  constructor(
      readonly sourceParticipant: Participant,
      readonly targetParticipant: Participant,
      readonly name: string
  ) {}
}
