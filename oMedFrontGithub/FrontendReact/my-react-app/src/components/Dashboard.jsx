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
                    { id: 4, patientId: 2, name: 'Losartán', dosage: '50mg', frequency: 'Cada 12 horas', remainingDays: 20, totalDays: 30 },
                    { id: 5, patientId: 3, name: 'Levotiroxina', dosage: '100mcg', frequency: 'Cada 24 horas', remainingDays: 10, totalDays: 30 },
                    { id: 6, patientId: 3, name: 'Metformina', dosage: '850mg', frequency: 'Cada 12 horas', remainingDays: 15, totalDays: 30 },
                    { id: 7, patientId: 4, name: 'Ibuprofeno', dosage: '400mg', frequency: 'Cada 6 horas', remainingDays: 5, totalDays: 7 },
                    { id: 8, patientId: 4, name: 'Atorvastatina', dosage: '20mg', frequency: 'Cada 24 horas', remainingDays: 30, totalDays: 60 },
                    { id: 9, patientId: 5, name: 'Lansoprazol', dosage: '15mg', frequency: 'Cada 24 horas', remainingDays: 14, totalDays: 30 },
                    { id: 10, patientId: 5, name: 'Aspirina', dosage: '100mg', frequency: 'Cada 24 horas', remainingDays: 12, totalDays: 30 },
                    { id: 11, patientId: 6, name: 'Antihistamínico', dosage: '10mg', frequency: 'Cada 12 horas', remainingDays: 8, totalDays: 14 },
                    { id: 12, patientId: 6, name: 'Antibiótico', dosage: '500mg', frequency: 'Cada 8 horas', remainingDays: 5, totalDays: 7 },
                    { id: 13, patientId: 1, name: 'Insulina', dosage: '10ml', frequency: 'Cada 12 horas', remainingDays: 3, totalDays: 7 },
                    { id: 14, patientId: 2, name: 'Metotrexato', dosage: '2.5mg', frequency: 'Cada 24 horas', remainingDays: 5, totalDays: 7 },
                    { id: 15, patientId: 1, name: 'Salbutamol', dosage: '100mcg', frequency: 'Cada 6 horas', remainingDays: 2, totalDays: 7 }

                ];


                const dosesData = [
                    // --- Dosis de Paracetamol (Paciente 1) ---
                    { id: 1, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-10T08:00', takenTime: '2025-02-10T08:05' },
                    { id: 2, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-10T16:00', takenTime: '2025-02-10T16:10' },
                    { id: 3, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-11T00:00', takenTime: '2025-02-11T00:15' },
                    { id: 4, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-11T08:00', takenTime: null },
                    { id: 5, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-11T16:00', takenTime: '2025-02-11T16:30' },
                    { id: 6, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-12T00:00', takenTime: '2025-02-12T00:20' },
                    { id: 7, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-12T08:00', takenTime: null },
                    { id: 8, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-12T16:00', takenTime: '2025-02-12T16:45' },
                    { id: 9, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-13T00:00', takenTime: null },

                    // --- Dosis de Omeprazol (Paciente 1) ---
                    { id: 10, medicationId: 2, patientId: 1, taken: true, scheduledTime: '2025-02-10T08:00', takenTime: '2025-02-10T08:05' },
                    { id: 11, medicationId: 2, patientId: 1, taken: true, scheduledTime: '2025-02-11T08:00', takenTime: '2025-02-11T08:10' },
                    { id: 12, medicationId: 2, patientId: 1, taken: false, scheduledTime: '2025-02-12T08:00', takenTime: null },
                    { id: 13, medicationId: 2, patientId: 1, taken: true, scheduledTime: '2025-02-13T08:00', takenTime: '2025-02-13T08:15' },

                    // --- Dosis de Simvastatina (Paciente 2) ---
                    { id: 14, medicationId: 3, patientId: 2, taken: true, scheduledTime: '2025-02-09T21:00', takenTime: '2025-02-09T21:10' },
                    { id: 15, medicationId: 3, patientId: 2, taken: true, scheduledTime: '2025-02-10T21:00', takenTime: '2025-02-10T21:05' },
                    { id: 16, medicationId: 3, patientId: 2, taken: false, scheduledTime: '2025-02-11T21:00', takenTime: null },

                    // --- Dosis de Losartán (Paciente 2) ---
                    { id: 17, medicationId: 4, patientId: 2, taken: true, scheduledTime: '2025-02-09T10:00', takenTime: '2025-02-09T10:10' },
                    { id: 18, medicationId: 4, patientId: 2, taken: false, scheduledTime: '2025-02-10T10:00', takenTime: null },
                    { id: 19, medicationId: 4, patientId: 2, taken: true, scheduledTime: '2025-02-11T10:00', takenTime: '2025-02-11T10:30' },

                    // --- Dosis de Levotiroxina (Paciente 3) ---
                    { id: 20, medicationId: 5, patientId: 3, taken: true, scheduledTime: '2025-02-08T07:00', takenTime: '2025-02-08T07:15' },
                    { id: 21, medicationId: 5, patientId: 3, taken: true, scheduledTime: '2025-02-09T07:00', takenTime: '2025-02-09T07:10' },

                    // --- Dosis de Metformina (Paciente 3) ---
                    { id: 22, medicationId: 6, patientId: 3, taken: false, scheduledTime: '2025-02-07T09:00', takenTime: null },
                    { id: 23, medicationId: 6, patientId: 3, taken: true, scheduledTime: '2025-02-08T09:00', takenTime: '2025-02-08T09:15' },

                    // --- Dosis de Insulina (Paciente 7) ---
                    { id: 24, medicationId: 13, patientId: 7, taken: true, scheduledTime: '2025-02-10T08:00', takenTime: '2025-02-10T08:10' },
                    { id: 25, medicationId: 13, patientId: 7, taken: true, scheduledTime: '2025-02-10T20:00', takenTime: '2025-02-10T20:15' },
                    { id: 26, medicationId: 13, patientId: 7, taken: false, scheduledTime: '2025-02-11T08:00', takenTime: null },

                    // --- Dosis de Salbutamol (Paciente 8) ---
                    { id: 27, medicationId: 15, patientId: 8, taken: true, scheduledTime: '2025-02-06T06:00', takenTime: '2025-02-06T06:10' },
                    { id: 28, medicationId: 15, patientId: 8, taken: true, scheduledTime: '2025-02-06T12:00', takenTime: '2025-02-06T12:05' },
                    { id: 29, medicationId: 15, patientId: 8, taken: true, scheduledTime: '2025-02-06T18:00', takenTime: '2025-02-06T18:20' },
                    { id: 30, medicationId: 15, patientId: 8, taken: false, scheduledTime: '2025-02-07T06:00', takenTime: null },
                    { id: 31, medicationId: 15, patientId: 8, taken: true, scheduledTime: '2025-02-07T12:00', takenTime: '2025-02-07T12:10' }
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
