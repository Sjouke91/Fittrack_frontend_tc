import React from "react";
import Switch from "@material-ui/core/Switch";

type Props = {
  graphType: boolean;
  setGraph: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Switches(props: Props) {
  const { setGraph, graphType } = props;
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraph(!graphType);
    setState({ ...state, [event.target.value]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={state.checkedB}
        onChange={(e) => handleChange(e)}
        color="primary"
        value="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
