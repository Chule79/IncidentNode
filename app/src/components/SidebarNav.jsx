import {
  FaCalendarAlt,
  FaClipboardList,
  FaEdit,
  FaUserCog,
  FaUsers,
} from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

import theme from '../theme';
import Div from './UI-components/StyledDiv';

const SidebarNav = () => {
  return (
    <Div display="flex" flexdir="column" gap="5rem" margTop="2rem">
      <NavLink to="">
        <Div
          display="flex"
          flexdir="row"
          gap="1.5rem"
          fontcolor={theme.light.primary}
          fontsize="1.1rem"
          align="center"
        >
          <GoHome />
          <p>Desktop</p>
        </Div>
      </NavLink>
      <NavLink to="">
        <Div
          display="flex"
          flexdir="row"
          gap="1.5rem"
          fontcolor={theme.light.primary}
          fontsize="1.1rem"
          align="center"
        >
          <FaUsers />
          <p>Team</p>
        </Div>
      </NavLink>
      <NavLink to="">
        <Div
          display="flex"
          flexdir="row"
          gap="1.5rem"
          fontcolor={theme.light.primary}
          fontsize="1.1rem"
          align="center"
        >
          <FaCalendarAlt />
          <p>Notice</p>
        </Div>
      </NavLink>
      <NavLink to="">
        <Div
          display="flex"
          flexdir="row"
          gap="1.5rem"
          fontcolor={theme.light.primary}
          fontsize="1.1rem"
          align="center"
        >
          <FaClipboardList />
          <p>Incidents</p>
        </Div>
      </NavLink>
      <NavLink to="">
        <Div
          display="flex"
          flexdir="row"
          gap="1.5rem"
          fontcolor={theme.light.primary}
          fontsize="1.1rem"
          align="center"
        >
          <FaEdit />
          <p>New incident</p>
        </Div>
      </NavLink>
      <NavLink to="">
        <Div
          display="flex"
          flexdir="row"
          gap="1.5rem"
          fontcolor={theme.light.primary}
          fontsize="1.1rem"
          align="center"
        >
          <FaUserCog />
        </Div>
      </NavLink>
    </Div>
  );
};

export default SidebarNav;
