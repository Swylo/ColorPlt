import React, { PureComponent } from 'react';
import { withStyles } from '@mui/styles';
import styles from "./styles/MiniPaletteStyles"
import DeleteIcon from '@mui/icons-material/Delete';

class MiniPalette extends PureComponent {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(evt) {
        evt.stopPropagation();
        this.props.openDialog(this.props.id)
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
        const minColorBoxes = colors.map(color => (
            <div
                className={classes.miniColor}
                style={{ backgroundColor: color.color }}
                key={color.name}
            ></div>
        ));

        return (
            <div className={classes.root} onClick={() => handleClick(id)}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: "all 0.3s ease-in-out" }}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {minColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        );  
    }
    
}

export default withStyles(styles)(MiniPalette);