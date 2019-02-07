import { compose } from 'recompose';
import withSizes from 'react-sizes';

import { THEME_PREFIX } from 'src/constants';

interface Sizes {
  width: number;
}

const computedStyle = getComputedStyle(document.body);

const getVar = (name: string, fallback: number): number =>
  parseInt(
    computedStyle.getPropertyValue(`--${THEME_PREFIX}-breakpoint--${name}`),
    10,
  ) || fallback;

const isMobile = ({ width }: Sizes) =>
  width <= getVar('small--max-width', 767) &&
  width >= getVar('small--min-width', 320);

const isTablet = ({ width }: Sizes) =>
  width <= getVar('medium--max-width', 1279) &&
  width >= getVar('medium--min-width', 768);

const isDesktop = ({ width }: Sizes) =>
  width >= getVar('large--min-width', 1280);

const mapSizesToProps = (sizes: Sizes) => ({
  isMobile: isMobile(sizes),
  isTablet: isTablet(sizes),
  isDesktop: isDesktop(sizes),
});

export default (WrappedComponent: any) =>
  compose(withSizes(mapSizesToProps))(WrappedComponent);
