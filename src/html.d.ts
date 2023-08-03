declare module "*.html" {
  const content: (...args: unknown[]) => string;
  export default content;
}
