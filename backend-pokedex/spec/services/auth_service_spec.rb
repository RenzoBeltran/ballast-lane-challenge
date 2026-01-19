require 'rails_helper'

RSpec.describe AuthService do
  let!(:user) { User.create(username: 'admin', password: 'admin') }

  describe '.login' do
    context 'with valid credentials' do
      it 'returns success and a token' do
        result = AuthService.login('admin', 'admin')
        expect(result[:success]).to be true
        expect(result[:token]).to be_present
        expect(result[:resource]).to eq(user)
        expect(result[:user]).to include(username: 'admin')
      end
    end

    context 'with invalid username' do
      it 'returns error' do
        result = AuthService.login('wrong', 'admin')
        expect(result[:success]).to be false
        expect(result[:error]).to eq('Credenciales inválidas')
      end
    end

    context 'with invalid password' do
      it 'returns error' do
        result = AuthService.login('admin', 'wrongpass')
        expect(result[:success]).to be false
        expect(result[:error]).to eq('Credenciales inválidas')
      end
    end
  end
end
