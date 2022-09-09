import { LabelledLink } from '@/types/Links';

export interface CopyleftNoticeData extends Record<string, LabelledLink> {
  social: LabelledLink;
  repository: LabelledLink;
}

export const ExampleData: CopyleftNoticeData = {
  social: {
    text: "Social",
    link: "https://www.linkedin.com/in/ricardobalk/"
  },
  repository: {
    text: "GitHub",
    link: "https://github.com/RicardoBalk/ricardo.nu"
  },
};

export default CopyleftNoticeData;