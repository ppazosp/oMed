// components/Layout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Medication as MedicationIcon,
    Assessment as AssessmentIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
/*Importar hoja de estilos*/
import '../style/Layout.css';

const drawerWidth = 250;

const Layout = () => {
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsAnchor, setNotificationsAnchor] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotifications = (event) => {
        setNotificationsAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseNotifications = () => {
        setNotificationsAnchor(null);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Barra lateral */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: '#fff',
                        borderRight: '1px solid rgba(0, 0, 0, 0.08)'
                    },
                }}
            >
                <Toolbar sx={{ px: [1], py: 2 }}>
                    <Box display="flex" alignItems="center">
                        <MedicationIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
                        <Typography variant="h6" fontWeight="700" component="div">
                            oMed
                        </Typography>
                    </Box>
                </Toolbar>
                <Divider />
                <List className={"ListaLeftSideBar"}>
                    <ListItem button component={Link} to="/" selected>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/pacientes">
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Familiares" />
                    </ListItem>
                    <ListItem button component={Link} to="/medicaciones">
                        <ListItemIcon>
                            <MedicationIcon />
                        </ListItemIcon>
                        <ListItemText primary="Medicaciones" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/configuracion">
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItem>
                </List>

                {/* Información del usuario en la parte inferior */}
                <Box sx={{
                    mt: 'auto',
                    p: 2,
                    borderTop: '1px solid rgba(0, 0, 0, 0.18)',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#f096be' }}>A</Avatar>
                    <Box>
                        <Typography variant="subtitle2">oMed Admin</Typography>
                        <Typography variant="body2" color="text.secondary">Cuidador familiar</Typography>
                    </Box>
                </Box>
            </Drawer>

            {/* Contenido principal */}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default'
            }}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                        zIndex: (theme) => theme.zIndex.drawer - 1,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Notificaciones */}
                        <Tooltip title="Notificaciones">
                            <IconButton
                                color="inherit"
                                onClick={handleNotifications}
                                sx={{ mr: 2 }}
                            >
                                <Badge badgeContent={3} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        {/* Menú de usuario */}
                        <IconButton
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#ee95bd' }}>A</Avatar>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Menú desplegable de notificaciones */}
                <Menu
                    id="notifications-menu"
                    anchorEl={notificationsAnchor}
                    open={Boolean(notificationsAnchor)}
                    onClose={handleCloseNotifications}
                    PaperProps={{
                        elevation: 2,
                        sx: { maxWidth: 320 }
                    }}
                >
                    <MenuItem onClick={handleCloseNotifications}>
                        <ListItemIcon>
                            <MedicationIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <Box>
                            <Typography variant="body2">Dosis perdida: Paracetamol</Typography>
                            <Typography variant="caption" color="text.secondary">
                                María García - Hoy, 16:00
                            </Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                        <ListItemIcon>
                            <MedicationIcon fontSize="small" color="warning" />
                        </ListItemIcon>
                        <Box>
                            <Typography variant="body2">Próxima dosis: Metformina</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Carmen López - En 30 minutos
                            </Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                        <ListItemIcon>
                            <MedicationIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <Box>
                            <Typography variant="body2">Medicación por acabar: Levotiroxina</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Carmen López - 5 días restantes
                            </Typography>
                        </Box>
                    </MenuItem>
                </Menu>

                {/* Menú desplegable de usuario */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Mi perfil</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Configuración</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">Cerrar sesión</Typography>
                    </MenuItem>
                </Menu>

                {/* Contenido principal (Dashboard) */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: 8,
                        overflow: 'auto'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;