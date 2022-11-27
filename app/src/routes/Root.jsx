import { Outlet } from 'react-router-dom';

import Navigator from '../components/Nav';

const Root = () => {
  return (
    <>
      <Navigator />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
