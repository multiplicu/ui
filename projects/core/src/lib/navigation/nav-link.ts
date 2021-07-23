export interface NavLink {
  title: string;
  fragment?: string;
  href?: string;
  links?: NavLink[];
  onClick?: any;
  dividerPosition?: 'ABOVE' | 'BELOW' | 'NONE';
  icon?: string;
  external?: boolean;
  isActive?: boolean;
}
