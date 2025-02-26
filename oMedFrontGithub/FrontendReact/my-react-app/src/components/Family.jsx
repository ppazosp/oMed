import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, LinearProgress } from '@mui/material';

const FamilyPage = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Datos de ejemplo
                const patientsData = [
                    { id: 1, name: 'María García', relation: 'Madre', avatar: 'M' },
                    { id: 2, name: 'José García', relation: 'Padre', avatar: 'J' },
                    { id: 3, name: 'Carmen López', relation: 'Abuela', avatar: 'C' },
                    { id: 4, name: 'Carlos Pérez', relation: 'Hermano', avatar: 'C' },
                    { id: 5, name: 'Ana Méndez', relation: 'Tía', avatar: 'A' }
                ];

                setPatients(patientsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <>
                    <Box mb={2}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Lista de Familiares
                        </Typography>
                    </Box>

                    <List>
                        {patients.map((patient, index) => (
                            <React.Fragment key={patient.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            {patient.avatar}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={patient.name}
                                        secondary={patient.relation}
                                    />
                                </ListItem>
                                {index < patients.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </>
            )}
        </Container>
    );
};

export default FamilyPage;
