import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePokemonStore } from '../stores/usePokemonStore';
import { PokemonCard } from '../components/PokemonCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const { 
        pokemons, 
        isLoading, 
        error, 
        fetchPokemons, 
        setSortBy, 
        sortBy, 
        offset,
        limit,
        setPage,
        count
    } = usePokemonStore();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');


    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // We should keep the initial fetch.
    useEffect(() => {
        fetchPokemons();
    }, []);

    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    const handleNext = () => {
        if (currentPage < totalPages) setPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setPage(currentPage - 1);
    };

    return (
        <>
            <Helmet>
                <title>Pokedex | Home</title>
                <meta name="description" content="Browse the complete Pokedex." />
            </Helmet>
            
            <div className="min-h-screen">
                {/* Pokedex Header */}
                <header className="bg-pokemon-red shadow-lg sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                {/* Pokedex 'Camera' Light */}
                                <div className="w-10 h-10 bg-blue-400 rounded-full border-4 border-white shadow-inner animate-pulse"></div>
                                <h1 className="text-3xl font-bold text-white tracking-wider drop-shadow-md">POKEDEX</h1>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="w-full md:w-64">
                                        <Input 
                                            placeholder="Search Pokemon..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="bg-white/90 border-none shadow-inner"
                                        />
                                    </div>
                                    <Button 
                                        className="!bg-pokemon-blue !text-white font-bold shadow-md hover:!bg-blue-700"
                                    >
                                        Search
                                    </Button>
                                </div>
                                
                                <div className="flex gap-2 bg-pokemon-dark p-1 rounded-lg">
                                     <Button 
                                        variant={sortBy === 'id' ? 'primary' : 'secondary'}
                                        onClick={() => setSortBy('id')}
                                        className={sortBy === 'id' ? "!bg-pokemon-yellow !text-pokemon-dark font-bold" : "!bg-transparent !text-gray-400"}
                                     >
                                        #ID
                                     </Button>
                                     <Button 
                                        variant={sortBy === 'name' ? 'primary' : 'secondary'}
                                        onClick={() => setSortBy('name')}
                                        className={sortBy === 'name' ? "!bg-pokemon-yellow !text-pokemon-dark font-bold" : "!bg-transparent !text-gray-400"}
                                     >
                                        AZ
                                     </Button>
                                </div>

                                <Button 
                                    onClick={handleLogout}
                                    className="!bg-pokemon-yellow !text-pokemon-dark font-bold shadow-md hover:!bg-yellow-400 ml-2"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {error && (
                        <div className="text-center text-red-500 py-8 bg-white/80 rounded-xl shadow-sm max-w-lg mx-auto">
                            <p className="font-bold text-xl mb-2">Error</p>
                            {error}
                        </div>
                    )}

                    {isLoading && pokemons.length === 0 ? (
                         <div className="flex justify-center items-center py-40">
                             <div className="relative w-20 h-20 animate-spin">
                                <div className="absolute w-full h-1/2 bg-pokemon-red rounded-t-full top-0 border-4 border-pokemon-dark border-b-2"></div>
                                <div className="absolute w-full h-1/2 bg-white rounded-b-full bottom-0 border-4 border-pokemon-dark border-t-2"></div>
                                <div className="absolute w-4 h-4 bg-white rounded-full border-4 border-pokemon-dark top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                             </div>
                        </div>
                    ) : (
                        <>
                            {pokemons.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && !isLoading ? (
                                <div className="text-center py-20 text-gray-500 bg-white/50 rounded-xl p-10">
                                    <p className="text-xl">No Pokemon found matching "{searchTerm}".</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {pokemons
                                        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((p) => (
                                        <PokemonCard key={p.id} pokemon={p} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center items-center gap-6">
                                <Button 
                                    onClick={handlePrev} 
                                    disabled={currentPage === 1 || isLoading}
                                    className="!bg-pokemon-dark hover:!bg-black px-8"
                                >
                                    Previous
                                </Button>
                                <span className="text-pokemon-dark font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                                    {currentPage} / {totalPages || 1}
                                </span>
                                <Button 
                                    onClick={handleNext} 
                                    disabled={currentPage >= totalPages || isLoading}
                                    className="!bg-pokemon-dark hover:!bg-black px-8"
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
};
