import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, LinearProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PatientCard from './PatientCard.jsx';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);
    const [doses, setDoses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsData = [
                    { id: 1, name: 'María García', relation: 'Madre', avatar: 'M' },
                    { id: 2, name: 'José García', relation: 'Padre', avatar: 'J' },
                    { id: 3, name: 'Carmen López', relation: 'Abuela', avatar: 'C' }
                ];

                const medicationsData = [
                    { id: 1, patientId: 1, name: 'Paracetamol', dosage: '500mg', frequency: 'Cada 8 horas', remainingDays: 7, totalDays: 10 },
                    { id: 2, patientId: 1, name: 'Omeprazol', dosage: '20mg', frequency: 'Cada 24 horas', remainingDays: 15, totalDays: 30 },
                    { id: 3, patientId: 2, name: 'Simvastatina', dosage: '40mg', frequency: 'Cada 24 horas', remainingDays: 25, totalDays: 30 },
                    { id: 4, patientId: 2, name: 'Losartán', dosage: '50mg', frequency: 'Cada 12 horas', remainingDays: 20, totalDays: 30 }
                ];

                const dosesData = [
                    { id: 1, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-22T08:00', takenTime: '2025-02-22T08:05' },
                    { id: 2, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-22T16:00', takenTime: '2025-02-22T16:10' }
                ];

                setPatients(patientsData);
                setMedications(medicationsData);
                setDoses(dosesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Dashboard de Medicaciones
                        </Typography>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            Registrar Dosis
                        </Button>
                    </Box>

                    {patients.map(patient => (
                        <PatientCard
                            key={patient.id}
                            patient={patient}
                            medications={medications.filter(med => med.patientId === patient.id)}
                            doses={doses}
                        />
                    ))}
                </>
            )}
        </Container>
    );
};

export default Dashboard;
