import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/copyright';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function LoginPage() {

    const navigate =useNavigate()

    const Login = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('email') != null && data.get('password')!= null){
            navigate('/home')
        }else{

        }
    };

    const Client = () => {
        navigate('/user')
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px outset black',
                        borderRadius: '10px',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Entrar
                    </Typography>
                    <Box component="form" onSubmit={Login} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            onClick={navigate('/home')}

                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Login
                        </Button>
                        <Button
                            onClick={Client}
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar como cliente
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}