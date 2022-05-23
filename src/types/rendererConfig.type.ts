export type ParticipantConfig = {
  width: number;
  textColor: string;
  rectangleHeight: number;
  boxColor: string;
  lineColor: string;
  lineWidth: number;
  font: string;
};

export type RelationConfig = {
  arrowColor: string;
  textColor: string;
  lineWidth: number;
  font: string;
};

export type RendererConfig = {
  background: string;
  lineColor: string;
  textColor: string;
  participantBoxColor: string;
  columnWidth: number;
  relationHeight: number;
  participant: ParticipantConfig;
  relation: RelationConfig;
};
