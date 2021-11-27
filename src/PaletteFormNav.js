import React from 'react'
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm"
import { withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { styles, AppBar } from "./styles/PaletteFormNavStyles"

function PaletteFormNav(props) {

  const [formShowing, setForm] = React.useState(false)

  const openForm = () => {
    setForm(true)
  }

  const closeForm = () => {
    setForm(false)
  }
    
    const { open, classes } = props;
    return (
          <div>
            <CssBaseline />
            <AppBar position="fixed" open={props.open} color="default">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.openDrawer}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                  Create A Palette
              </Typography>
              </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                color="error"
                className={classes.button}
              >Go Back</Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={openForm}
              className={classes.button}
            >
              Save
            </Button>
          </div> 
        </AppBar>
            {formShowing && <PaletteMetaForm
            palettes={props.palettes}
            handleSubmit={props.handleSubmit}
            closeForm={closeForm}
            />}
     </div>
  );
}

export default withStyles(styles)(PaletteFormNav);
 