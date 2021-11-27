import sizes from "./sizes";
import chroma from 'chroma-js';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-7px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.35)",
            transition: "all 0.3s ease-in-out"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
        }
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        color: props =>
            chroma(props.color).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: 'flex',
        justifyContent: "space-between"
    },
    deleteIcon: {
        transform: "scale(1)",
        color: "rgba(0,0,0,0.5)",
        transition: "all 0.3s ease-in-out"
    }
}

export default styles;