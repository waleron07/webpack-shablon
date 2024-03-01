import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import classes from './App.module.scss';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import AppImage from '@/assets/app-image.svg';

export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);
  const dincrement = () => setCount((prev) => prev - 1);

  return (
    <div data-testid={'App.DataTestId'}>
      <h1 data-testid={'Platform'}>PLATFORM={__PLATFORM__}</h1>
      <h1 data-testid={'ENV'}>ENV={__ENV__}</h1>
      <div>
        <img width={100} height={100} src={avatarPng} alt="avatar" />
        <img width={100} height={100} src={avatarJpg} alt="avatar" />
      </div>
      <div>
        <AppImage width={50} height={50} color={'red'} />
      </div>
      <Link to={'/about'}>about</Link>
      <br />
      <Link to={'/shop'}>shop</Link>
      <div className={classes.container}>
        <div className={classes.container_count}>
          <h1>{count}</h1>
          <div>
            <button className={classes.increment} onClick={increment}>
              +
            </button>
            <button className={classes.dincrement} onClick={dincrement}>
              -
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
