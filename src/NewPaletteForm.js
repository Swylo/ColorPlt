import React from 'react';
import { useTheme } from '@mui/material/styles';
import ColorPickerForm from './ColorPickerForm';
import PaletteFormNav from "./PaletteFormNav";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMoveImmutable } from 'array-move';
import { arrayMove } from 'react-sortable-hoc';
import { classes, Main, DrawerHeader } from "./styles/NewPaletteFormStyles"
import { DRAWER_WIDTH } from './constant';
import seedColors from './seedColors';


const drawerWidth = DRAWER_WIDTH;

export default function NewPaletteForm(props) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [colors, setColors] = React.useState(seedColors[0].colors);
    const [allNames, addName] = React.useState(new Set(colors.map(c => c.name)));
    const [allColors, addColor] = React.useState(new Set(colors.map(c => c.color)));
  
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    
    const addNewColor = (newColor) => {
      setColors([...colors, newColor])
      addName(allNames.add(newColor.name.toLowerCase()))
      addColor(allColors.add(newColor.color.toLowerCase()))
    }

    const handleSubmit = (newPalette) => {
      const newPltName = newPalette.paletteName;
      newPalette.id = newPltName.toLowerCase().replace(/ /g, "-");
      newPalette.colors = colors;
      props.savePalette(newPalette)
      props.history.push("/")
    }

  const removeColor = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName));
    const filtereddNames = new Set()
    const filteredColorValue = new Set()
    colors.forEach(c => {
      if (c.name !== colorName) {
        filtereddNames.add(c.name)
        filteredColorValue.add(c.color)
      }
    });
    addName(filtereddNames)
    addColor(filteredColorValue)
  }

    const onSortEnd = ({oldIndex, newIndex}) => {
    setColors((colors) => arrayMoveImmutable(colors, oldIndex, newIndex),
    );
  };

  const clearColors = () => {
    setColors([]);
    addName(new Set());
    addColor(new Set());
  }

  const addRandomColor = () => {
    const allPltColors = props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor = allPltColors[rand];
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allPltColors.length);
      randomColor = allPltColors[rand];
      isDuplicateColor = allNames.has(randomColor.name.toLowerCase());
    }
    setColors([...colors, randomColor]);
    addName(allNames.add(randomColor.name.toLowerCase()))
    addColor(allColors.add(randomColor.color.toLowerCase()))
    console.log(randomColor, allNames)
  }
  
  
  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        open={open}
        palettes={props.palettes}
        openDrawer={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <section style={classes.container}>
          <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
          <div style={classes.buttons}>
            <Button
              variant="contained"
              color="error"
              onClick={clearColors}
              style={classes.button}
            >Clear Palette</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              style={classes.button}
            >Random Color</Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            allColors={allColors}
            allNames={allNames}
          />
        </section>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </Main>
    </Box>
  );
}