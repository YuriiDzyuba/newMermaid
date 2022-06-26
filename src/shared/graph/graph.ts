import { Vertex } from './vertex';
import { VertexData } from '../../flowchart/types/vertexData';

export class Graph {
  private readonly keyField;
  private readonly vertices: Map<string, Vertex>;

  constructor(keyField: string) {
    this.keyField = keyField;
    this.vertices = new Map();
  }

  add(data: VertexData) {
    const currentIndex = this.vertices.size
    const key = data[this.keyField]
    const existingVertex = this.vertices.get(key)

    if (existingVertex === undefined){
      const vertex = new Vertex(this, {...data, id: currentIndex});
      this.vertices.set(key, vertex);
      return vertex
    } else {
      return existingVertex
    }
  }

  select(query){
    const vertices = new Set();

    for (const vertex of this.vertices.values()) {
      let condition = true;
      const data = vertex.data;

      if (data) {
        for (const field in query) {
          condition = condition && data[field] === query[field];
        }
        if (condition) vertices.add(vertex)
      }
    }
    return vertices
  }
}