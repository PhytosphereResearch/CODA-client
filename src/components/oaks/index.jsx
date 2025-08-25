import { useState } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import { Outlet } from "react-router";

// type Option = {
// label: string;
// value: number;
// };

// interface Props {
//   options: Option[];
//   oaks: {[key: string]: any}[]
// }

const Oaks = (props) => {
  const [selected, setSelected] = useState();
  const navigate = useNavigate();

  const onOakSelected = (option) => {
    setSelected(option);
    option.value ? navigate(`/oaks/${option.value}`) : navigate("/oaks");
  };
  const { options } = props;
  return (
    <div>
      <h2>Find an oak</h2>
      <Select
        options={options}
        onChange={onOakSelected}
        value={selected}
        placeholder="Type to search by species or common name"
        style={{ marginBottom: "15px" }}
      />
      <Outlet />
    </div>
  );
};

export default Oaks;
