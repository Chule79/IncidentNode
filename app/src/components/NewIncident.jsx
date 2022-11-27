import Div from '../components/UI-components/StyledDiv';
import Form from '../components/UI-components/StyledForm';
import Img from '../components/UI-components/StyledImg';
import Input from '../components/UI-components/StyledInput';
import Label from '../components/UI-components/StyledLabel';
import theme from '../theme';

const NewIncidentDiv = () => {
  return (
    <Div
      width="100%"
      height="100%"
      display="flex"
      justify="center"
      align="center"
      backgr={theme.light.backgroundCarta}
    >
      <Div
        width="40rem"
        height="100%"
        backgr={theme.light.background}
        display="flex"
        justify="flex-start"
        align="center"
        flexdir="column"
        gap="1rem"
        padding="1rem"
        borderradius="30px"
      >
        <Form
          width="40rem"
          display="flex"
          justify="flex-start"
          align="center"
          flexdir="column"
          gap="1rem"
          padding="2rem"
        >
          <Div
            width="100%"
            display="flex"
            justify="flex-start"
            align="center"
            flexdir="column"
            gap="0.5rem"
          >
            <Label fontcolor={theme.light.primary}>Título</Label>

            <Input
              type="text"
              name="name"
              width="20rem"
              border="none"
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
            <Label fontcolor={theme.light.primary}>Descripción:</Label>

            <Input
              type="text"
              name="name"
              width="20rem"
              border="none"
              borderradius="20px"
              texaling="center"
              height="10rem"
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
            <Label fontcolor={theme.light.primary}>Añada alguna foto</Label>

            <Input
              type="text"
              name="name"
              width="20rem"
              border="none"
              borderradius="20px"
              texaling="center"
              height="30px"
            />
          </Div>
          <Div>
            <Img />
          </Div>
          <Input
            type="submit"
            value="Enviar"
            width="40%"
            border="none"
            borderradius="20px"
            texaling="center"
            height="30px"
          />
        </Form>
      </Div>
    </Div>
  );
};

export default NewIncidentDiv;
