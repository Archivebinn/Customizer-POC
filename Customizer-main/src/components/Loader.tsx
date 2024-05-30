import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;