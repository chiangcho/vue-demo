const commonPortConfig = {
  attrs: {
    circle: {
      r: 6,
      magnet: true,
      stroke: "#5F95FF",
      strokeWidth: 1,
      fill: "#fff",
      style: {
        visibility: "hidden",
      },
    },
  },
};

export const ports = {
  groups: {
    top: {
      position: "top",
      ...commonPortConfig,
    },
    right: {
      position: "right",
      ...commonPortConfig,
    },
    bottom: {
      position: "bottom",
      ...commonPortConfig,
    },
    left: {
      position: "left",
      ...commonPortConfig,
    },
  },
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
};

export const EdgeTools = [
  {
    name: "source-arrowhead",

    args: {
      tagName: "circle",
      attrs: {
        r: 6,
        fill: "#ffa940",
        strokeWidth: 0,
        cursor: "move",
      },
    },
  },
  {
    name: "target-arrowhead",
    args: {
      attrs: {
        fill: "#3199FF",
        cursor: "move",
      },
    },
  },
  {
    name: "button-remove",
    args: {
      distance: -30,
    },
  },
];

export const NodeTools = {
  name: "button-remove",
  args: {
    x: 0,
    y: 0,
    offset: { x: 6, y: 5 },
  },
};
const selectedArgs = { size: 12 };
export const SelectedEdgeAttrs = {
  line: {
    sourceMarker: {
      selectedArgs,
    },
    targetMarker: {
      selectedArgs,
    },
    strokeWidth: 2,
  },
};
const defaultArgs = { size: 8 };
export const DefaultEdgeAttrs = {
  line: {
    sourceMarker: {
      defaultArgs,
    },
    targetMarker: {
      defaultArgs,
    },
    strokeWidth: 1,
  },
};
