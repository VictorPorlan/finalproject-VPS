import React from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import AuthForm from '../components/common/AuthForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();

  // Redirigir automáticamente cuando el usuario se autentica
  React.useEffect(() => {
    if (isAuthenticated) {
      showSuccess('¡Bienvenido! Has iniciado sesión correctamente.');
      navigate('/');
    }
  }, [isAuthenticated, navigate, showSuccess]);

  const handleLogin = async (data: Record<string, string>) => {
    try {
      await login(data.email, data.password);
      // La redirección se maneja en el useEffect
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
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
      name: 'password',
      label: 'Contraseña',
      type: 'password' as const,
      required: true,
      placeholder: '••••••••',
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <AuthForm
        title="Iniciar Sesión"
        fields={fields}
        submitText="Iniciar Sesión"
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error || undefined}
        linkText="¿No tienes cuenta?"
        linkHref="/register"
        linkLabel="Regístrate aquí"
      />
    </Container>
  );
};

export default Login;
