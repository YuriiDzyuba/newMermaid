export type ParticipantConfig = {
  /** canvas with px */
  width: number;

  /** tex color Hex*/
  textColor: string;

  /** participant text box height px*/
  boxHeight: number;

  /** participant text box color Hex*/
  boxColor: string;

  /** line color Hex*/
  lineColor: string;

  /** line width px*/
  lineWidth: number;

  /** above line text font weight,size and type (bold 20pt Menlo)*/
  font: string;
};

export type RelationConfig = {
  /** line and arrow color Hex*/
  arrowColor: string;

  /** above line text color Hex*/
  textColor: string;

  /** arrow line width px*/
  lineWidth: number;

  /** above line text font weight,size and type (bold 20pt Menlo)*/
  font: string;
};

export type rendererConfig = {
  /** canvas background*/
  background: string;

  /** one participant column width px*/
  participantWidth: number;

  /** one relation row height px*/
  relationHeight: number;

  /** configs for participant instance*/
  participant: ParticipantConfig;

  /** configs for relation instance*/
  relation: RelationConfig;
};
