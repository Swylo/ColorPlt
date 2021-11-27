import React from 'react'
import { withStyles } from '@mui/styles';
import styles from "./styles/PaletteFooterStyles"

function PaletteFooter(props) {
    const { paletteName, emoji, classes } = props;
    return (
        <div>
            <footer className={classes.PaletteFooterStyle}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </footer>
        </div>
    )
}
 
export default withStyles(styles)(PaletteFooter);