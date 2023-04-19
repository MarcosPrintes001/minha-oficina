import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormularioCadastroVeiculo = () => {
    const [veiculo, setVeiculo] = useState({
        placa: "",
        marca: "",
        modelo: "",
        nome: "",
        whats: "",
        statusConcerto: "",

    });

    const handleChange = event => {
        const { name, value } = event.target;
        setVeiculo({ ...veiculo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Faz a requisição POST para a API mockada usando o Axios
        axios
            .post("https://643824aaf3a0c40814abe5cf.mockapi.io/veiculos", veiculo)
            .then((response) => {
                
                // Limpa estado local do formulário
                setVeiculo({
                    placa: "",
                    marca: "",
                    modelo: "",
                    nome: "",
                    whats: "",
                    statusConcerto: "",
                });
            })
            .catch((error) => {
                // Lógica para tratar erros na requisição à API
                console.error("Erro ao cadastrar veículo:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} defaultChecked="false">
            <TextField
                label="Placa"
                name="placa"
                value={veiculo.placa}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Marca"
                name="marca"
                value={veiculo.marca}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Modelo"
                name="modelo"
                value={veiculo.modelo}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Nome do Veiculo"
                name="nome"
                value={veiculo.nome}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="WhatsApp Proprietario"
                name="whats"
                value={veiculo.whats}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth>
                <InputLabel>Status Concerto</InputLabel>
                <Select
                    label="Status Concerto"
                    name="statusConcerto"
                    value={veiculo.statusConcerto}
                    onChange={handleChange}
                >
                    <MenuItem value="Veículo recebido">Veículo recebido</MenuItem>
                    <MenuItem value="Serviço Iniciado"> Serviço Iniciado</MenuItem>
                    <MenuItem value="Aguardando Peça">Aguardando Peça</MenuItem>
                    <MenuItem value="Serviço Finalizado">Serviço Finalizado</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Cadastrar
            </Button>
        </form>
    );
};

export default FormularioCadastroVeiculo;
