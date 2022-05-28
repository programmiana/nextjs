import { FC } from "react";

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
    case "UndrawDesigner":
      return (
        <UndrawDesigner
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          hairColor={accentColor}
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
    case "UndrawCloudHosting":
      return (
        <UndrawCloudHosting
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
          secondaryColor={secondaryColor}
          hairColor={accentColor}
        />
      );
  }
  if (!option) return <p> not available.</p>;
  return null;
};

export default UndrawSvgs;
