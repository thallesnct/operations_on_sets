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
  const [firstSet, setFirstSet] = useState('');
  const [secondSet, setSecondSet] = useState('');
  const [type, setType] = useState('');
  const [shouldAskInput, setShouldAskInput] = useState(false);

  const [amountOfSets, setAmountOfSets] = useState(4);
  const [currentSet, setCurrentSet] = useState('{ 1, 2, (1, 2), (1, 2, (1)) }');
  const [userSets, setUserSets] = useState([]);
  const [sets, setSets] = useState([]);

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

  const handleOperationAdd = async e => {
    e.preventDefault();

    let alias, setDefinition;

    const has2Sets = !"P'".includes(type);

    if (has2Sets) {
      alias = `${firstSet} ${type} ${secondSet}`;
      setDefinition = `${userSets[firstSet.charCodeAt(0) - 65].value} ${type} ${
        userSets[secondSet.charCodeAt(0) - 65].value
      }`;
    }

    const response = await api.post('/calculate', {
      set: setDefinition,
    });

    if (response.status !== 200) {
      toast.error('Ocorreu um erro inesperado');
      return;
    }

    setSets([...sets, formatSetObject({ alias, ...response.data })]);
  };

  const lockSet = (position, value) => {
    if (value.length > 1) {
      toast.error('Valor inválido');
      if (position === 'f') {
        setFirstSet('');
      } else {
        setSecondSet('');
      }

      return;
    }

    if (position === 'f') {
      setFirstSet(String.prototype.toUpperCase.apply(value));
    } else {
      setSecondSet(String.prototype.toUpperCase.apply(value));
    }
  };

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
          onClick={e => {
            setType('X');
            setShouldAskInput(true);
          }}
        >
          X
        </Button>
        <Button
          borderradius="2px"
          onClick={e => {
            setType('U');
            setShouldAskInput(true);
          }}
        >
          União
        </Button>
        <Button
          borderradius="2px"
          onClick={e => {
            setType('∩');
            setShouldAskInput(true);
          }}
        >
          Interseção
        </Button>
        {/* Não entendi muito bem como fazer relações */}
        {/* <Button
          borderradius="2px"
          onClick={e => {
            setType('-');
            setShouldAskInput(true);
          }}
        >
          Relações
        </Button> */}

        {shouldAskInput && (
          <form>
            <Input
              margin="0 0 1rem"
              onChange={el => lockSet('f', el.target.value)}
              value={firstSet}
            />
            {!"P'".includes(type) && (
              <Input
                margin="0 0 1rem"
                onChange={el => lockSet('s', el.target.value)}
                value={secondSet}
              />
            )}
            <Button
              backgroundcolor={'#e91e63'}
              onClick={e => handleOperationAdd(e)}
            >
              Calcular
            </Button>
          </form>
        )}
      </OperationsSet>
      <Result>
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
