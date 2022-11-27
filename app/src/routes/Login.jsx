import Anchor from '../components/UI-components/StyledAnchor';
import Div from '../components/UI-components/StyledDiv';
import Form from '../components/UI-components/StyledForm';
import Img from '../components/UI-components/StyledImg';
import Input from '../components/UI-components/StyledInput';
import Label from '../components/UI-components/StyledLabel';
import theme from '../theme';

const Login = () => {
  return (
    <>
      <Div
        width="100vw"
        height="100vh"
        display="flex"
        justify="center"
        align="center"
        backgr={theme.light.backgroundCarta}
      >
        <Div
          width="40%"
          height="55%"
          backgr={theme.light.background}
          display="flex"
          justify="flex-start"
          align="center"
          flexdir="column"
          gap="1rem"
          padding="1rem"
          borderradius="30px"
        >
          <Img
            src="https://res.cloudinary.com/dcssmtpvq/image/upload/v1669457843/Captura-removebg-preview_hcvi20.png"
            width="80%"
          />
          <Form
            width="70%"
            display="flex"
            justify="flex-start"
            align="center"
            flexdir="column"
            gap="0.5rem"
            padding="2rem"
          >
            <Div
              width="100%"
              display="flex"
              justify="flex-start"
              align="center"
              flexdir="column"
              gap="1rem"
            >
              <Label fontcolor={theme.light.primary}>Nickname:</Label>

              <Input
                type="text"
                name="name"
                width="70%"
                borderradius="20px"
                texaling="center"
                height="30px"
              />
            </Div>

            <Div
              width="100%"
              display="flex"
              justify="flex-start"
              align="center"
              flexdir="column"
              gap="0.5rem"
            >
              <Label fontcolor={theme.light.primary}>Contraseña:</Label>
              <Input
                type="password"
                name="passw"
                id="password"
                width="70%"
                borderradius="20px"
                texaling="center"
                height="30px"
              />
            </Div>
            <Div
              width="100%"
              display="flex"
              justify="space-between"
              align="center"
              flexdir="row"
              gap="0.5rem"
            >
              <Div display="flex" flexdir="row" justify="center" align="center">
                <Input type="checkbox" name="remember" texaling="center" height="30px" />
                <Label fontcolor={theme.light.primary}>Remember me</Label>
              </Div>
              <Div>
                <Anchor fontcolor={theme.light.primary}> Olvidè Contraseña</Anchor>
              </Div>
            </Div>

            <Input
              type="submit"
              value="Iniciar sesión"
              width="40%"
              borderradius="20px"
              texaling="center"
              height="30px"
            />
          </Form>
        </Div>
      </Div>
    </>
  );
};

export default Login;
