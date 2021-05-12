import axios from 'axios'
import { useEffect, useState } from 'react'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddBoxIcon from '@material-ui/icons/AddBox'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableRow: {
    '& button': {
      visibility: 'hidden'
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      '& button': {
        visibility: 'visible'
      }
    }
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function KarangosList() {
  const classes = useStyles();
  const history = useHistory();

  // É importante inicializar esta variável de estado como um vetor vazio
  const [karangos, setKarangos] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get('https://api.faustocintra.com.br/karangos?by=marca,modelo')
        setKarangos(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, []) // Quando a dependência de um useEffect é um vetor vazio, isso indica
  // que ele será executado apenas uma vez, na inicialização do componente

  return (
    <>
      <Toolbar>
        <Button color="secondary" variant="contained" size="large" startIcon={<AddBoxIcon />} onClick={() => history.push('/new')}>Novo Karango</Button>
      </Toolbar>
      <h1>Listagem de Karangos</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Cód.</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Cor</TableCell>
              <TableCell align="right">Ano</TableCell>
              <TableCell align="right">Importado?</TableCell>
              <TableCell align="right">Placa</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              karangos.map(karango =>
                <TableRow key={karango.id} className={classes.tableRow}>
                  <TableCell align="right">{karango.id}</TableCell>
                  <TableCell>{karango.marca}</TableCell>
                  <TableCell>{karango.modelo}</TableCell>
                  <TableCell>{karango.cor}</TableCell>
                  <TableCell align="right">{karango.ano_fabricacao}</TableCell>
                  <TableCell align="right">
                    <Checkbox checked={karango.importado == '1'} readOnly />
                  </TableCell>
                  <TableCell align="right">{karango.placa}</TableCell>
                  <TableCell align="right">{Number(karango.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit">
                      <EditIcon color="yellow" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete">
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}