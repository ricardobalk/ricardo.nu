export interface HomepageData extends Record<string, string> {
  title: string;
  subtitle?: string;
  description?: string;
  avatar: string;
}

export default HomepageData;