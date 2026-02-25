import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = location.state?.from?.pathname || '/adm/painel';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Usuário e senha são obrigatórios.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      await login(username, password, redirectTo);
    } catch (error) {
      setErrorMessage(error.message || 'Credenciais inválidas.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050608] p-4 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        <div className="mb-8 flex cursor-pointer justify-center" onClick={() => navigate('/')}>
          <img
            src="/logo-header.webp"
            alt="Nava Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <Card className="border-white/5 bg-[#0d0f12] shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-center text-2xl font-bold tracking-tight text-white">
              Acesso Administrativo
            </CardTitle>
            <CardDescription className="text-center text-zinc-500">
              Gerencie seus produtos e conteúdos.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="ml-1 text-zinc-400">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-white/10 bg-zinc-900/50 text-white transition-all focus:border-red-500 focus:ring-red-500/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="ml-1 text-zinc-400">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-white/10 bg-zinc-900/50 text-white transition-all focus:border-red-500 focus:ring-red-500/50"
                  required
                />
              </div>

              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md border border-red-400/20 bg-red-400/10 py-2 text-center text-sm font-medium text-red-400"
                >
                  {errorMessage}
                </motion.p>
              )}

              <Button
                type="submit"
                className="h-12 w-full bg-white text-base font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Autenticando...
                  </div>
                ) : (
                  'Entrar no Painel'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} Nava Colorist. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
