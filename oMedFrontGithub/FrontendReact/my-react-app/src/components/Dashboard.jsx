import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Avatar,
    LinearProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Switch,
    FormControlLabel
} from '@mui/material';

// Importación de íconos
import {
    Add as AddIcon
} from '@mui/icons-material';

// Importamos el componente de tarjeta de medicación
import TreatmentCard from './TreatmentCard.jsx';

const Dashboard = () => {
    // Estados para los datos
    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);
    const [doses, setDoses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newDose, setNewDose] = useState({
        patientId: '',
        medicationId: '',
        taken: false,
        scheduledTime: new Date().toISOString().slice(0, 16)
    });

    // Simulación de carga de datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                // En una aplicación real, estas serían llamadas a tu API
                // const patientsResponse = await fetch('/api/patients');
                // const patientsData = await patientsResponse.json();

                // Datos de ejemplo
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
                    { id: 5, patientId: 3, name: 'Levotiroxina', dosage: '100mcg', frequency: 'Cada 24 horas', remainingDays: 5, totalDays: 30 },
                    { id: 6, patientId: 3, name: 'Metformina', dosage: '850mg', frequency: 'Cada 12 horas', remainingDays: 10, totalDays: 30 }
                ];

                const dosesData = [
                    // Dosis de hace 3 días (todas tomadas)
                    { id: 1, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-22T08:00', takenTime: '2025-02-22T08:05' },
                    { id: 2, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-22T16:00', takenTime: '2025-02-22T16:10' },
                    { id: 3, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-23T00:00', takenTime: '2025-02-23T00:15' },

                    // Dosis de hace 2 días (una perdida)
                    { id: 4, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-23T08:00', takenTime: '2025-02-23T08:12' },
                    { id: 5, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-23T16:00', takenTime: null },
                    { id: 6, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-24T00:00', takenTime: '2025-02-24T00:05' },

                    // Dosis de ayer (una perdida)
                    { id: 7, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-24T08:00', takenTime: '2025-02-24T08:02' },
                    { id: 8, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-24T16:00', takenTime: '2025-02-24T16:30' },
                    { id: 9, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-24T23:59', takenTime: null },

                    // Dosis de hoy (25 de febrero, una tomada, una pendiente y una programada)
                    { id: 10, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-25T08:00', takenTime: '2025-02-25T08:15' },
                    { id: 11, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-25T16:00', takenTime: null },
                    { id: 12, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-26T00:00', takenTime: null },

                    // Dosis de mañana (todas programadas)
                    { id: 13, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-26T08:00', takenTime: null },
                    { id: 14, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-26T16:00', takenTime: null },
                    { id: 15, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-27T00:00', takenTime: null },

                    // Dosis de pasado mañana (todas programadas)
                    { id: 16, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-27T08:00', takenTime: null },
                    { id: 17, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-27T16:00', takenTime: null },
                    { id: 18, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-28T00:00', takenTime: null }
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

    // Manejadores para el diálogo de nueva dosis
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDose({
            ...newDose,
            [name]: value
        });
    };

    const handleSwitchChange = (e) => {
        setNewDose({
            ...newDose,
            taken: e.target.checked
        });
    };

    const handleSubmit = () => {
        // Aquí añadirías la lógica para guardar en la base de datos
        console.log('Nueva dosis a guardar:', newDose);

        // Simular añadir a la lista local
        const newDoseEntry = {
            id: doses.length + 1,
            medicationId: parseInt(newDose.medicationId),
            patientId: parseInt(newDose.patientId),
            taken: newDose.taken,
            scheduledTime: newDose.scheduledTime,
            takenTime: newDose.taken ? new Date().toISOString().slice(0, 16) : null
        };

        setDoses([...doses, newDoseEntry]);
        handleClose();

        // Reiniciar el formulario
        setNewDose({
            patientId: '',
            medicationId: '',
            taken: false,
            scheduledTime: new Date().toISOString().slice(0, 16)
        });
    };

    // Función para obtener las últimas dosis de un medicamento
    const getLatestDoses = (medicationId, limit = 3) => {
        return doses
            .filter(dose => dose.medicationId === medicationId)
            .sort((a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime))
            .slice(0, limit);
    };

    return (
        <>
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
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleClickOpen}
                            >
                                Registrar Dosis
                            </Button>
                        </Box>

                        {patients.map(patient => (
                            <Paper
                                key={patient.id}
                                elevation={3}
                                sx={{ p: 3, mb: 4 }}
                            >
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                        {patient.avatar}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5">{patient.name}</Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {patient.relation}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Grid container spacing={3}>
                                    {medications
                                        .filter(med => med.patientId === patient.id)
                                        .map(medication => (
                                            <Grid item xs={12} md={6} lg={5} key={medication.id}>
                                                <box sx={{ width: '800px', height: '300px' }}>
                                                    <TreatmentCard
                                                    medication={medication}
                                                    doses={getLatestDoses(medication.id)}
                                                    width="100%"
                                                />
                                                </box>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Paper>
                        ))}
                    </>
                )}
            </Container>

            {/* Diálogo para añadir una nueva dosis */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Registrar nueva dosis de medicación</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="patient-select-label">Paciente</InputLabel>
                            <Select
                                labelId="patient-select-label"
                                id="patient-select"
                                name="patientId"
                                value={newDose.patientId}
                                label="Paciente"
                                onChange={handleInputChange}
                            >
                                {patients.map(patient => (
                                    <MenuItem key={patient.id} value={patient.id}>
                                        {patient.name} ({patient.relation})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="medication-select-label">Medicación</InputLabel>
                            <Select
                                labelId="medication-select-label"
                                id="medication-select"
                                name="medicationId"
                                value={newDose.medicationId}
                                label="Medicación"
                                onChange={handleInputChange}
                                disabled={!newDose.patientId}
                            >
                                {medications
                                    .filter(med => med.patientId === parseInt(newDose.patientId))
                                    .map(medication => (
                                        <MenuItem key={medication.id} value={medication.id}>
                                            {medication.name} ({medication.dosage})
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            id="scheduled-time"
                            name="scheduledTime"
                            label="Hora programada"
                            type="datetime-local"
                            fullWidth
                            value={newDose.scheduledTime}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={newDose.taken}
                                    onChange={handleSwitchChange}
                                    name="taken"
                                />
                            }
                            label="¿Ya se ha tomado?"
                            sx={{ mt: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!newDose.patientId || !newDose.medicationId}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Dashboard;