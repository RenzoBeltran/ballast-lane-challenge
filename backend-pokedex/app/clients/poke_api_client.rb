class PokeApiClient
  BASE_URL = 'https://pokeapi.co/api/v2'.freeze

  def self.get_pokemon_list(limit: 20, offset: 0)
    response = connection.get('pokemon', { limit: limit, offset: offset })
    handle_response(response)
  end

  def self.get_pokemon_detail(name_or_id)
    response = connection.get("pokemon/#{name_or_id}")
    handle_response(response)
  end

  class << self
    private

    def connection
      @connection ||= Faraday.new(url: BASE_URL) do |conn|
        conn.request :json
        conn.response :json, parser_options: { symbolize_names: true }
        conn.adapter Faraday.default_adapter
      end
    end

    def handle_response(response)
      if response.success?
        response.body
      else
        { error: "PokeAPI Error: #{response.status}", status: response.status }
      end
    end
  end
end
