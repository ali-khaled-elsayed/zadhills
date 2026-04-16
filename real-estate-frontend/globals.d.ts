// CSS Modules
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
  export = content;
}