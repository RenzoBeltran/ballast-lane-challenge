import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPokemonDetail } from '../services/pokemonService';
import type { PokemonDetail } from '../models/Pokemon';

export const DetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getPokemonDetail(id);
                setPokemon(data);
                setError(null);
            } catch (err) {
                setError('Failed to load pokemon details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) {
         return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
         );
    }

    if (error || !pokemon) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-red-500 text-xl">{error || 'Pokemon not found'}</p>
                <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
            </div>
        );
    }

    // Official artwork if available, else standard
    const heroImage = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

    return (
        <>
             <Helmet>
                <title>{`${pokemon.name.toUpperCase()} | Pokedex`}</title>
                <meta name="description" content={`Details about ${pokemon.name}, stats, abilities and more.`} />
            </Helmet>
            
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-pokemon-blue mb-6 font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="mr-2">←</span> Back to Pokedex
                </Link>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pokemon-red relative">
                    {/* Top Pokedex Bar */}
                    <div className="bg-pokemon-red h-16 flex items-center px-8 border-b-4 border-pokemon-dark">
                         <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white shadow-inner animate-pulse mr-4"></div>
                         <div className="flex gap-2">
                             <div className="w-3 h-3 bg-red-600 rounded-full border border-red-800"></div>
                             <div className="w-3 h-3 bg-yellow-400 rounded-full border border-yellow-600"></div>
                             <div className="w-3 h-3 bg-green-500 rounded-full border border-green-700"></div>
                         </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        {/* Left Side: Image */}
                        <div className="md:w-1/2 p-10 bg-gray-100 flex flex-col items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-gray-300 relative">
                             <div className="absolute top-4 left-6 text-5xl font-black text-gray-200 z-0">
                                 #{pokemon.id.toString().padStart(3, '0')}
                             </div>
                             
                             <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                                 <div className="w-64 h-64 bg-white rounded-full border-8 border-gray-200 flex items-center justify-center shadow-inner">
                                    <img 
                                        src={heroImage} 
                                        alt={pokemon.name} 
                                        className="w-48 h-48 object-contain filter drop-shadow-xl hover:scale-110 transition-transform duration-300"
                                    />
                                 </div>
                             </div>
                             
                              <h1 className="text-4xl font-black capitalize text-gray-800 mt-8 tracking-wide text-center">{pokemon.name}</h1>
                              
                              <div className="flex gap-2 mt-4">
                                  {pokemon.abilities.map((a) => (
                                      <span key={a.ability.name} className="px-4 py-1 bg-pokemon-dark text-white rounded-full text-xs font-bold uppercase tracking-wider">
                                          {a.ability.name}
                                          {a.is_hidden && <span className="text-gray-400 ml-1">(H)</span>}
                                      </span>
                                  ))}
                              </div>
                        </div>
                        
                        {/* Right Side: Stats */}
                        <div className="md:w-1/2 p-8 bg-white">
                            <div className="bg-pokemon-dark text-white p-4 rounded-xl mb-6 shadow-md border-l-8 border-pokemon-yellow">
                                <h2 className="font-bold text-lg mb-4 uppercase tracking-wider text-pokemon-yellow">Data Analysis</h2>
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="flex flex-col">
                                         <span className="text-gray-400 text-xs uppercase">Height</span>
                                         <span className="text-xl font-mono">{pokemon.height / 10} m</span>
                                     </div>
                                     <div className="flex flex-col">
                                         <span className="text-gray-400 text-xs uppercase">Weight</span>
                                         <span className="text-xl font-mono">{pokemon.weight / 10} kg</span>
                                     </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="w-2 h-8 bg-pokemon-blue mr-2 rounded-full"></span>
                                    Base Stats
                                </h2>
                                 <div className="space-y-4">
                                     {pokemon.stats.map((s) => (
                                         <div key={s.stat.name}>
                                             <div className="flex justify-between mb-1 text-sm font-bold text-gray-600 uppercase">
                                                 <span>{s.stat.name.replace('-', ' ')}</span>
                                                 <span>{s.base_stat}</span>
                                             </div>
                                             <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                 <div 
                                                    className="bg-pokemon-blue h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                                                    style={{ width: `${Math.min(s.base_stat, 100)}%` }} 
                                                 >
                                                     <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 animate-pulse"></div>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                            </div>

                            <div className="mt-8">
                                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="w-2 h-8 bg-pokemon-red mr-2 rounded-full"></span>
                                    Move Set
                                </h2>
                                 <div className="flex flex-wrap gap-2 h-32 overflow-y-auto pr-2 custom-scrollbar">
                                     {pokemon.moves.map((m) => (
                                         <span key={m.move.name} className="px-3 py-1 bg-gray-100 text-gray-600 rounded border border-gray-200 text-xs font-bold capitalize hover:bg-pokemon-blue hover:text-white hover:border-pokemon-blue transition-colors cursor-default">
                                             {m.move.name.replace('-', ' ')}
                                         </span>
                                     ))}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
