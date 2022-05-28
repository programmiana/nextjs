import Add from "@mui/icons-material/Add";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ButtonExample from "../pages/components/pick-color";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  UndrawDesigner,
  UndrawResponsive,
  UndrawAgreement,
  UndrawAppreciation,
  UndrawAstronaut,
  UndrawCloudHosting,
  UndrawGraduation,
  UndrawMindfulness,
} from "react-undraw-illustrations";
import SecondaryButton from "./components/secondary-button";
import UndrawSvgs from "./components/undrawSvgs";

const undrawSvgsOptions = [
  "Undraw Designer",
  "Undraw Responsive",
  "Undraw Agreement",
  "Undraw Appreciation",
  "Undraw Astronaut",
  "Undraw CloudHosting",
  "Undraw Graduation",
  "Undraw Mindfulness",
];
// type WelcomePromptProps = {
//   name?: string;
//   address?: String;
// };
const CreateCollection: FC = ({
  
}) => {
  const [collectionData, setCollectionName] = useState<{
    name: string;
    done: boolean;
  }>({ name: "", done: false });

  const [inputFields, setInputFields] = useState<{
    inputNames: string[];
    done: boolean;
  }>({ inputNames: [], done: false });

  const [formValues, setFormValues] = useState([{ name: "" }]);

  const [badgeType, setBadgeType] = useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setBadgeType(event.target.value);
  };

  let handleChange = (
    i: number,
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newFormValues = [...formValues];

    if (e.target) {
      newFormValues[i]["name"] = (e.target as HTMLInputElement).value;
      setFormValues(newFormValues);
    }
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  let removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <Box alignItems={"center"}>
      <FormControl>
        {!collectionData.done && (
          <Stack gap={2}>
            <Typography variant="h5" noWrap>
              What is the name of your collection?
            </Typography>
            <TextField
              id="collection-name"
              variant="standard"
              onChange={(e) =>
                setCollectionName({ name: e.currentTarget.value, done: false })
              }
            />
            <SecondaryButton
              label={"next"}
              type="submit"
              onClick={() => {
                if (collectionData.name !== "") {
                  setCollectionName({ ...collectionData, done: true });
                }
              }}
            />
          </Stack>
        )}

        {collectionData.done && !inputFields.done && (
          <Stack gap={3}>
            <Typography variant="h4" noWrap>
              Cool! {collectionData.name} collection. What is it about?
            </Typography>

            <Stack gap={3}>
              {formValues.map((element, index) => (
                <AddInputField
                  addFormFields={addFormFields}
                  key={index}
                  name={element.name}
                  index={index}
                  onChange={(
                    i,
                    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => handleChange(index, e)}
                  formValues={formValues}
                />
              ))}
            </Stack>

            <SecondaryButton
              label={"done and next"}
              type="submit"
              onClick={() => {
                setInputFields({
                  inputNames: Array.from(Object.values(formValues)).map(
                    (el) => el.name
                  ),
                  done: true,
                });
              }}
            />
          </Stack>
        )}

        {inputFields.done && (
          <Stack gap={2}>
            <Typography variant="h4" noWrap>
              Select your badge style:
            </Typography>
            <>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={badgeType}
                onChange={handleSelectChange}
                label="Badge Type"
              >
                {undrawSvgsOptions.map((el, index) => (
                  <MenuItem key={index} value={el.replace(/\s/g, "")}>
                    {el}
                  </MenuItem>
                ))}
              </Select>

              <UndrawSvgs option={badgeType} />

              <Stack gap={5}>
                <TextField
                  label={"badge title"}
                  variant="standard"
                  onChange={() => {}}
                />
                {inputFields.inputNames.map((el, index) => (
                  <TextField
                    label={el}
                    variant="standard"
                    key={index}
                    onChange={() => {}}
                  />
                ))}
              </Stack>
            </>
          </Stack>
        )}
      </FormControl>
    </Box>
  );
};

export default CreateCollection;

type AddInputFieldProps = {
  onChange: (
    i: number,
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  name: string;
  addFormFields: () => void;
  index: number;
  formValues: { name: string }[];
};

const AddInputField: FC<AddInputFieldProps> = ({
  name,
  onChange,
  addFormFields,
  index,
  formValues,
}) => {
  return (
    <Stack justifyContent="space-around" direction={"row"}>
      <TextField
        id={name}
        name={"name"}
        variant="standard"
        onChange={(e) => onChange(index, e)}
      />
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="small"
        onClick={() => {
          if (formValues[index].name === "") return;
          addFormFields();
          onChange;
        }}
      >
        <Add />
      </IconButton>
    </Stack>
  );
};
