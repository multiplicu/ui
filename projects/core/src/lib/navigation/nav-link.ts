export interface NavLink {
  title: string;
  fragment?: string;
  links?: NavLink[];
  prefix?: string;
}
