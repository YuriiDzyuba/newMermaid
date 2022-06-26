import { Participant } from './participant';
import { Relation } from './relation';
import { ParsedSequenceMrd } from './types/parsedSequenceMrd';

type SourceAndTargetParticipants = {
  sourceName: string;
  targetName: string;
};

export function sequenceSyntaxParser(mdrBody: string[]): ParsedSequenceMrd {
  const participants = [];
  const relations = [];


  for (const [rowIndex, row] of mdrBody.entries()) {
    let [nodeType, nodeValue] = row.split(':');

    switch (nodeType.trim()) {
      case 'part':
        participants.push(new Participant(nodeValue.trim(), rowIndex));
        break;
      case 'rel':
        const { sourceName, targetName } = getSourceAndTargetParticipantNames(nodeValue);
        const relationName = getRelationName(nodeValue);
        const sourceParticipant = getParticipantByName(sourceName, participants);
        const targetParticipant = getParticipantByName(targetName, participants);

        relations.push(new Relation(sourceParticipant, targetParticipant, relationName));
        break;
    }
  };

  return { participants, relations };
}


function getSourceAndTargetParticipantNames(nodeValue: string): SourceAndTargetParticipants {
  let relationDirection = nodeValue.substring(nodeValue.indexOf(`(`) + 1, nodeValue.lastIndexOf(`)`));

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
