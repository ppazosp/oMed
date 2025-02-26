import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Link } from '@mui/material';

const MedicinesPage = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Datos de ejemplo
                const medicationsData = [
                    { id: 1, name: 'Paracetamol', system: 'Sistema Nervioso', description: 'Analgésico y antipirético usado para tratar la fiebre y el dolor leve a moderado.' },
                    { id: 2, name: 'Omeprazol', system: 'Sistema Digestivo', description: 'Inhibidor de la bomba de protones que reduce la producción de ácido en el estómago.' },
                    { id: 3, name: 'Simvastatina', system: 'Sistema Cardiovascular', description: 'Medicamento que reduce el colesterol y previene enfermedades cardíacas.' },
                    { id: 4, name: 'Losartán', system: 'Sistema Cardiovascular', description: 'Antihipertensivo utilizado para tratar la presión arterial alta y enfermedades del corazón.' },
                    { id: 5, name: 'Levotiroxina', system: 'Sistema Endocrino', description: 'Hormona tiroidea sintética usada para tratar el hipotiroidismo.' },
                    { id: 6, name: 'Metformina', system: 'Sistema Endocrino', description: 'Fármaco antidiabético utilizado en el tratamiento de la diabetes tipo 2.' },
                    { id: 7, name: 'Ibuprofeno', system: 'Sistema Nervioso', description: 'Antiinflamatorio no esteroideo (AINE) usado para tratar el dolor y la inflamación.' },
                    { id: 8, name: 'Atorvastatina', system: 'Sistema Cardiovascular', description: 'Reduce los niveles de colesterol y triglicéridos en la sangre.' },
                    { id: 9, name: 'Lansoprazol', system: 'Sistema Digestivo', description: 'Inhibidor de la bomba de protones usado para tratar úlceras gástricas y reflujo.' },
                    { id: 10, name: 'Aspirina', system: 'Sistema Cardiovascular', description: 'Antiinflamatorio y anticoagulante usado en la prevención de infartos y trombosis.' }
                ];

                setMedications(medicationsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                        Información de Medicamentos
                    </Typography>

                    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Nombre</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Sistema Afectado</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medications.map((medication) => (
                                    <TableRow key={medication.id} hover>
                                        <TableCell>
                                            <Link href={`/medicinas/${medication.id}`} underline="hover" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                                {medication.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{medication.system}</TableCell>
                                        <TableCell>{medication.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Container>
    );
};

export default MedicinesPage;
