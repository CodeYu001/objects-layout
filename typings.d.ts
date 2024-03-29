declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'nprogress';
declare module '@ant-design/pro-skeleton';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
