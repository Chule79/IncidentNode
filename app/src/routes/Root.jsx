import { Outlet } from 'react-router-dom';

import Navigator from '../components/components/Navigator';

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
