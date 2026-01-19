require 'rails_helper'

RSpec.describe 'Pokemon API', type: :request do
  let!(:user) { User.create(username: 'admin', password: 'admin') }

  describe 'POST /pokemon/auth' do
    it 'authenticates user successfully' do
      post '/pokemon/auth', params: { username: 'admin', password: 'admin' }
      json = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(json['success']).to be true
      expect(json['token']).to be_present
    end

    it 'rejects invalid credentials' do
      post '/pokemon/auth', params: { username: 'admin', password: 'wrong' }
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'DELETE /pokemon/logout' do
    it 'logs out successfully' do
      delete '/pokemon/logout'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['message']).to eq('Logged out successfully')
    end
  end

  describe 'GET /pokemon' do
    before do
      allow(PokeApiClient).to receive(:get_pokemon_list).and_return({ results: [] })
    end

    it 'returns pokemon list' do
      get '/pokemon'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq({ 'results' => [] })
    end

    it 'returns pokemon detail when name param is present' do
      allow(PokeApiClient).to receive(:get_pokemon_detail).with('pikachu').and_return({ name: 'pikachu' })
      get '/pokemon', params: { name: 'pikachu' }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq({ 'name' => 'pikachu' })
    end
  end

  describe 'GET /pokemon/:id' do
    before do
      allow(PokeApiClient).to receive(:get_pokemon_detail).with('pikachu').and_return({ name: 'pikachu' })
    end

    it 'returns pokemon detail' do
      get '/pokemon/pikachu'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq({ 'name' => 'pikachu' })
    end
  end
end
