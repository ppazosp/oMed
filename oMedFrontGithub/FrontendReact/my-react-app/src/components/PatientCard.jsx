// PatientCard.jsx
import React, { useRef, useState } from 'react';
import { Paper, Box, Avatar, Typography, IconButton } from '@mui/material';
import TreatmentCard from './TreatmentCard.jsx';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import '../style/PatientCard.css';

const PatientCard = ({ patient, medications, doses }) => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(medications.length > 2);

    const getLatestDoses = (medicationId, limit = 7) => {
        return doses
            .filter(dose => dose.medicationId === medicationId)
            .sort((a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime))
            .slice(0, limit);
    };

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 250;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });

            setTimeout(() => {
                const container = scrollContainerRef.current;
                setCanScrollLeft(container.scrollLeft > 0);
                setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth));
            }, 300);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 6, boxShadow: 3, background: 'linear-gradient(to right, #FEC9A7, #FFEAB9)' }}>
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

            <Box position="relative" sx={{ overflow: 'hidden'}}>
                {canScrollLeft && (
                    <IconButton
                        onClick={() => handleScroll('left')}
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.3)' }
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                )}

                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' }
                    }}
                >
                    {medications.map(medication => (
                        <Box key={medication.id} sx={{ flex: '0 0 auto', width: '480px' }}>
                            <TreatmentCard
                                medication={medication}
                                doses={getLatestDoses(medication.id)}
                            />
                        </Box>
                    ))}
                </Box>

                {canScrollRight && (
                    <IconButton
                        onClick={() => handleScroll('right')}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-60%)',
                            zIndex: 2,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.3)'}
                        }}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                )}
            </Box>
        </Paper>
    );
};

export default PatientCard;