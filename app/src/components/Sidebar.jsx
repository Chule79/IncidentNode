import logo from '../public/incidencias.png';
import SidebarNav from './SidebarNav';
import Img from './UI-components/StyledImg';
import SidebarStyle from './UI-components/StyledSidebar';

const Sidebar = () => {
  return (
    <SidebarStyle>
      <Img src={logo} alt="logo" width="12rem" />
      <SidebarNav />
    </SidebarStyle>
  );
};

export default Sidebar;
