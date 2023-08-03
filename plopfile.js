function addActions(data, src) {
  const actions = [
    {
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.ts`,
      templateFile: "templates/component.ts.hbs",
    },
    {
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.test.ts`,
      templateFile: "templates/test.ts.hbs",
    },
  ];

  if (data.addStyles && src === "components") {
    actions.push({
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.scss`,
      template: "",
    });
  }

  if (data.addTypes) {
    actions.push({
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.types.ts`,
      template: "",
    });
  }

  if (src === "components") {
    actions.push({
      type: "add",
      path: `src/${src}/{{dashCase name}}/{{dashCase name}}.html`,
      templateFile: "templates/component.html.hbs",
    });
  }

  return actions;
}
const prompts = [
  {
    type: "input",
    name: "name",
    message: "Enter the component name (in PascalCase):",
    validate: (value) => {
      if (/^[A-Z][A-Za-z]*$/.test(value)) {
        return true;
      }
      return "Invalid component name. Must be in PascalCase and start with a capital letter.";
    },
  },
  {
    type: "confirm",
    name: "addStyles",
    message: "Do you want to add an SCSS file?",
    default: false,
  },
  {
    type: "confirm",
    name: "addTypes",
    message: "Do you want to add a *.types.ts file?",
    default: false,
  },
];

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts,
    actions: (data) => {
      const res = addActions(data, "components");
      return res;
    },
  });
  plop.setGenerator("page", {
    description: "Generate a new page",
    prompts,
    actions: (data) => {
      const res = addActions(data, "pages");
      return res;
    },
  });
  plop.setGenerator("service", {
    description: "Generate a new service",
    prompts,
    actions: (data) => {
      const res = addActions(data, "services");
      return res;
    },
  });
  plop.setGenerator("util", {
    description: "Generate a new util",
    prompts,
    actions: (data) => {
      const res = addActions(data, "utils");
      return res;
    },
  });
};
