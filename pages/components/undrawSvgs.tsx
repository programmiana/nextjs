import { getgid } from "process";
import { FC } from "react";
import ReactDOMServer from 'react-dom/server'
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

type UndrawSvgsProps = {
  option: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
};


const UndrawSvgs: FC<UndrawSvgsProps> = ({
  option,
  primaryColor,
  secondaryColor,
  accentColor,
}) => {

  switch (option) {
    case "UndrawCloudHosting":
      return (
        <UndrawCloudHosting
          primaryColor={primaryColor}
          accentColor={secondaryColor}
        />
      );
    case "UndrawDesigner":
      return (
        <UndrawDesigner
          primaryColor={primaryColor}
          hairColor={secondaryColor}
        />
      );
    case "UndrawResponsive":
      return (
        <UndrawResponsive
          accentColor={accentColor}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "UndrawAgreement":
      return (
        <UndrawAgreement
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "UndrawAppreciation":
      return (
        <UndrawAppreciation
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "UndrawAstronaut":
      return (
        <UndrawAstronaut
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );

    case "UndrawGraduation":
      return (
        <UndrawGraduation
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case "UndrawMindfulness":
      return (
        <UndrawMindfulness
          primaryColor={primaryColor}
          hairColor={secondaryColor}
        />
      );
  }
  return null;
};

export default UndrawSvgs;
