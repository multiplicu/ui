export interface NavLink {
  title: string;
  fragment?: string;
  href?: string;
  links?: NavLink[];
  dividerPosition?: 'ABOVE' | 'BELOW' | 'NONE';
}
