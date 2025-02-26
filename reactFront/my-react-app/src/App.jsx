// App.js
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout.jsx';
import Family from "./components/Family.jsx";
import Medicine from "./components/Medicine.jsx";

// Tema personalizado
const theme = createTheme({
    palette: {
        primary: {
            main: '#f096be',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f0f2f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path={"/pacientes"} index element={<Family />} />
                        <Route path={"/medicaciones"} element={<Medicine />} />
                        {/* Aquí puedes añadir más rutas según necesites */}
                        {/* <Route path="/pacientes" element={<Patients />} /> */}
                        {/* <Route path="/medicaciones" element={<Medications />} /> */}
                        {/* <Route path="/informes" element={<Reports />} /> */}
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;

