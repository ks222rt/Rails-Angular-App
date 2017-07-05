module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session
      include Api::V1::AuthenticatesHelper

      OFFSET = 0
      LIMIT = 15

      def limit_offset
        if params[:offset].present?
          @offset = params[:offset].to_i
        end

        if params[:limit].present?
          @limit = params[:limit].to_i
        end

        @offset ||= OFFSET
        @limit ||= LIMIT
      end

      private

      def authenticate_key
        restrict_access || render_unauthorized
      end

      def render_unauthorized
        self.headers['WWW-Authenticate'] = 'Token realm="Application"'
        render json: 'Bad credentials. API-key not valid', status: 401
      end

      def restrict_access
        authenticate_with_http_token do |token, options|
          Apikey.find_by(key: token)
        end
      end

      def authenticating_creator
        if request.headers['authtoken'].present?
          auth_token = request.headers['authtoken'].split(' ').last
          token = decode_the_jwt(auth_token)

          if token
            @creators_id = token[0]['creator_id']
          else
            render json: { error: 'The specified token wasn´t correct'}, :status =>  :bad_request
          end

        else
          render json: {error: 'You need to pass an auth token in the header'}, :status => :forbidden
        end
      end
    end
  end
end