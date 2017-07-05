module Api
  module V1
    module AuthenticatesHelper

      def encode_the_jwt(creator, exp = 5.hours.from_now)
        payload = { creator_id: creator.id}
        payload[:exp] = exp.to_i

        JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
      end

      def decode_the_jwt(token)
        decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, 'HS256')

        if decoded[0]['exp'] >= Time.now.to_i
          decoded
        else
          false
        end

      rescue JWT::DecodeError
        render json: {error: 'The auth-token is wrong, bad bad person!'}, status: :forbidden

      end

    end
  end
end