
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { AuthState, Profile } from '@/types/auth';
import { toast } from 'sonner';

const initialState: AuthState = {
  user: null,
  session: null,
  profile: null,
  isLoading: true,
};

export const AuthContext = createContext<{
  authState: AuthState;
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string; user_type: 'customer' | 'seller' }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
}>({
  authState: initialState,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Initialize auth
  useEffect(() => {
    const initializeAuth = async () => {
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
          
          if (session?.user) {
            setTimeout(async () => {
              const profile = await fetchProfile(session.user.id);
              setAuthState(prev => ({ ...prev, profile, isLoading: false }));
            }, 0);
          } else {
            setAuthState(prev => ({ ...prev, profile: null, isLoading: false }));
          }
        }
      );

      // THEN check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
      
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setAuthState(prev => ({ ...prev, profile, isLoading: false }));
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }

      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userData: { first_name: string; last_name: string; userType: 'customer' | 'seller' }
  ) => {
    try {
      
      // Ensure the user_type is a string
      const user_type = userData.userType.toString();
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            user_type: user_type,
          },
        },
      });
      if (error) {
        console.error('Signup error:', error);
        throw error;
      }
      
      toast.success('Account created successfully! Please check your email for verification.');
    } catch (error: any) {
      console.error('Error in signUp function:', error);
      toast.error(error.message || 'Failed to sign up');
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Signed in successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setAuthState({ ...initialState, isLoading: false });
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  const updateProfile = async (profile: Partial<Profile>) => {
    if (!authState.user) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', authState.user.id);

      if (error) throw error;

      // Refetch the profile
      const updatedProfile = await fetchProfile(authState.user.id);
      setAuthState(prev => ({ ...prev, profile: updatedProfile }));
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
