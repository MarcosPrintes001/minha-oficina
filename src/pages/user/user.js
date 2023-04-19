import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Card, TextField } from '@mui/material';
import axios from 'axios';

const UserPage = () => {
    const [placa, setPlaca] = useState('');
    const [resultado, setResultado] = useState({
        placa: '',
        marca: '',
        modelo: '',
        statusConcerto: ''
    });
    
    const [erro, setErro] = useState(null);
    const [novoEstado, setNovoEstado] = useState(null)

    const handleSearch = () => {
        axios.get(`https://643824aaf3a0c40814abe5cf.mockapi.io/veiculos?placa=${placa}`)
            .then(response => {
                setPlaca('')
                setNovoEstado(response.data[0]);
                setErro(null);
            })
            .catch(error => {
                setResultado(null);
                setErro('Erro ao buscar informações. Verifique a placa informada.');
                setPlaca('')
            });
    };

    useEffect(() => {
        console.log(novoEstado)
        if (novoEstado) {
            setResultado({
                placa: novoEstado.placa,
                marca: novoEstado.marca,
                modelo: novoEstado.modelo,
                statusConcerto: novoEstado.statusConcerto
            })
        } else {
            setResultado({
                placa: '',
                marca: '',
                modelo: '',
                statusConcerto: ''
            })
        }
    }, [novoEstado])
    return (
        <Card>
            <Typography variant="h4" paddingLeft={2}>
                Gestão de Serviços de Oficina
            </Typography>
            <Typography variant="subtitle1" paddingLeft={2}>
                Consultar Status
            </Typography>
            <Card style={{ display: 'flex' }}>
                <TextField
                    id="outlined-basic"
                    autoSave='false'
                    label="Entre com a placa do veículo"
                    variant="outlined"
                    style={{ width: '50%', marginLeft: '1rem', marginBottom: '1rem' }}
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />
                <Button variant="outlined" style={{ marginRight: '1rem', marginBottom: '1rem' }} onClick={handleSearch}>
                    Search
                </Button>
            </Card>
            
            {Object.keys(resultado).length > 0 && (
                <div>
                    <Typography variant="subtitle1" paddingLeft={2}>
                        Resultado da busca
                    </Typography>
                    <Typography variant="body1" paddingLeft={2}>
                        Placa: {resultado.placa}
                    </Typography>
                    <Typography variant="body1" paddingLeft={2}>
                        Marca: {resultado.marca}
                    </Typography>
                    <Typography variant="body1" paddingLeft={2}>
                        Modelo: {resultado.modelo}
                    </Typography>
                    <Typography variant="body1" paddingLeft={2}>
                        Status: {resultado.statusConcerto}
                    </Typography>
                </div>
            )}
            {erro && (
                <Typography variant="subtitle1" color="error" paddingLeft={2}>
                    {erro}
                </Typography>
            )}
        </Card>
    );
};

export default UserPage;
