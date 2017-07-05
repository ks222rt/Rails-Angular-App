Rails.application.routes.draw do
  root :to => redirect('/login')
  get 'users/new'

  resources :users, only: [:new, :create]
  resources :apikeys, only: [:index, :new, :create, :destroy]
  resource :admins, only: [:show, :destroy]
  resources :events, only: [:show]

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy', as: :logout

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      get 'tags' => 'tags#index'
      get 'tags/:id' => 'tags#show'
      get 'tags/:tag_id/events' => 'events#index'
      get 'authenticate' => 'authenticates'

      resource :tags, only: [:show, :index]

      resources :creators, only: [:index, :show, :create, :update, :destroy] do
        resources :events, only: [:index]
      end

      resources :events, only: [:index, :show, :create, :update, :destroy] do
        resources :tags,  only: [:index, :show, :create, :update, :destroy]
      end

    end
  end

end
