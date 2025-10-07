import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Register: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrarse
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Crea tu cuenta en TradeBinder
        </Typography>
      </Box>
      {/* TODO: Implementar formulario de registro */}
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Formulario de registro en desarrollo...
      </Typography>
    </Container>
  );
};

export default Register;
