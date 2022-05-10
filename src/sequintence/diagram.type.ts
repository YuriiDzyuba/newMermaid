import {Participant} from "./participant";
import {Relation} from "./relation";

export type DiagramType =  {
    readonly participants: Participant[],
    readonly relations: Relation[]
}