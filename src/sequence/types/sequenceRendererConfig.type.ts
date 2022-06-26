export type ParticipantConfig = {
  /** padding top px*/
  paddingTop: number;

  /** padding bottom px*/
  paddingBottom: number;

  /** canvas with px */
  width: number;

  /** tex color Hex*/
  textColor: string;

  /** participant text box height px*/
  boxHeight: number;

  /** participant text box color Hex*/
  boxColor: string;

  /** corner radius of text box px*/
  boxCornerRadius: number;

  /** line color Hex*/
  lineColor: string;

  /** line width px*/
  lineWidth: number;

  /** above line text font weight,size and type (bold 20pt Menlo)*/
  font: string;
};

export type RelationConfig = {
  /** padding top px*/
  paddingTop: number;

  /** one relation row height px*/
  rowHeight: number;

  /** line and arrow color Hex*/
  arrowColor: string;

  /** above line text color Hex*/
  textColor: string;

  /** arrow line width px*/
  lineWidth: number;

  /** above line text font weight,size and type (bold 20pt Menlo)*/
  font: string;
};

export type SequenceRendererConfig = {
  /** canvas background*/
  background: string;

  /** configs for participant instance*/
  participant: ParticipantConfig;

  /** configs for relation instance*/
  relation: RelationConfig;
};
