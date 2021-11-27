import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { Picker } from 'emoji-mart';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "emoji-mart/css/emoji-mart.css"

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "form",
            newPaletteName: ""
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNewPaletteName = this.handleNewPaletteName.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    };

    handleClose() {
        this.setState({
            open: false
        });
    };

    handleNewPaletteName(evt) {
        this.setState({
            newPaletteName: evt.target.value
        });
    }

    showEmojiPicker() {
        this.setState({
            stage: "emoji"
        })
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette);
        this.setState({
            stage: ""
        })
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
    this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    render() {
        const { newPaletteName, stage } = this.state;
        const { closeForm } = this.props;
        return (
            <div>
                <Dialog open={stage === "emoji"} onClose={closeForm}>
                    <DialogTitle>Choose a Palette Emoji</DialogTitle>
                    <Picker onSelect={this.savePalette} title="Pick an Emoji"/>
                </Dialog>
                <Dialog open={stage === "form"} onClose={closeForm}>
                    <DialogTitle>Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new beautiful palette. Make sure it's unique!
                        </DialogContentText>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            fullWidth
                            margin="normal"
                            onChange={this.handleNewPaletteName}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter a name", "Name must be unique"]}
                        />
                      </DialogContent>
                    <DialogActions>
                    <Button onClick={closeForm}>Cancel</Button>
                    <Button
                          variant="contained"
                          color="primary"
                          type="Submit"
                          >Save Palette</Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
            
         );
    }
}
 
export default PaletteMetaForm;