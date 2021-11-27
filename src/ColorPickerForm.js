import React from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@mui/styles';
import styles from "./styles/ColorPickerFormStyles";

function ColorPickerForm(props) {
    const [currentColor, setCurrentColor] = React.useState("teal");
    const [newName, setNewName] = React.useState("");

    const updateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    }

    const handleChange = (evt) => {
      setNewName(evt.target.value)
    }
    
    const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: newName
        };
        props.addNewColor(newColor)
        setNewName("")
    };

    const { paletteIsFull, allNames, allColors, classes } = props;

    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
        if (allNames.has(value)) {
        return false
        } else {
        return true
        }
    });
  
  ValidatorForm.addValidationRule('isColorUnique', () => {
        if (allColors.has(currentColor)) {
        return false
        } else {
        return true
        }
    });


    return (
        <div style={{width:"80%"}}>
            <ChromePicker
                color={currentColor}
                onChangeComplete={(newColor) => updateCurrentColor(newColor)}
                className={classes.picker}
              />
              <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                  <TextValidator
                    value={newName}
                    variant="filled"
                    margin="normal"
                    placeholder="Color Name"
                    className={classes.colorNameInput}
                    onChange={handleChange}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={["this field is required", "Color name must be unique", "Color must be unique"]}
                  />
                    <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: paletteIsFull
                        ? "grey"
                        : currentColor
                    }}
                    type="submit"
                    disabled={paletteIsFull}
                    className={classes.addColor}
                    >{paletteIsFull ? "Palette Full" : "Add Color"}</Button>
              </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPickerForm);