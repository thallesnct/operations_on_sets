import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignitems || 'unset'};
  justify-content: ${props => props.justifycontent || 'unset'};
  margin: ${props => props.margin || 'unset'};
`;
