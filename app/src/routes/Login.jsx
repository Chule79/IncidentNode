import { Div } from '../UI-components/Div-styles';
import { Img } from '../UI-components/StyledImg';
import { Input } from '../UI-components/StyledInput';
import { Form } from '../UI-components/StyleForm';
import { Label } from '../UI-components/StyleLabel';
import { Anchor } from '../UI-components/StylesAnchor';

const Login = () => {
  return (
    <>
      <Div
        width="100vw"
        height="100vh"
        backgr="blue"
        display="flex"
        justify="center"
        align="center"
      >
        <Div
          width="40%"
          height="55%"
          backgr="red"
          display="flex"
          justify="flex-start"
          align="center"
          flexdir="column"
          gap="1rem"
          padding="1rem"
        >
          <Img src="https://res.cloudinary.com/dcssmtpvq/image/upload/v1669457843/Captura-removebg-preview_hcvi20.png" />
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
              <Label text={'Nickname:'} />
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
              <Label text={'Contraseña:'} />
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
              <Div display="flex" flexdir="row" justify="center"
              align="center">
                <Input type="checkbox" name="remember" texaling="center" height="30px" />
                <Label text={'Remember me'} fontcolor="black"/>
              </Div>
              <Div>
                <Anchor text={'Olvidè Contraseña'} />
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
