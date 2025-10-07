import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Accede a tu cuenta de TradeBinder
        </Typography>
      </Box>
      {/* TODO: Implementar formulario de login */}
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Formulario de login en desarrollo...
      </Typography>
    </Container>
  );
};

export default Login;
