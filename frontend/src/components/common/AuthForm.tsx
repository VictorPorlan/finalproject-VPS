import React from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  placeholder?: string;
}

interface FormProps {
  title: string;
  fields: FormField[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string;
  linkText?: string;
  linkHref?: string;
  linkLabel?: string;
}

const AuthForm: React.FC<FormProps> = ({
  title,
  fields,
  submitText,
  onSubmit,
  isLoading = false,
  error,
  linkText,
  linkHref,
  linkLabel,
}) => {
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = React.useState<Record<string, boolean>>({});

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = formData[field.name] || '';
      
      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} es requerido`;
      }
      
      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        errors[field.name] = 'Email inválido';
      }
      
      if (field.type === 'password' && value && value.length < 6) {
        errors[field.name] = 'La contraseña debe tener al menos 6 caracteres';
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        {title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {fields.map((field) => (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type === 'password' && showPasswords[field.name] ? 'text' : field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ''}
          onChange={handleChange(field.name)}
          error={!!validationErrors[field.name]}
          helperText={validationErrors[field.name]}
          required={field.required}
          fullWidth
          variant="outlined"
          InputProps={
            field.type === 'password'
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => togglePasswordVisibility(field.name)}
                        edge="end"
                      >
                        {showPasswords[field.name] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined
          }
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            Procesando...
          </Box>
        ) : (
          submitText
        )}
      </Button>

      {linkText && linkHref && linkLabel && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {linkText}{' '}
            <Button
              component="a"
              href={linkHref}
              variant="text"
              sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
            >
              {linkLabel}
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthForm;
