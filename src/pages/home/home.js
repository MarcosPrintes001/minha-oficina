import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FormularioCadastroVeiculo from '../../components/formulario';
import TabelaVeiculos from '../../components/tabelaVeiculos';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Home = () => {
    const navigate = useNavigate()
    const [veiculos, setVeiculos] = useState([]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Logout = () => {
        navigate('/')
    };


    // Função de callback para adicionar um novo veículo à tabela de veículos
    const handleCadastroVeiculo = (novoVeiculoData) => {
        setVeiculos([...veiculos, novoVeiculoData]);
    };



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={Logout}>Sair</Button>

            </div>
            <Typography variant="h4" paddingLeft={2}>
                Gestão de Serviços de Oficina
            </Typography>
            <Typography variant="subtitle1" paddingLeft={2}>
                With supporting text below as a natural lead-in to aditional
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Cadastrar Serviço" {...a11yProps(0)} />
                        <Tab label="Alterar Status de Serviços" {...a11yProps(1)} />
                    </Tabs>
                </Box>


                <TabPanel value={value} index={0} >
                    <FormularioCadastroVeiculo onCadastroVeiculo={handleCadastroVeiculo} />

                </TabPanel>

                <TabPanel value={value} index={1}>

                    <TabelaVeiculos/>

                </TabPanel>

            </Box>
        </>

    )
}

export default Home;