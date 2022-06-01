import { RendererConfig } from '../types/rendererConfig.type';

export const defaultRendererConfig: RendererConfig = {
  background: '#acc4e2',
  participant: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 300,
    textColor: '#ffffff',
    boxHeight: 45,
    boxColor: '#26134b',
    lineColor: '#8165b8',
    lineWidth: 4,
    font: 'bold 20pt Menlo',
  },
  relation: {
    paddingTop: 130,
    rowHeight: 80,
    arrowColor: '#950e0e',
    textColor: '#950e0e',
    lineWidth: 2,
    font: 'bold 16pt Menlo',
  },
};
