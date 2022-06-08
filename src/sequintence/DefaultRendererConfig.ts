import { RendererConfig } from '../types/rendererConfig.type';

export const defaultRendererConfig: RendererConfig = {
  background: '#acc4e2',
  participant: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    textColor: '#ffffff',
    boxHeight: 65,
    boxColor: '#26134b',
    boxCornerRadius: 45,
    lineColor: '#26134b',
    lineWidth: 4,
    font: 'bold 20pt Menlo',
  },
  relation: {
    paddingTop: 130,
    rowHeight: 55,
    arrowColor: '#950e0e',
    textColor: '#950e0e',
    lineWidth: 2,
    font: 'bold 16pt Menlo',
  },
};
