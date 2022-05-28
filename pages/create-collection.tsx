import Add from "@mui/icons-material/Add";
import {
  Box,
  capitalize,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Contract } from "near-api-js/lib/contract";
import { ChangeEvent, FC, useContext, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Button from "./components/button";
import SecondaryButton from "./components/secondary-button";
import UndrawSvgs from "./components/undrawSvgs";
import { WalletContext } from "./components/wallet-context";
import {
  config,
  factoryContractMethods,
  createNTTCollection,
  FactoryContractWithMethods,
} from "./contracts";

const colors = [
  "deeppink",
  "purple",
  "yellowgreen",
  "red",
  "yellow",
  "aliceblue",
];
const undrawSvgsOptions = [
  {
    name: "designer",
    value: "Undraw Designer",
  },

  {
    name: "computer",
    value: "Undraw Responsive",
  },

  {
    name: "handshake",
    value: "Undraw Agreement",
  },
  {
    name: "appreciation",
    value: "Undraw Appreciation",
  },
  {
    name: "astronaut",
    value: "Undraw Astronaut",
  },
  {
    name: "cloud Pro",
    value: "Undraw CloudHosting",
  },
  {
    name: "graduation",
    value: "Undraw Graduation",
  },
  {
    name: "meditation",
    value: "Undraw Mindfulness",
  },
];
// type WelcomePromptProps = {
//   name?: string;
//   address?: String;
// };
const CreateCollection: FC = ({}) => {
  const { wallet } = useContext(WalletContext)!;
  const [collectionData, setCollectionName] = useState<{
    name: string;
    done: boolean;
  }>({ name: "", done: false });

  const [inputFields, setInputFields] = useState<{
    inputNames: string[];
    done: boolean;
  }>({ inputNames: [], done: false });

  const [formValues, setFormValues] = useState([{ name: "" }]);
  const [secondFormValues, setSecondFormFormValues] = useState<any>();

  const [badgeType, setBadgeType] = useState("UndrawCloudHosting");

  const [primaryColor, setPrimaryColor] = useState("deeppink");

  const [secondaryColor, setSecondaryColor] = useState("yellowgreen");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setBadgeType(event.target.value);
  };

  const handlePrimaryColorChange = (event: SelectChangeEvent) => {
    setPrimaryColor(event.target.value);
  };

  const handleSecondaryColorChange = (event: SelectChangeEvent) => {
    setSecondaryColor(event.target.value);
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

  console.log(secondFormValues);
  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  let removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = async (
    event?: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event?.preventDefault();
    alert(JSON.stringify(formValues));

    const userAccount = wallet!.account();
    const userUseFactoryContract = new Contract(
      userAccount,
      config.factoryContractAccount,
      factoryContractMethods
    ) as FactoryContractWithMethods;

    await createNTTCollection(
      userUseFactoryContract,
      wallet.getAccountId(),
      userAccount
    );

    console.log("Ba");
  };

  const htmlString = ReactDOMServer.renderToString(
    <UndrawSvgs
      option={badgeType.replace(/\s/g, "")}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );

  function camelize(str: string) {
    return str.replace(/\W+(.)/g, function(match, chr) {
      return chr.toUpperCase();
    });
  }

  function uncamelize(str: string) {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  return (
    <Box alignItems={"center"}>
      {!collectionData.done && (
        <Stack gap={2}>
          <Typography variant="h5" noWrap>
            Start by naming your token collection template:
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <TextField
              id="collection-name"
              label={"Collection Name"}
              onChange={(e) =>
                setCollectionName({ name: e.currentTarget.value, done: false })
              }
            />
          </FormControl>
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
            Cool! {collectionData.name}. Now name some properties you would like
            your template to have.
          </Typography>

          <Stack gap={3} justifyItems="start">
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
                inputNames: Array.from(Object.values(formValues)).map((el) =>
                  camelize(el.name)
                ),
                done: true,
              });
            }}
          />
        </Stack>
      )}

      {inputFields.done && (
        <Stack gap={5}>
          <Typography variant="h4" noWrap>
            Customise Your Template
          </Typography>

          <Stack gap={5}>
            <FormControl>
              <>
                <InputLabel id="badgeType">Badge Theme</InputLabel>
                <Select
                  labelId="badgeType"
                  id="badgeType"
                  value={badgeType}
                  onChange={handleSelectChange}
                  label="badge type"
                >
                  {undrawSvgsOptions.map((el, index) => (
                    <MenuItem key={index} value={`${el.value}`}>
                      {capitalize(el.name)}
                    </MenuItem>
                  ))}
                </Select>
              </>
            </FormControl>

            <FormControl>
              <InputLabel id="primaryColor">First Color</InputLabel>
              <Select
                labelId="primaryColor"
                id="primaryColor"
                value={primaryColor}
                onChange={handlePrimaryColorChange}
                label="primaryColor"
              >
                {colors.map((el, index) => (
                  <MenuItem key={index} value={el}>
                    {capitalize(el)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="secondaryColor">Second Color</InputLabel>
              <Select
                labelId="secondaryColor"
                id="secondaryColor"
                value={secondaryColor}
                onChange={handleSecondaryColorChange}
                label="secondaryColor"
              >
                {colors.map((el, index) => (
                  <MenuItem key={index} value={el}>
                    {capitalize(el)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <UndrawSvgs
              option={badgeType.replace(/\s/g, "")}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />

            <FormControl variant="standard">
              <TextField
                label={"Badge Title"}
                id="badgeTitle"
                variant="standard"
                onChange={(e) => {
                  setSecondFormFormValues({
                    ...secondFormValues,
                    svg: htmlString,
                    badgeTitle: e.currentTarget.value,
                  });
                }}
              />
            </FormControl>
            {inputFields.inputNames.map((el, index) => (
              <FormControl key={index} variant="standard">
                <TextField
                  variant="standard"
                  label={capitalize(uncamelize(el))}
                  onChange={(e) => {
                    setSecondFormFormValues({
                      ...secondFormValues,
                      svg: htmlString,
                      [`${el}`]: e.target.value,
                    });
                  }}
                />
              </FormControl>
            ))}
          </Stack>
          <Button
            label={"mint non-transferable token"}
            onClick={() => {
              // post all
              handleSubmit();
            }}
          />
        </Stack>
      )}
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
    <FormControl variant="standard" sx={{ m: 1 }}>
      {" "}
      <Stack justifyContent="center" direction={"row"} gap={5}>
        <TextField
          id={name}
          name={"name"}
          helperText={
            index === 0 &&
            "Name, birthday, years in the company, date of purchase..."
          }
          onChange={(e) => onChange(index, e)}
        />
        <IconButton
          color="primary"
          component="span"
          disabled={!formValues[index].name}
          style={{ alignSelf: "center" }}
          onClick={() => {
            if (formValues[index].name === "") return;
            addFormFields();
            onChange;
          }}
        >
          <Add fontSize="inherit" />
        </IconButton>
      </Stack>
    </FormControl>
  );
};
