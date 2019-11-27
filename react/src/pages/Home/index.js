import React, { Component } from 'react';
import Api from '../../services/api';
import { toast } from 'react-toastify';
import { Container, Headline, Button } from './styles';
import { Scatter } from 'react-chartjs-2';
import { Flex } from '../../components/Flex';

export default function Home() {
  return (
    <Container>
      <div>
        <Headline>Teoria dos Conjuntos</Headline>

        <Flex
          direction="column"
          alignitems="center"
          justifycontent="space-between"
        >
          <Button to="/operacoes" width="35%" marginbottom="12px">
            Operações
          </Button>
          <Button to="/cartesiano" width="35%">
            Plano Cartesiano
          </Button>
        </Flex>
      </div>
    </Container>
  );
}
