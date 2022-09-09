import { NavigationItem, NavigationGroup } from "@/types/Links";

export const Data: (NavigationItem | NavigationGroup)[] = [
  {
    text: "About me",
    children: [
      { text: "Website", link: "https://ricardobalk.nl" },
      { text: "Blog", link: "https://ricardobalk.nl/blog" }
    ],
  },
  {
    text: "My work",
    children: [
      { text: "GitHub", link: "https://github.com/RicardoBalk" },
      { text: "LinkedIn", link: "https://www.linkedin.com/in/ricardobalk/" }
    ],
  },
  {
    text: "Recent projects",
    children: [
      { text: "Proton Website", link: "https://github.com/ricardobalk/proton-website" },
      { text: "OpenVault", link: "https://github.com/ricardobalk/openvault" },
      { text: "... and others", link: 'https://github.com/RicardoBalk' }
    ]
  }
];

export default Data;
