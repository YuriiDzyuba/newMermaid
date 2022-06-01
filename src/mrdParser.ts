import * as fs from 'fs';

import { Participant } from './sequintence/participant';
import { Relation } from './sequintence/relation';
import { Diagram } from './types/diagram.type';

type sourceAndTargetParticipants = {
  sourceName: string;
  targetName: string;
};

export function mrdParser(pathToFile: string): Diagram {
  const participants = [];
  const relations = [];

  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const rows = fileContent.split(`\n`);
  const [diagramType, ...diagramBody] = rows.map((e) => e.trim());

  if (diagramType != 'sequenceDiagram') {
    throw new Error('unimplemented diagram format');
  }

  diagramBody.forEach((e, i) => {
    let splittedString = e.split(':');

    switch (splittedString[0].trim()) {
      case 'part':
        participants.push(new Participant(splittedString[1].trim(), i));
        break;
      case 'rel':
        const { sourceName, targetName } = _getSourceAndTargetParticipantNames(splittedString[1]);
        const relationName = _getRelationName(splittedString[1]);
        const sourceParticipant = _getParticipantByName(sourceName, participants);
        const targetParticipant = _getParticipantByName(targetName, participants);

        relations.push(new Relation(sourceParticipant, targetParticipant, relationName));
        break;
    }
  });

  return { participants, relations };
}

function _getSourceAndTargetParticipantNames(string: string): sourceAndTargetParticipants {
  let relationDirection = string.substring(string.indexOf(`(`) + 1, string.lastIndexOf(`)`));

  const splittedDirection = relationDirection.split('>>');
  const sourceName = splittedDirection[0].trim();
  const targetName = splittedDirection.pop().trim();

  return { sourceName, targetName };
}

function _getParticipantByName(participanName: string, participants: Participant[]): Participant {
  const foundedParticipant = participants.find((e) => e.name === participanName);

  if (!foundedParticipant) throw new Error(`cant find participant -- ${foundedParticipant}`);

  return foundedParticipant;
}

function _getRelationName(string: string): string {
  return string.substring(string.indexOf(`"`) + 1, string.lastIndexOf(`"`));
}
