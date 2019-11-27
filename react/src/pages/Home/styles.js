import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  margin: 0;
  background-color: #f2f4f6;
  min-height: 100%;
  padding: 36px 10vw;
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (max-width: 1024px) {
    padding: 36px 7.5vw;
  }
`;

export const Headline = styled.h1`
  color: #6b48ff;
  font-size: 32px;
  margin: 0 0 64px;
  text-align: center;
`;

export const Button = styled(Link)`
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  background-color: #6b48ff;
  border: 1px solid #6b48ff;
  color: #f2f4f6;
  border: none;
  border-radius: 1000vw;
  padding: 0.4rem 2.4rem;
  height: min-content;
  margin-top: auto;
  margin-bottom: ${props => props.marginbottom || 'unset'};
  width: ${props => props.width || 'unset'};
`;
