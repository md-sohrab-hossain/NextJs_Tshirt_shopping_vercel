import * as NextImage from 'next/image';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../src/styles/index.scss';

// Storybook can't load static path issue: https://dev.to/jonasmerlin/how-to-use-the-next-js-image-component-in-storybook-1415
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
});

// configure react-query with storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

const MINIMAL_VIEWPORTS = {
  mobile1: {
    name: 'Small mobile',
    styles: {
      height: '568px',
      width: '375px',
    },
    type: 'mobile',
  },
  mobile2: {
    name: 'Large mobile',
    styles: {
      height: '896px',
      width: '480px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet',
    styles: {
      height: '1024px',
      width: '768px',
    },
    type: 'tablet',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  paddings: {
    values: [
      { name: 'none', value: '0' },
      { name: 'small', value: '16px' },
      { name: 'medium', value: '32px' },
      { name: 'large', value: '64px' },
    ],
    default: 'none',
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'gray',
        value: '#f6f6f6',
      },
      {
        name: 'black',
        value: '#373a44',
      },
    ],
  },
  html: {
    root: '#root', // default: #root
    removeEmptyComments: true, // default: false
    highlighter: {
      showLineNumbers: true, // default: false
      wrapLines: true, // default: true
    },
  },
};

export const decorators = [
  story => (
    <QueryClientProvider client={queryClient}>
      {story()}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ),
];
