Rails.application.routes.draw do
  devise_for :users

  resources :pokemon, only: [:index, :show] do
    collection do
      post :auth
      delete :logout
    end
  end
end
