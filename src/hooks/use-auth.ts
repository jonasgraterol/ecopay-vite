import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type SignUpData, type SignInData } from '@/services/auth';
import { useNavigate } from '@tanstack/react-router';

export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignUpData) => authService.signUp(data),
    onSuccess: (response) => {
      // Store the JWT token
      localStorage.setItem('feathers-jwt', response.accessToken);
      
      // Update the cached user data
      queryClient.setQueryData(['currentUser'], response.user);
      
      // Redirect to dashboard
      navigate({ to: '/dashboard' });
    },
  });
}

export function useSignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInData) => authService.signIn(data),
    onSuccess: (response) => {
      // Store the JWT token
      localStorage.setItem('feathers-jwt', response.accessToken);
      
      // Update the cached user data
      queryClient.setQueryData(['currentUser'], response.user);
      
      // Redirect to dashboard
      navigate({ to: '/dashboard' });
    },
  });
}

export function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    // Remove the JWT token
    localStorage.removeItem('feathers-jwt');
    
    // Clear the cached user data
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    
    // Redirect to login
    navigate({ to: '/auth/login' });
  };
}
