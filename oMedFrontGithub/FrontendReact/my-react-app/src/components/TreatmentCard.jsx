import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Box,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
    Grid,
    Paper
} from '@mui/material';

import {
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    AccessTime as AccessTimeIcon,
    Medication as MedicationIcon
} from '@mui/icons-material';

const TreatmentCard = ({ medication, doses }) => {
    // Función para calcular el progreso del tratamiento
    const calculateProgress = (remainingDays, totalDays) => {
        return ((totalDays - remainingDays) / totalDays) * 100;
    };

    // Fecha actual
    const now = new Date();

    // Ordenar las dosis por fecha programada
    const sortedDoses = [...doses].sort((a, b) =>
        new Date(a.scheduledTime) - new Date(b.scheduledTime)
    );

    // Encontrar el índice de la dosis más cercana a la fecha actual (hoy)
    const closestDoseIndex = sortedDoses.findIndex(dose =>
        new Date(dose.scheduledTime) >= now
    );

    // Generar siempre 7 dosis para mostrar, incluso si no hay suficientes en los datos originales
    let displayDoses = [];

    // Si no hay dosis futuras (closestDoseIndex es -1), mostrar las últimas dosis disponibles
    if (closestDoseIndex === -1) {
        // Tomar las últimas dosis disponibles (hasta 7)
        const availableDoses = sortedDoses.slice(Math.max(0, sortedDoses.length - 7));

        // Si hay menos de 7 dosis disponibles, generar dosis futuras ficticias
        if (availableDoses.length < 7) {
            const lastDose = sortedDoses[sortedDoses.length - 1];
            const lastDoseTime = lastDose ? new Date(lastDose.scheduledTime) : now;

            // Determinar el intervalo para dosis futuras basado en la frecuencia del medicamento
            const intervalHours = medication.frequency.includes("8 horas") ? 8 :
                medication.frequency.includes("12 horas") ? 12 :
                    medication.frequency.includes("24 horas") ? 24 : 8;

            // Generar dosis futuras ficticias
            for (let i = 0; i < 7 - availableDoses.length; i++) {
                const nextDoseTime = new Date(lastDoseTime);
                nextDoseTime.setHours(nextDoseTime.getHours() + intervalHours * (i + 1));

                availableDoses.push({
                    id: `future-${i}`,
                    scheduledTime: nextDoseTime.toISOString(),
                    taken: false,
                    takenTime: null
                });
            }
        }

        displayDoses = availableDoses.slice(0, 7);
    } else {
        // Hay dosis futuras. Centrar alrededor de la dosis actual
        const startIndex = Math.max(0, closestDoseIndex - 4);
        displayDoses = sortedDoses.slice(startIndex, startIndex + 7);

        // Si no hay suficientes dosis, completar con dosis ficticias
        if (displayDoses.length < 7) {
            // Si faltan dosis al inicio (pasadas)
            if (startIndex > 0 || displayDoses.length < closestDoseIndex + 3) {
                // Completar con dosis pasadas adicionales si es posible
                const additionalPastDoses = sortedDoses.slice(
                    Math.max(0, startIndex - (7 - displayDoses.length)),
                    startIndex
                );
                displayDoses = [...additionalPastDoses, ...displayDoses];
            }

            // Si todavía faltan dosis (futuras)
            if (displayDoses.length < 7) {
                const lastDose = displayDoses[displayDoses.length - 1];
                const lastDoseTime = lastDose ? new Date(lastDose.scheduledTime) : now;

                // Determinar intervalo
                const intervalHours = medication.frequency.includes("8 horas") ? 8 :
                    medication.frequency.includes("12 horas") ? 12 :
                        medication.frequency.includes("24 horas") ? 24 : 8;

                // Generar dosis futuras ficticias
                for (let i = 0; i < 7 - displayDoses.length; i++) {
                    const nextDoseTime = new Date(lastDoseTime);
                    nextDoseTime.setHours(nextDoseTime.getHours() + intervalHours * (i + 1));

                    displayDoses.push({
                        id: `future-${i}`,
                        scheduledTime: nextDoseTime.toISOString(),
                        taken: false,
                        takenTime: null
                    });
                }
            }
        }

        // Asegurar que solo tengamos 7 elementos
        displayDoses = displayDoses.slice(0, 7);
    }

    return (
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
                    Seguimiento de dosis:
                </Typography>

                <Grid container spacing={1} justifyContent="space-between">
                    {displayDoses.map((dose, index) => {
                        const doseDate = new Date(dose.scheduledTime);
                        const isPast = doseDate < now;
                        const isToday = doseDate.toDateString() === now.toDateString();
                        const isFuture = doseDate > now;

                        // Determinar si esta dosis es la más cercana al presente
                        const isNearest = index === 0 ? false :
                            index === displayDoses.length - 1 ? false :
                                displayDoses[index - 1].scheduledTime < now.toISOString() &&
                                displayDoses[index].scheduledTime >= now.toISOString();

                        return (
                            <Grid item key={dose.id || `dose-${index}`}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        bgcolor: isNearest ||
                                        (isToday && Math.abs(doseDate.getTime() - now.getTime()) < 8 * 60 * 60 * 1000) ?
                                            'rgba(255, 165, 0, 0.1)' : 'inherit',
                                        border: isNearest ||
                                        (isToday && Math.abs(doseDate.getTime() - now.getTime()) < 8 * 60 * 60 * 1000) ?
                                            '1px solid orange' : '1px solid #eee',
                                        width: '60px'
                                    }}
                                >
                                    <Box sx={{ textAlign: 'center', mb: 1 }}>
                                        {isPast ? (
                                            dose.taken ? (
                                                <CheckCircleIcon sx={{ color: 'green' }} />
                                            ) : (
                                                <CancelIcon sx={{ color: 'red' }} />
                                            )
                                        ) : (
                                            <AccessTimeIcon sx={{ color: 'orange' }} />
                                        )}
                                    </Box>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                        {doseDate.toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: '2-digit'
                                        })}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                        {doseDate.toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Typography>
                                    {dose.taken && dose.takenTime && (
                                        <Typography variant="caption" color="success.main" sx={{ fontSize: '0.7rem' }}>
                                            ✓ {new Date(dose.takenTime).toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                        </Typography>
                                    )}
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                    Últimas dosis:
                </Typography>
                <List dense>
                    {sortedDoses.filter(dose => new Date(dose.scheduledTime) <= now).slice(-3).map((dose) => (
                        <ListItem key={dose.id}>
                            <ListItemIcon>
                                {dose.taken ? (
                                    <CheckCircleIcon sx={{ color: 'green' }} />
                                ) : (
                                    <CancelIcon sx={{ color: 'red' }} />
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
    );
};

export default TreatmentCard;