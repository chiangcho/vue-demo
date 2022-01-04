import { Graph, Addon } from "@antv/x6";
import BaseShape from "../../../config/custom-node/BaseShape.vue";
import { ports } from "./GraphConfig";

export function registerComponent(graph, element) {
  let stencil = new Addon.Stencil({
    title: "组件",
    target: graph,
    stencilGraphWidth: 300,
    stencilGraphHeight: 600,
    groups: [
      {
        name: "group1",
        title: "通用组件",
      },
    ],
  });
  element.appendChild(stencil.container);
  let baseNodeComponent = {
    template: `<base-shape></base-shape>`,
    components: {
      BaseShape,
    },
  };

  let baseNodeShape = {
    shape: "vue-shape",
    x: 32,
    y: 48,
    width: 180,
    height: 32,
    component: baseNodeComponent,
    ports: { ...ports },
  };
  Graph.registerVueComponent("base-node-component", baseNodeComponent, true);
  const baseNode = graph.createNode(baseNodeShape);

  stencil.load([baseNode], "group1");
}
