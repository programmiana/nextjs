import Head from "next/head";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import ObjectCanvas from "./components/three-object";
import styles from "../styles/Home.module.css";
import SecondaryButton from "./components/secondary-button";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { AddBusinessTwoTone } from "@mui/icons-material";

type WelcomePromptProps = {
  name?: string;
  address?: String;
};
const CreateCollection: FC<WelcomePromptProps> = ({
  name = "stranger",
  address,
}) => {
  const [collectionData, setCollectionName] = useState<{
    name: string;
    done: boolean;
  }>({ name: "", done: false });
  // const [collectionName, setCollectionName] = useState<string>("");

  const [inputFields, setInputFields] = useState<{
    inputNames: string[];
  }>({ inputNames: [] });

  const [formValues, setFormValues] = useState([{ name: "" }]);

  interface NamedPoint extends Event {
    name: string;
  }

  let handleChange = (i: number, e: Event) => {
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

  let handleSubmit = (event: Event) => {
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

        {collectionData.done && (
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
                  onChange={(i, e: Event) => handleChange(index, e)}
                  formValues={formValues}
                />
              ))}
            </Stack>
          </Stack>
        )}
      </FormControl>
    </Box>
  );
};

export default CreateCollection;

type AddInputFieldProps = {
  onChange: (i: number, e: Event) => void;
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
          if(formValues[index].name === "") return;
            addFormFields();
            onChange;
        }}
      >
        <Add />
      </IconButton>
    </Stack>
  );
};
