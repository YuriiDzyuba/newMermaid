import { Participant } from '../participant';
import { Relation } from '../relation';

export type ParsedSequenceMrd = {
  readonly participants: Participant[];
  readonly relations: Relation[];
};
