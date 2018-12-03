declare module '*.md'{
  const content:string;
  export default content;
}

declare module 'storybook-readme';

declare module '@storybook/addon-actions';

declare module '@storybook/addon-knobs';

declare module '@storybook/addon-options';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type AnyFunction = (...args: any[]) => any;

interface AnyObject {
  [index: string]: any;
}
