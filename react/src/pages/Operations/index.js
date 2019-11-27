import React, { useState } from 'react';
import {
  Container,
  Form,
  Input,
  Label,
  Button,
  OperationsSet,
  Result,
  ResultLine,
} from './styles';
import { toast } from 'react-toastify';
import apiService from '../../services/api';
import { Flex } from '../../components/Flex';

const api = apiService('http://localhost:5000');

export default function Operations() {
  const userSetsDefault = localStorage.getItem('userSets')
    ? JSON.parse(localStorage.getItem('userSets'))
    : [];

  const universalSetDefault = localStorage.getItem('universalSet')
    ? JSON.parse(localStorage.getItem('universalSet'))
    : [];

  const [amountOfSets, setAmountOfSets] = useState(4);
  const [currentSet, setCurrentSet] = useState('{ 1, 2, (1, 2), (1, 2, (1)) }');
  const [userSets, setUserSets] = useState(userSetsDefault);
  const [sets, setSets] = useState(userSetsDefault);
  const [universalSet, setUniversalSet] = useState(universalSetDefault);

  const defineAmountOfSets = ({ target }) => {
    const number = Math.floor(Number(target.value));

    if (isNaN(number)) {
      toast.error('Você deve informar um número.');
      setAmountOfSets('');
      return;
    } else if (number > 4) {
      toast.error('O número máximo de conjuntos aceito é 4.');
      setAmountOfSets('');
      return;
    }

    setAmountOfSets(number || '');
  };

  const updateUniversalSet = async sets => {
    let concatenatedSets = '';
    for (const [index, set] of sets.entries()) {
      concatenatedSets += set.string;
      if (index < sets.length - 1) {
        concatenatedSets += ',';
      }
    }

    concatenatedSets = concatenatedSets
      .split('')
      .map((char, index) => {
        if (index > 0 && index < concatenatedSets.length - 1) {
          if (char == '{' || char == '}') {
            return;
          }
          return char;
        }
      })
      .join('');

    const response = await api.post('/format_set', {
      set: `{${concatenatedSets}}`,
    });

    if (response.status !== 200) {
      toast.error('Ocorreu um erro inesperado');
      return;
    }

    setUniversalSet(formatSetObject(response.data));
    localStorage.setItem(
      'universalSet',
      JSON.stringify(formatSetObject(response.data))
    );
  };

  const formatSetObject = data =>
    Object.hasOwnProperty.bind(data, 'alias').call()
      ? {
          alias: data.alias,
          string: data.result,
          value: data.result_as_list,
          cardinality: data.result_cardinality,
        }
      : {
          string: data.result,
          value: data.result_as_list,
          cardinality: data.result_cardinality,
        };

  const addSet = async set => {
    if (amountOfSets < 1) {
      toast.error('Por favor, informe o número de conjuntos.');
      return;
    }

    const isValidSet =
      currentSet[0] === '{' && currentSet[currentSet.length - 1] === '}';
    if (isValidSet) {
      const response = await api.post('/format_set', {
        set,
      });

      if (response.status !== 200) {
        toast.error('Ocorreu um erro inesperado');
        return;
      }

      const setObject = formatSetObject(response.data);

      setUserSets([...userSets, setObject]);
      setSets([...userSets, setObject]);
      updateUniversalSet([...userSets, setObject]);
      localStorage.setItem(
        'userSets',
        JSON.stringify([...userSets, setObject])
      );
    }
  };

  const handleAddSet = async event => {
    event.preventDefault();

    if (userSets.length < amountOfSets) {
      addSet(currentSet);
    } else {
      toast.error('O número máximo de conjuntos já foi informado');
    }
  };

  const handleOperationAdd = async (type, ...targets) => {
    let alias, setDefinition;

    if (targets.length === 2) {
      alias = `${targets[0]} ${type} ${targets[1]}`;
      setDefinition = `${
        userSets[targets[0].charCodeAt(0) - 65].value
      } ${type} ${userSets[targets[1].charCodeAt(0) - 65].value}`;
    } else if (type === "'") {
      alias = `${targets[0]}'`;
      setDefinition = `${universalSet.value} - ${
        userSets[targets[0].charCodeAt(0) - 65].value
      }`;
    } else {
      alias = `P(${targets[0]})`;
      setDefinition = `P(${userSets[targets[0].charCodeAt(0) - 65].value})`;
    }

    console.log({
      alias,
      setDefinition,
    });

    const response = await api.post('/calculate', {
      set: setDefinition,
    });

    if (response.status !== 200) {
      toast.error('Ocorreu um erro inesperado');
      return;
    }

    setSets([...sets, formatSetObject({ alias, ...response.data })]);
    console.log([...sets, formatSetObject(response.data)]);
  };

  // "{1,2,3,4,5,{1,2},{1,3}, a}"

  return (
    <Container>
      <Form>
        <div>
          <Label>Nº de Conjuntos</Label>
          <Input value={amountOfSets} onChange={e => defineAmountOfSets(e)} />
        </div>
        <div>
          <Label>Conjunto</Label>
          <Input
            placeholder="Exemplo: { 1, 2, (1, 2), (1, 2, (1)) }"
            value={currentSet}
            onChange={e => setCurrentSet(e.target.value)}
          />
        </div>
        <Button margin="auto 0 0" onClick={e => handleAddSet(e)}>
          Adicionar
        </Button>
      </Form>
      <OperationsSet>
        <Button
          borderradius="2px"
          onClick={e => handleOperationAdd('U', 'A', 'C')}
        >
          União
        </Button>
        <Button
          borderradius="2px"
          onClick={e => handleOperationAdd('∩', 'A', 'C')}
        >
          Interseção
        </Button>
        <Button borderradius="2px" onClick={e => handleOperationAdd("'", 'A')}>
          Complementar
        </Button>
        <Button
          borderradius="2px"
          onClick={e => handleOperationAdd('-', 'A', 'C')}
        >
          Diferença
        </Button>
        <Button borderradius="2px" onClick={e => handleOperationAdd('P', 'A')}>
          Conjunto das Partes
        </Button>
      </OperationsSet>
      <Result>
        {universalSet && universalSet.string && (
          <ResultLine>
            <p>U = {universalSet.string}</p>
            <p>| U | = {universalSet.cardinality} </p>
          </ResultLine>
        )}
        {sets.map((set, i) => (
          <ResultLine justifycontent="space-between">
            <p key={i}>
              {String.fromCharCode(65 + i)} ={' '}
              {Object.hasOwnProperty.bind(set, 'alias').call()
                ? set.alias + ' ='
                : ''}{' '}
              {set.string}
            </p>
            <p>
              | {String.fromCharCode(65 + i)} | = {set.cardinality}{' '}
            </p>
          </ResultLine>
        ))}
      </Result>
    </Container>
  );
}
