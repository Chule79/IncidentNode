import SidebarStyle from './UI-components/StyledSidebar';
import { GoHome } from 'react-icons/go';
import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaEdit,
  FaUserCog,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import Div from './UI-components/StyledDiv';

const Sidebar = () => {
  return (
    <SidebarStyle>
      <NavLink to="">
      <Div display="flex" flexdir="row" gap="1.5rem">
      <GoHome />
        <p>Desktop</p>
      </Div>
      </NavLink>
      <NavLink to="">
      <Div display="flex" flexdir="row" gap="1.5rem">
      <FaUsers />
        <p>Team</p>
      </Div> 
      </NavLink>
      <NavLink to="">
      <Div display="flex" flexdir="row" gap="1.5rem">
        <FaCalendarAlt />
        <p>Notice</p>
      </Div>   
      </NavLink>
      <NavLink to="">
      <Div display="flex" flexdir="row" gap="1.5rem">
      <FaClipboardList />
        <p>Incidents</p>
      </Div>  
      </NavLink>
      <NavLink to="">
      <Div display="flex" flexdir="row" gap="1.5rem">
      <FaEdit />
        <p>New incident</p>  
      </Div>
      </NavLink>
      <NavLink to="">
        <FaUserCog />
      </NavLink>
    </SidebarStyle>
  );
};

export default Sidebar;
