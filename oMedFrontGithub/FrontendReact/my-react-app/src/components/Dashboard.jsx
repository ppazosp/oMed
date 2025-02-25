import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Chip,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
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
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    AccessTime as AccessTimeIcon,
    Medication as MedicationIcon,
    Add as AddIcon
} from '@mui/icons-material';

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
                    { id: 1, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-25T08:00', takenTime: '2025-02-25T08:05' },
                    { id: 2, medicationId: 1, patientId: 1, taken: true, scheduledTime: '2025-02-25T16:00', takenTime: '2025-02-25T16:10' },
                    { id: 3, medicationId: 1, patientId: 1, taken: false, scheduledTime: '2025-02-26T00:00', takenTime: null },
                    { id: 4, medicationId: 2, patientId: 1, taken: true, scheduledTime: '2025-02-25T09:00', takenTime: '2025-02-25T09:15' },
                    { id: 5, medicationId: 3, patientId: 2, taken: true, scheduledTime: '2025-02-25T21:00', takenTime: '2025-02-25T21:05' },
                    { id: 6, medicationId: 4, patientId: 2, taken: true, scheduledTime: '2025-02-25T09:00', takenTime: '2025-02-25T09:10' },
                    { id: 7, medicationId: 4, patientId: 2, taken: false, scheduledTime: '2025-02-25T21:00', takenTime: null },
                    { id: 8, medicationId: 5, patientId: 3, taken: true, scheduledTime: '2025-02-25T08:00', takenTime: '2025-02-25T08:30' },
                    { id: 9, medicationId: 6, patientId: 3, taken: true, scheduledTime: '2025-02-25T08:00', takenTime: '2025-02-25T08:30' },
                    { id: 10, medicationId: 6, patientId: 3, taken: false, scheduledTime: '2025-02-25T20:00', takenTime: null }
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

    // Función para calcular el progreso del tratamiento
    const calculateProgress = (remainingDays, totalDays) => {
        return ((totalDays - remainingDays) / totalDays) * 100;
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
                                            <Grid item xs={12} md={6} lg={4} key={medication.id}>
                                                <Card>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                                                <MedicationIcon />
                                                            </Avatar>
                                                        }
                                                        title={medication.name}
                                                        subheader={`${medication.dosage} - ${medication.frequency}`}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Progreso del tratamiento:
                                                        </Typography>
                                                        <Box display="flex" alignItems="center">
                                                            <Box width="100%" mr={1}>
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={calculateProgress(medication.remainingDays, medication.totalDays)}
                                                                />
                                                            </Box>
                                                            <Box minWidth={35}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {medication.remainingDays} días
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                                                            Últimas dosis:
                                                        </Typography>
                                                        <List dense>
                                                            {getLatestDoses(medication.id).map((dose) => (
                                                                <ListItem key={dose.id}>
                                                                    <ListItemIcon>
                                                                        {dose.taken ? (
                                                                            <CheckCircleIcon sx={{ color: 'green' }} />
                                                                        ) : (
                                                                            new Date(dose.scheduledTime) < new Date() ? (
                                                                                <CancelIcon sx={{ color: 'red' }} />
                                                                            ) : (
                                                                                <AccessTimeIcon sx={{ color: 'orange' }} />
                                                                            )
                                                                        )}
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={new Date(dose.scheduledTime).toLocaleTimeString('es-ES', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            day: '2-digit',
                                                                            month: '2-digit'
                                                                        })}
                                                                        secondary={dose.taken ? 'Tomado' : 'Pendiente'}
                                                                    />
                                                                    {dose.taken && dose.takenTime && (
                                                                        <Chip
                                                                            size="small"
                                                                            label={`${new Date(dose.takenTime).toLocaleTimeString('es-ES', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}`}
                                                                            color="success"
                                                                            variant="outlined"
                                                                        />
                                                                    )}
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </CardContent>
                                                </Card>
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