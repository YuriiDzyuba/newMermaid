import { VertexData } from '../../flowchart/types/vertexData';

export class Vertex {
  private graph;
  data: VertexData;
  private links;

  constructor(graph, data) {
    this.graph = graph;
    this.data = data;
    this.links = new Map();
  }

  link(vertex: Vertex, edgeText) {
    this.links.set(vertex, edgeText);

    return this
  }

}