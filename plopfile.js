// eslint-disable-next-line max-lines-per-function, func-names
module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the component name (in PascalCase):",
        // eslint-disable-next-line func-names, object-shorthand
        validate: function (value) {
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
        default: true,
      },
      {
        type: "confirm",
        name: "addTypes",
        message: "Do you want to add a *.types.ts file?",
        default: false,
      },
    ],
    // eslint-disable-next-line object-shorthand, func-names
    actions: function (data) {
      const actions = [
        {
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.ts",
          templateFile: "templates/component.ts.hbs",
        },
        {
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.test.ts",
          templateFile: "templates/test.ts.hbs",
        },
      ];

      if (data.addStyles) {
        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.scss",
          template: "",
        });
      }

      if (data.addTypes) {
        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.types.ts",
          template: "",
        });
      }

      return actions;
    },
  });

  // Repeat the same process for other layers (pages, services, utils) if required.
  // For simplicity, I'm providing an example only for components.

  plop.setGenerator("page", {
    description: "Generate a new page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the component name (in PascalCase):",
        // eslint-disable-next-line func-names, object-shorthand
        validate: function (value) {
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
        default: true,
      },
      {
        type: "confirm",
        name: "addTypes",
        message: "Do you want to add a *.types.ts file?",
        default: false,
      },
    ],
    // eslint-disable-next-line object-shorthand, func-names
    actions: function (data) {
      const actions = [
        {
          type: "add",
          path: "src/pages/{{dashCase name}}/{{dashCase name}}.ts",
          templateFile: "templates/component.ts.hbs",
        },
        {
          type: "add",
          path: "src/pages/{{dashCase name}}/{{dashCase name}}.test.ts",
          templateFile: "templates/test.ts.hbs",
        },
      ];

      if (data.addStyles) {
        actions.push({
          type: "add",
          path: "src/pages/{{dashCase name}}/{{dashCase name}}.scss",
          template: "",
        });
      }

      if (data.addTypes) {
        actions.push({
          type: "add",
          path: "src/pages/{{dashCase name}}/{{dashCase name}}.types.ts",
          template: "",
        });
      }

      return actions;
    },
  });

  plop.setGenerator("service", {
    description: "Generate a new service",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the component name (in PascalCase):",
        // eslint-disable-next-line func-names, object-shorthand
        validate: function (value) {
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
        default: true,
      },
      {
        type: "confirm",
        name: "addTypes",
        message: "Do you want to add a *.types.ts file?",
        default: false,
      },
    ],
    // eslint-disable-next-line object-shorthand, func-names
    actions: function (data) {
      const actions = [
        {
          type: "add",
          path: "src/services/{{dashCase name}}/{{dashCase name}}.ts",
          templateFile: "templates/component.ts.hbs",
        },
        {
          type: "add",
          path: "src/services/{{dashCase name}}/{{dashCase name}}.test.ts",
          templateFile: "templates/test.ts.hbs",
        },
      ];

      if (data.addStyles) {
        actions.push({
          type: "add",
          path: "src/services/{{dashCase name}}/{{dashCase name}}.scss",
          template: "",
        });
      }

      if (data.addTypes) {
        actions.push({
          type: "add",
          path: "src/services/{{dashCase name}}/{{dashCase name}}.types.ts",
          template: "",
        });
      }

      return actions;
    },
  });

  plop.setGenerator("util", {
    description: "Generate a new util",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the component name (in PascalCase):",
        // eslint-disable-next-line func-names, object-shorthand
        validate: function (value) {
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
        default: true,
      },
      {
        type: "confirm",
        name: "addTypes",
        message: "Do you want to add a *.types.ts file?",
        default: false,
      },
    ],
    // eslint-disable-next-line object-shorthand, func-names
    actions: function (data) {
      const actions = [
        {
          type: "add",
          path: "src/utils/{{dashCase name}}/{{dashCase name}}.ts",
          templateFile: "templates/component.ts.hbs",
        },
        {
          type: "add",
          path: "src/utils/{{dashCase name}}/{{dashCase name}}.test.ts",
          templateFile: "templates/test.ts.hbs",
        },
      ];

      if (data.addStyles) {
        actions.push({
          type: "add",
          path: "src/utils/{{dashCase name}}/{{dashCase name}}.scss",
          template: "",
        });
      }

      if (data.addTypes) {
        actions.push({
          type: "add",
          path: "src/utils/{{dashCase name}}/{{dashCase name}}.types.ts",
          template: "",
        });
      }

      return actions;
    },
  });
};
