function createAction(path = "templates", template = "", type = "add") {
  return {
    type: type,
    path: path,
    templateFile: template,
  };
}

function addActions(data, src) {
  const actions = [
    createAction(
      `src/${src}/{{dashCase name}}/{{dashCase name}}.test.ts`,
      `templates/${src}/test.ts.txt`
    ),
    createAction(
      `src/${src}/{{dashCase name}}/{{dashCase name}}.ts`,
      `templates/${src}/component.ts.txt`
    ),
  ];
  if (data.addStyles && (src === "components" || src === "pages")) {
    const style = createAction(`src/${src}/{{dashCase name}}/{{dashCase name}}.scss`);
    actions.push(style);
  }
  if (data.addTypes) {
    const types = createAction(`src/${src}/{{dashCase name}}/{{dashCase name}}.types.ts`);
    actions.push(types);
  }
  if (src === "components" || src === "pages") {
    const view = createAction(
      `src/${src}/{{dashCase name}}/{{dashCase name}}.view.ts`,
      `templates/${src}/component.view.ts.txt`
    );
    actions.push(view);
  }
  return actions;
}
const templatefulPrompt = [
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

const templatelessPrompt = [
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
    name: "addTypes",
    message: "Do you want to add a *.types.ts file?",
    default: false,
  },
];

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts: templatefulPrompt,
    actions: (data) => addActions(data, "components"),
  });
  plop.setGenerator("page", {
    description: "Generate a new page",
    prompts: templatefulPrompt,
    actions: (data) => addActions(data, "pages"),
  });
  plop.setGenerator("service", {
    description: "Generate a new service",
    prompts: templatelessPrompt,
    actions: (data) => addActions(data, "services"),
  });
  plop.setGenerator("util", {
    description: "Generate a new util",
    prompts: templatelessPrompt,
    actions: (data) => addActions(data, "utils"),
  });
};
