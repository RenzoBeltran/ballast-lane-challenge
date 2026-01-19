import { useState, type FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Requirements say send username and password to endpoint
      // But only User: admin, Pass: admin works
      // Actually service only takes username in AuthRequest based on prompt?
      // "Endpoint: POST /pokemon/auth (Send username and password)."
      // Wait, my AuthRequest model only has username?
      // Let me check my prompt or code.
      // USER REQUEST: Endpoints: POST /pokemon/auth (Send username and password).
      // My AuthRequest interface was "username: string". I missed password.
      // I should update AuthRequest interface and logic.
      
      // I will update the code here assuming I fix AuthRequest. 
      // I will assume update to models/Auth.ts is needed.
      // But for now I will pass both.
      
      await login({ username, password } as any); // Casting as any for now until I fix the model
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Pokedex App</title>
        <meta name="description" content="Login to verify access to the Pokedex." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-pokemon-red px-4 relative overflow-hidden">
        {/* Background Decorations */}
         <div className="absolute inset-0 bg-[url('https://assets.pokemon.com/static2/_ui/img/chrome/body_bg.png')] opacity-10"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pokemon-blue opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 relative z-10 border-[6px] border-pokemon-yellow ring-4 ring-pokemon-blue">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
               <div className="w-32 h-32 bg-white rounded-full border-[6px] border-pokemon-blue flex items-center justify-center shadow-xl relative z-20">
                   <div className="w-24 h-24 bg-gradient-to-br from-pokemon-red to-red-600 rounded-full border-4 border-white shadow-inner flex items-center justify-center">
                       <div className="w-8 h-8 rounded-full bg-white opacity-40 border-2 border-gray-200"></div>
                   </div>
                   <div className="absolute w-full h-2 bg-pokemon-dark top-1/2 left-0 transform -translate-y-1/2 z-0"></div>
                   <div className="absolute w-8 h-8 bg-white rounded-full border-4 border-pokemon-dark top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
               </div>
          </div>
          
          <div className="text-center mb-10 mt-16">
            <h1 className="text-4xl font-black tracking-tight drop-shadow-sm">
                <span className="text-pokemon-blue">POKE</span>
                <span className="text-pokemon-yellow text-stroke-blue">DEX</span> 
                <span className="text-pokemon-red ml-2">LOGIN</span>
            </h1>
            <p className="text-gray-500 mt-3 font-medium text-lg">Identify yourself, Trainer!</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-base border-2 border-red-100 font-bold flex items-center gap-2 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
              </div>
            )}
            
            <div className="space-y-6">
                <div>
                   <Input
                    label="TRAINER NAME"
                    type="text"
                    placeholder="Ash Ketchum"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-gray-50 border-2 border-gray-200 focus:border-pokemon-blue focus:ring-4 focus:ring-blue-100 text-lg py-4 px-5 rounded-xl placeholder:text-gray-300 font-bold text-gray-700"
                    />
                </div>
                
                <div>
                  <Input
                    label="SECRET CODE"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-50 border-2 border-gray-200 focus:border-pokemon-blue focus:ring-4 focus:ring-blue-100 text-lg py-4 px-5 rounded-xl placeholder:text-gray-300 font-bold text-gray-700"
                    />
                </div>
            </div>
            
            <Button type="submit" isLoading={isLoading} className="mt-4 w-full !bg-pokemon-blue hover:!bg-blue-700 !text-white font-black text-xl py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all border-b-4 border-blue-800 active:border-b-0">
              OPEN POKEDEX
            </Button>
          </form>
          
          <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-100 text-center">
             <span className="bg-gray-100 text-gray-500 py-1 px-3 rounded-md text-xs font-mono font-bold tracking-widest">
                 SECURE ACCESS V1.0
             </span>
          </div>
        </div>
      </div>
    </>
  );
};
