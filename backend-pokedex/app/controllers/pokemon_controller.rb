class PokemonController < ApplicationController
  # We might want to skip verify_authenticity_token if this is a stateless API without session cookies
  # But since we use Devise which might use session or not depending on config (we skipped session storage for http_auth but using mock token).
  # For this simple API challenge, we'll skip CSRF for the auth endpoint.
  # skip_before_action :verify_authenticity_token, only: [:auth]

  def auth
    result = AuthService.login(params[:username], params[:password])
    if result[:success]
      sign_in(result[:resource])
      render json: result.except(:resource), status: :ok
    else
      render json: result, status: :unauthorized
    end
  end

  def logout
    sign_out current_user
    render json: { success: true, message: 'Logged out successfully' }, status: :ok
  end

  def index
    # We might want to protect these endpoints too, but the requirement only mentioned auth endpoint returning a token.
    # It didn't explicitly say we must validate the token for GET /pokemon.
    # However, implies "Generate a professional API". Usually requires auth.
    # For now, I will leave it public as per explicit instructions "GET /pokemon ... Usan PokeApiClient".
    # Unless requested, I won't add authentication middleware yet.
    
    limit = params[:limit] || 20
    offset = params[:offset] || 0
    data = PokeApiClient.get_pokemon_list(limit: limit, offset: offset)
    render json: data
  end

  def show
    data = PokeApiClient.get_pokemon_detail(params[:id])
    render json: data
  end
end
