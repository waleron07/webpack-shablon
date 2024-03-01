import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from '@/App/App';
import About from '@/pages/about';
import Shop from '@/pages/shop';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'loading...'}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={'loading...'}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
console.log(12);
