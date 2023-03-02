export type CallbackFunction = () => void | Promise<void>;

type TPropsWithOnClickCallback<T = unknown> = T & {
  onClick?: CallbackFunction;
};

declare module 'react' {
  interface PropsWithOnClickCallback extends TPropsWithOnClickCallback {}
}
