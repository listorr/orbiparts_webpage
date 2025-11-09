import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2, Lock, Mail, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Redirect si ya está autenticado
  useEffect(() => {
    if (user) {
      // Redirigir a Quote Hub si viene del login
      const from = location.state?.from;
      if (from === 'quote-hub') {
        window.location.href = 'https://quote.orbiparts.com';
      } else {
        navigate('/');
      }
    }
  }, [user, navigate, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Invalid credentials. Please try again.",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "Successfully logged in. Redirecting to Quote Hub...",
        });
        
        // Get the session token to pass to Quote Hub
        const { data: { session } } = await supabase.auth.getSession();
        
        // Esperar un momento para que el toast sea visible
        setTimeout(() => {
          if (session?.access_token) {
            // Pass the access token as a hash parameter for Quote Hub to read
            window.location.href = `https://quote.orbiparts.com#access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
          } else {
            window.location.href = 'https://quote.orbiparts.com';
          }
        }, 1500);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Employee Login | ORBIPARTS</title>
        <meta name="description" content="Employee portal login for ORBIPARTS Quote Hub" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djEyaDEyVjE2SDM2em0xMiAxMmgxMnYxMkg0OFYyOHptMCAxMnYxMmgxMlY0MEg0OHptLTEyIDEydjEyaDEyVjUySDM2em0tMTItMTJ2MTJoMTJWNDBIMjR6bTAgMEgxMlYyOGgxMnYxMnptMC0yNFYxNmgxMnYxMkgyNHptMTItMTJ2MTJoMTJWMTZIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Employee Portal</h1>
            <p className="text-blue-200">ORBIPARTS Quote Hub Access</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Sign In
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the Quote Hub
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="employee@orbiparts.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <div className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      After login, you'll be redirected to{' '}
                      <span className="font-semibold">quote.orbiparts.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Sign In to Quote Hub
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>For employee access only</p>
                  <p className="text-xs mt-1">
                    Need help?{' '}
                    <a href="/contact" className="text-blue-600 hover:underline">
                      Contact IT Support
                    </a>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-200"
            >
              ← Back to Homepage
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default EmployeeLogin;
