import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

import type { LabelledLink } from "@/types/Links";

export type SocialLink = LabelledLink & {
  icon: [IconPrefix, IconName];
};

export type SocialLinks = SocialLink[];

export const Data : SocialLinks = [
  {
    text: "GitHub",
    link: "https://github.com/RicardoBalk",
    target: "_blank",
    rel: "noopener",
    icon: ["fab", "github"],
  },
  {
    text: "Twitter",
    link: "https://twitter.com/RicardoBalk",
    target: "_blank",
    rel: "noopener",
    icon: ["fab", "twitter"],
  },
  {
    text: "Dev.to",
    link: "https://dev.to/@RicardoBalk",
    target: "_blank",
    rel: "noopener",
    icon: ["fab", "dev"],
  },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/ricardobalk/",
    target: "_blank",
    rel: "noopener",
    icon: ["fab", "linkedin"],
  },
  {
    text: "Telephone",
    link: "tel:+31243010005",
    rel: "",
    icon: ["fas", "phone"],
  },
  {
    text: "Email",
    link: "/contact",
    icon: ["fas", "envelope"],
  },
];

export default Data;