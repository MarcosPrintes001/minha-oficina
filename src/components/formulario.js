import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TabelaVeiculos from "./tabelaVeiculos"; // Importe o componente TabelaVeiculos aqui



const FormularioCadastroVeiculo = () => {

    const [placa, setPlaca] = useState("");
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [statusConcerto, setStatusConcerto] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        // Crie um objeto com os dados do novo veículo a partir do estado local
        const novoVeiculoData = {
            placa,
            modelo,
            nomeDono: marca,
            statusConcerto,
        };

        console.log(novoVeiculoData)
        //Mandar dados pra api

        // Limpa estado local do formulário
        setPlaca("");
        setModelo("");
        setMarca("");
        setStatusConcerto("");
    };


    return (
        <form onSubmit={handleSubmit} defaultChecked='false'>
            <TextField
                label="Placa"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)} // Atualize o estado local com o valor inserido
                fullWidth
                margin="normal"
            />

            <TextField
                label="Modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Status do Concerto"
                value={statusConcerto}
                onChange={(e) => setStatusConcerto(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                Cadastrar
            </Button>

        </form>
    );
};

export default FormularioCadastroVeiculo;
