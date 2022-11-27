import theme from '../../theme';
import Div from './StyledDiv';

const ModelDivInfo = () => {
  return (
    <Div
      backgr={theme.light.background}
      width="50rem"
      height="5rem"
      borderradius="9px"
      margLeft="15rem"
      fontcolor={theme.light.primary}
      align="center"
    ></Div>
  );
};

export default ModelDivInfo;
