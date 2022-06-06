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
    let [nodeType, nodeValue] = e.split(':');

    switch (nodeType.trim()) {
      case 'part':
        participants.push(new Participant(nodeValue.trim(), i));
        break;
      case 'rel':
        const { sourceName, targetName } = getSourceAndTargetParticipantNames(nodeValue);
        const relationName = getRelationName(nodeValue);
        const sourceParticipant = getParticipantByName(sourceName, participants);
        const targetParticipant = getParticipantByName(targetName, participants);

        relations.push(new Relation(sourceParticipant, targetParticipant, relationName));
        break;
    }
  });

  return { participants, relations };
}

function getSourceAndTargetParticipantNames(string: string): sourceAndTargetParticipants {
  let relationDirection = string.substring(string.indexOf(`(`) + 1, string.lastIndexOf(`)`));

  const splittedDirection = relationDirection.split('>>');
  const sourceName = splittedDirection[0].trim();
  const targetName = splittedDirection.pop().trim();

  return { sourceName, targetName };
}

function getParticipantByName(participanName: string, participants: Participant[]): Participant {
  const foundedParticipant = participants.find((e) => e.name === participanName);

  if (!foundedParticipant) throw new Error(`cant find participant -- ${foundedParticipant}`);

  return foundedParticipant;
}

function getRelationName(string: string): string {
  return string.substring(string.indexOf(`"`) + 1, string.lastIndexOf(`"`));
}
