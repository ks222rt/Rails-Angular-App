module Api
  module V1
    class CreatorsController < BaseController
      before_action :authenticate_key
      before_action :limit_offset
      before_action :define_creator, only: [:show]

      def index
        render json: Creator.all.limit(@limit).offset(@offset), status: :ok
      end

      def show
        render json: @creator, status: :ok
      end

      def create
        creator = Creator.new(creator_params)
        if creator.save
           render json: creator, status: :created
        else
           render json: creator.errors, status: :bad_request
        end
      end

      private

      #Defines a creator on param[:creator_id]. Will prevent DRY
      def define_creator
        @creator = Creator.find_by(username: params[:id])

      rescue ActiveRecord::RecordNotFound
        render json: {error: 'Creator wasnt found on specified id'}, status: :not_found
      end

      def creator_params
        params.require(:creator).permit(:firstname, :lastname, :username, :password)
      end

    end
  end
end