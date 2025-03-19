import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const SignupPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  boxShadow: '0 8px 24px rgba(43, 123, 140, 0.12)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  width: 56,
  height: 56,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 4px 10px rgba(43, 123, 140, 0.2)',
  '&:hover': {
    backgroundColor: '#236C7D',
    boxShadow: '0 6px 14px rgba(43, 123, 140, 0.3)',
    transform: 'translateY(-2px)',
  },
}));

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }
      
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <SignupPaper>
        <StyledAvatar>
          <PersonAddIcon fontSize="large" />
        </StyledAvatar>
        
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#2B7B8C' }}>
          Sign Up
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSignup} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            variant="outlined"
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          
          <StyledButton type="submit" fullWidth variant="contained">
            Sign Up
          </StyledButton>
          
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/Login">Sign In</Link>
          </Typography>
        </Box>
      </SignupPaper>
      
      <Snackbar open={openSnackbar} autoHideDuration={1500}>
        <Alert severity="success">
          Signup successful! Redirecting to login...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;