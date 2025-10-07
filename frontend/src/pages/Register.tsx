import React from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import AuthForm from '../components/common/AuthForm';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const { showSuccess, showError } = useNotification();

  const handleRegister = async (data: Record<string, string>) => {
    try {
      await register(data.email, data.username, data.password, data.location);
      showSuccess('¡Cuenta creada exitosamente! Por favor, inicia sesión con tus credenciales.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al crear la cuenta';
      showError(errorMessage);
    }
  };

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'tu@email.com',
    },
    {
      name: 'username',
      label: 'Nombre de usuario',
      type: 'text' as const,
      required: true,
      placeholder: 'tu_usuario',
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password' as const,
      required: true,
      placeholder: '••••••••',
    },
    {
      name: 'location',
      label: 'Ubicación (opcional)',
      type: 'text' as const,
      required: false,
      placeholder: 'Madrid, España',
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <AuthForm
        title="Crear Cuenta"
        fields={fields}
        submitText="Registrarse"
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error || undefined}
        linkText="¿Ya tienes cuenta?"
        linkHref="/login"
        linkLabel="Inicia sesión aquí"
      />
    </Container>
  );
};

export default Register;
