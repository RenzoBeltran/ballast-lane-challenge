import type { PokemonListItem } from '../models/Pokemon';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  className?: string; // Optional if we want to extend
}

export const PokemonCard = ({ pokemon, className }: PokemonCardProps) => {
  // Format ID to 3 digits like #001
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={cn("block group", className)}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-pokemon-blue relative">
        <div className="absolute top-2 right-2 text-xs font-bold text-gray-300 group-hover:text-pokemon-blue transition-colors z-10">{formattedId}</div>
        
        <div className="w-full aspect-square bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
             {/* Background Circle */}
             <div className="absolute w-32 h-32 bg-white rounded-full opacity-50 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
             
             <img 
               src={pokemon.image} 
               alt={pokemon.name}
               className="w-3/4 h-3/4 object-contain z-10 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm"
               loading="lazy"
             />
        </div>
        
        <div className="p-4 text-center">
            <h3 className="capitalize font-bold text-lg text-gray-800 group-hover:text-pokemon-blue transition-colors">{pokemon.name}</h3>
        </div>
      </div>
    </Link>
  );
};
