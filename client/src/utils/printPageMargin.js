export const getPageMargins = () => {
  const marginTop = '80px';
  const marginRight = '20px';
  const marginBottom = '80px';
  const marginLeft = '20px';

  return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
};
