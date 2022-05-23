import { Participant } from '../sequintence/participant';
import { Relation } from '../sequintence/relation';

export type Diagram = {
  readonly participants: Participant[];
  readonly relations: Relation[];
};
