import React from 'react';
import { Paper, Box, Avatar, Typography, Grid } from '@mui/material';
import TreatmentCard from './TreatmentCard.jsx';

const PatientCard = ({ patient, medications, doses }) => {
    const getLatestDoses = (medicationId, limit = 3) => {
        return doses
            .filter(dose => dose.medicationId === medicationId)
            .sort((a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime))
            .slice(0, limit);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
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
                {medications.map(medication => (
                    <Grid item xs={12} md={6} lg={5} key={medication.id}>
                        <TreatmentCard
                            medication={medication}
                            doses={getLatestDoses(medication.id)}
                            width="100%"
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default PatientCard;
