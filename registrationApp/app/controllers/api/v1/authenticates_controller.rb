module Api
  module V1
    class AuthenticatesController < BaseController
      before_action :authenticate_key

      def authenticate
        creator = Creator.find_by_username(request.headers['username'])

        if creator && creator.authenticate(request.headers['password'])
          render json: {auth_token: encode_the_jwt(creator) }, status: :ok
        else
          render json: {error: 'Wrong password or username'}, status: :unauthorized
        end
      end

    end
  end
end