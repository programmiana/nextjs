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

  const [formValues, setFormValues] = useState([{ name: "", email : ""}])

  const [inputFields, setInputFields] = useState<{
    inputNames: string[];
  }>({ inputNames: [] });

//   let handleChange = (i, e) => {
//     let newFormValues = [...formValues];
//     newFormValues[i][e.target.name] = e.target.value;
//     setFormValues(newFormValues);
//  }
    
// let addFormFields = () => {
//     setFormValues([...formValues, { name: "", email: "" }])
//  }

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
          <Stack gap={2}>
            <Typography variant="h4" noWrap>
              Cool! {collectionData.name} collection.
            </Typography>
            <Typography variant="h5" noWrap>
              What is it about?
            </Typography>

            <AddInput
              setInputFields={setInputFields}
              inputFields={inputFields}
            />
          </Stack>
        )}
      </FormControl>
    </Box>
  );
};

export default CreateCollection;

type AddInputProps = {
  setInputFields: Dispatch<
    SetStateAction<{
      inputNames: string[];
    }>
  >;
  inputFields: { inputNames: string[] };
};
const AddInput: FC<AddInputProps> = ({ setInputFields, inputFields }) => {
  return (
    <Stack justifyContent="space-around" direction={"row"}>
      <TextField
        id="collection-params"
        variant="standard"
        onChange={(e) =>
          setInputFields({
            inputNames: [...inputFields.inputNames, e.currentTarget.value],
          })
        }
      />

      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="small"
        onClick={() => {}}
      >
        <Add />
      </IconButton>
    </Stack>
  );
};
