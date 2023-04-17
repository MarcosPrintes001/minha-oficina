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

const TabelaVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [veiculoEdit, setVeiculoEdit] = useState({
    id: "",
    placa: "",
    marca: "",
    modelo: "",
    status: "",
  });

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await axios.get(
          "https://643824aaf3a0c40814abe5cf.mockapi.io/veiculos"
        );
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao obter os veículos:", error);
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

  const handleSalvarEdicao = () => {
    //Mandar para api salvar usando post
    console.log("Salvar edição do veículo:", veiculoEdit);
    
    handleCloseDialog();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVeiculoEdit({ ...veiculoEdit, [name]: value });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
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
            {veiculos.map((veiculo) => (
              <TableRow key={veiculo.id}>
                <TableCell>{veiculo.placa}</TableCell>
                <TableCell>{veiculo.marca}</TableCell>
                <TableCell>{veiculo.modelo}</TableCell>
                <TableCell>{veiculo.status}</TableCell>
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
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            name="status"
            value={veiculoEdit.status}
            onChange={handleChange}
          />
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
