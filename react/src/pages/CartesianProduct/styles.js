import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  background-color: #f2f4f6;
  min-height: 100%;
  padding: 36px 10vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr;
  grid-gap: 16px;

  @media screen and (max-width: 1024px) {
    padding: 36px 7.5vw;
  }
`;

export const Form = styled.form`
  grid-column: 1/2 span;
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 140px 1fr auto;
  grid-column-gap: 16px;
  padding: 2rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }

  div {
    display: inline-flex;
    flex-direction: column;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  color: #6b48ff;
  display: block;
  margin-bottom: ${props => props.marginbottom || ''};
`;

export const Input = styled.input`
  border: 1px solid #f2f4f6;
  color: #212121;
  border-radius: 2px;
  font-size: 16px;
  padding: 0.4rem 0.8rem;
  text-align: center;
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || 'unset'};
  font-size: ${props => props.fontsize || 'inherit'};
`;

export const Button = styled.button`
  background-color: ${props => props.backgroundcolor || '#6b48ff'};
  border: 1px solid ${props => props.bordercolor || '#6b48ff'};
  color: ${props => props.color || '#f2f4f6'};
  border: none;
  border-radius: ${props => props.borderradius || '1000vw'};
  padding: 0.4rem 2.4rem;
  height: min-content;
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || 'unset'};
  font-size: ${props => props.fontsize || 'inherit'};
`;

export const OperationsSet = styled.div`
  height: fit-content;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  button {
    font-size: 14px;

    :not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const Result = styled.div`
  height: fit-content;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const ResultLine = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 16px;
  margin-bottom: 8px;
`;
