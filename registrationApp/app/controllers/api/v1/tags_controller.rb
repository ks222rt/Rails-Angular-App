module Api
  module V1
    class TagsController < BaseController
      before_action :authenticate_key
      before_action :authenticating_creator, only: [:create, :destroy]
      before_action :define_tag, only: [:show, :destroy]
      before_action :limit_offset

      def index
        if params[:event_id].present?
          define_event
          render json: @event.tags.limit(@limit).offset(@offset), status: :ok
        else
          render json: Tag.all.limit(@limit).offset(@offset), status: :ok
        end
      end

      def show
        render json: @tag, status: :ok
      end

      def create
        tag = Tag.find_by_name(tag_params['name'])
        event = Event.find(params[:event_id])

        if tag.nil?
          tag = Tag.new(tag_params)
          if tag.save
            event.tags << tag
            render json: tag, status: :created
          else
            render json: tag.errors, status: :bad_request
          end
        else
          event.tags << tag
          render json: tag, status: :created
        end
      end

      def destroy
        @tag.destroy
        render json: {success: 'Tag deleted'}, status: :ok
      end

      private

      def tag_params
        params.require(:tag).permit(:name)
      end

      def define_tag
        @tag = Tag.find(params[:id])

      rescue ActiveRecord::RecordNotFound
        render json: {error: 'Couldnt find the tag'}, status: :not_found
      end

      def define_event
        @event = Event.find(params[:event_id])

      rescue ActiveRecord::RecordNotFound
        render json: {error: 'Event wasnt found on specified id'}, status: :not_found
      end
    end
  end
end