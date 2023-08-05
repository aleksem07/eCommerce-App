declare module "*.mst" {
  const content: (...args: unknown[]) => string;
  export default content;
}
