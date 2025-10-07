import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Catalog: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Catálogo de Cartas
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Explora nuestro catálogo completo de cartas de Magic: The Gathering
      </Typography>
      {/* TODO: Implementar catálogo de cartas */}
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Catálogo en desarrollo...
      </Typography>
    </Container>
  );
};

export default Catalog;
