import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mi Perfil
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Gestiona tu perfil y tus anuncios
      </Typography>
      {/* TODO: Implementar perfil de usuario */}
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Perfil de usuario en desarrollo...
      </Typography>
    </Container>
  );
};

export default Profile;
