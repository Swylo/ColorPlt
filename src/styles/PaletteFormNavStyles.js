import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { DRAWER_WIDTH } from '../constant';
import sizes from './sizes';

const drawerWidth = DRAWER_WIDTH ;
const styles = theme => ({
  navBtns: {
    marginRight: "1rem",
    [sizes.down("xs")]: {
      marginRight: "0.5rem"
    }
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      margin: "0 0.2rem",
      padding: "0.3rem"
    }
  },
  link: {
    textDecoration: "none"
  }
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}));

export { styles, AppBar };