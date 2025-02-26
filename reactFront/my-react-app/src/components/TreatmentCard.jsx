import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Box,
    LinearProgress,
    Grid,
    Paper
} from '@mui/material';

import {
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    AccessTime as AccessTimeIcon,
    Medication as MedicationIcon
} from '@mui/icons-material';
import { green } from '@mui/material/colors';

const TreatmentCard = ({ medication, doses, color }) => {
    const calculateProgress = (remainingDays, totalDays) => {
        return ((totalDays - remainingDays) / totalDays) * 100;
    };

    const now = new Date();
    const sortedDoses = [...doses].sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
    let displayDoses = sortedDoses.slice(0, 7);

    if (displayDoses.length < 7) {
        const lastDose = displayDoses[displayDoses.length - 1] || { scheduledTime: now.toISOString() };
        const lastDoseTime = new Date(lastDose.scheduledTime);
        const intervalHours = medication.frequency.includes("8 horas") ? 8 :
            medication.frequency.includes("12 horas") ? 12 :
                medication.frequency.includes("24 horas") ? 24 : 8;

        for (let i = displayDoses.length; i < 7; i++) {
            const nextDoseTime = new Date(lastDoseTime);
            nextDoseTime.setHours(nextDoseTime.getHours() + intervalHours * (i - displayDoses.length + 1));
            displayDoses.push({
                id: `future-${i}`,
                scheduledTime: nextDoseTime.toISOString(),
                taken: false,
                takenTime: null
            });
        }
    }

    return (
        <Card sx={{ borderRadius: 5, background: `linear-gradient(to top, ${color}, white)`  }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: color }}>
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
                            sx={{ '& .MuiLinearProgress-bar': { backgroundColor: color }, bgcolor: '#F5F6F1' }}
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

                <Grid container spacing={1} justifyContent="space-between" sx={{ px: 2 }}>
                    {displayDoses.map((dose, index) => {
                        const doseDate = new Date(dose.scheduledTime);
                        const isPast = doseDate < now;
                        const isToday = doseDate.toDateString() === now.toDateString();
                        const isNearest = index === 0 ? false :
                            index === displayDoses.length - 1 ? false :
                                displayDoses[index - 1].scheduledTime < now.toISOString() &&
                                displayDoses[index].scheduledTime >= now.toISOString();

                        return (
                            <Grid item key={dose.id || `dose-${index}`}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        height: '140px',
                                        bgcolor: isNearest ||
                                        (isToday && Math.abs(doseDate.getTime() - now.getTime()) < 8 * 60 * 60 * 1000) ?
                                            'rgba(255, 165, 0, 0.1)' : 'inherit',
                                        border: isNearest ||
                                        (isToday && Math.abs(doseDate.getTime() - now.getTime()) < 8 * 60 * 60 * 1000) ?
                                            '1px solid orange' : '1px solid #eee',
                                        width: '50px',
                                        borderRadius: 3
                                    }}
                                >
                                    <Box sx={{ textAlign: 'center', mb: 1 }}>
                                        {isPast ? (
                                            dose.taken ? (
                                                <CheckCircleIcon sx={{ color: '#8CFCA4' }} />
                                            ) : (
                                                <CancelIcon sx={{ color: '#FF6961' }} />
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
            </CardContent>
        </Card>
    );
};

export default TreatmentCard;