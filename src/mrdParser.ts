import * as fs from 'fs';

import { Participant } from './sequintence/participant';
import { Relation } from './sequintence/relation';

export class MrdParser {
  private participants: Participant[];
  private relations: Relation[];

  constructor(path: string) {
    this.parseMrd(path);
  }

  private getSourceAndTargetParticipantNames(string) {
    let relationDirection = string.substring(string.indexOf(`(`) + 1, string.lastIndexOf(`)`));

    const splittedDirection = relationDirection.split('>>');
    const sourceName = splittedDirection[0].trim();
    const targetName = splittedDirection.pop().trim();

    return {
      sourceName,
      targetName,
    };
  }

  private getParticipantByName(name) {
    const foundedParticipant = this.participants.find((e) => e.name === name);

    if (!foundedParticipant) throw new Error(`cant find participant -- ${foundedParticipant}`);

    return foundedParticipant;
  }

  private getRelationName(string) {
    return string.substring(string.indexOf(`"`) + 1, string.lastIndexOf(`"`));
  }

  parseMrd(pathToFile) {
    const fileContent = fs.readFileSync(pathToFile, 'utf-8');
    const splitted = fileContent.split(`\n`);
    const [diagramType, ...diagramBody] = splitted.map((e) => e.trim());

    if (diagramType != 'sequenceDiagram') {
      throw new Error('unimplemented diagram format');
    }

    diagramBody.forEach((e, i) => {
      let splittedString = e.split(':');

      switch (splittedString[0].trim()) {
        case 'part':
          this.participants
            ? this.participants.push(new Participant(splittedString[1].trim(), i))
            : (this.participants = [new Participant(splittedString[1].trim(), i)]);
          break;
        case 'rel':
          const { sourceName, targetName } = this.getSourceAndTargetParticipantNames(splittedString[1]);
          const relationName = this.getRelationName(splittedString[1]);
          const sourceParticipant = this.getParticipantByName(sourceName);
          const targetParticipant = this.getParticipantByName(targetName);

          if (this.relations) {
            this.relations.push(new Relation(sourceParticipant, targetParticipant, relationName));
          } else {
            this.relations = [new Relation(sourceParticipant, targetParticipant, relationName)];
          }
          break;
      }
    });
  }

  createDiagramStructure() {
    return {
      participants: this.participants,
      relations: this.relations,
    };
  }
}
