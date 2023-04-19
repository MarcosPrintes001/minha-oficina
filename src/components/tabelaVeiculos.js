import React, { useState, useEffect } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TabelaVeiculos = () => {
  const [veiculosAtualizados, setVeiculosAtualizados] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [veiculoEdit, setVeiculoEdit] = useState({
    id: "",
    placa: "",
    marca: "",
    modelo: "",
    statusConcerto: "",
  });

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        // Fazer chamada à API para buscar os veículos
        const response = await axios.get(
          "https://643824aaf3a0c40814abe5cf.mockapi.io/veiculos"
        );
        const veiculos = response.data;

        // Atualizar o estado dos veículos com os dados da API
        setVeiculos(veiculos);
        setVeiculosAtualizados(veiculos); // Atualizar também o estado de veículos atualizados

        console.log("Veículos buscados:", veiculos);
      } catch (error) {
        console.error("Erro ao buscar os veículos:", error);
      }
    };

    fetchVeiculos();
  }, []);

  const handleEditarVeiculo = (veiculo) => {
    setVeiculoEdit(veiculo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSalvarEdicao = async () => {
    try {
      // Fazer chamada à API para salvar as alterações
      await axios.put(
        `https://643824aaf3a0c40814abe5cf.mockapi.io/veiculos/${veiculoEdit.id}`,
        veiculoEdit
      );
      console.log("Salvou edição do veículo:", veiculoEdit);

      // Atualizar o estado dos veículos com os dados atualizados
      const veiculosAtualizados = veiculos.map((veiculo) =>
        veiculo.id === veiculoEdit.id ? veiculoEdit : veiculo
      );
      setVeiculos(veiculosAtualizados);
      setVeiculosAtualizados(veiculosAtualizados);

      handleCloseDialog();
    } catch (error) {
      console.error("Erro ao salvar as alterações do veículo:", error);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setVeiculoEdit({ ...veiculoEdit, [name]: value });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table style={{ overflow: 'auto', maxHeight: '400px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Placa</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {veiculosAtualizados.map((veiculo) => (
              <TableRow key={veiculo.id}>
                <TableCell>{veiculo.placa}</TableCell>
                <TableCell>{veiculo.marca}</TableCell>
                <TableCell>{veiculo.modelo}</TableCell>
                <TableCell>{veiculo.statusConcerto}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditarVeiculo(veiculo)}
                  >
                    Alterar Dados
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Editar Dados do Veículo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Placa"
            fullWidth
            name="placa"
            value={veiculoEdit.placa}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Marca"
            fullWidth
            name="marca"
            value={veiculoEdit.marca}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Modelo"
            fullWidth
            name="modelo"
            value={veiculoEdit.modelo}
            onChange={handleChange}
          />

          <FormControl>
            <InputLabel>Status Concerto</InputLabel>
            <Select
              value={veiculoEdit.statusConcerto}
              label="status Concerto"
              name="statusConcerto"

              onChange={handleChange}
            >
              <MenuItem value="Veículo recebido">Veículo recebido</MenuItem>
              <MenuItem value=" Serviço Iniciado"> Serviço Iniciado</MenuItem>
              <MenuItem value="Aguardando Peça">Aguardando Peça</MenuItem>
              <MenuItem value="Serviço Finalizado">Serviço Finalizado</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSalvarEdicao} color="primary">
            Salvar
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TabelaVeiculos;
