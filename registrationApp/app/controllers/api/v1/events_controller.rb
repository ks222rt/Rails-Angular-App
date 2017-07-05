module Api
  module V1
    class EventsController < BaseController
      before_action :authenticate_key
      before_action :authenticating_creator, only: [:create, :update, :destroy]
      before_action :define_event, only: [:destroy, :update, :show]
      before_action :limit_offset

      #Shows several events
      def index
        if params[:creator_id].present? && params[:search].present?
          creator_search_events
        elsif params[:creator_id].present?
          creator_events
        elsif params[:tag_id].present?
          tag_events

          if @tag_events
            render json: @tag_events
          end
        else
          all_events
        end
      end

      #Shows one event
      def show
        render json: @event, :include => [:tags]
      end

      #Creates an event
      def create
        event = Event.new(event_params)
        event.creator_id = @creators_id

        if event.save
          render json: event, :include => [:tags], status: :created
        else
          render json: event.errors, status: :service_unavailable
        end

      end

      #Updates an event
      def update
        creator_id = @event.creator_id
        @event.tags.delete_all

        if @creators_id != creator_id
          head :unauthorized
        elsif @event.update(event_params)
          render json: {success: 'Event updated'}, status: :ok
        else
          render json: @event.errors, status: :not_acceptable
        end
      end

      #Deleting an event
      def destroy
        if @creators_id != @event.creator_id
          render json: {error: 'not unauthorized'}, status: :unauthorized
        else
          @event.destroy
          render json: {success: 'event deleted'}, status: :ok
        end
      end

      private
      #Renders events based on lat, long, order or search
      def creator_search_events
        define_creator
        if params[:latitude].present? && params[:longitude].present?
          events = @creator.events.near([params[:latitude].to_f, params[:longitude].to_f], define_range)
          render json: events, status: :ok
        elsif params[:order].present?
          events = @creator.events.limit(@limit).offset(@offset).order(updated_at: params[:order])
          render json: events, status: :ok
        elsif params[:search].present?
          events = @creator.events.where("city = ?", params[:search].downcase).limit(@limit).offset(@offset)
          if events.empty?
            render json: {error: 'No events in that city'}, status: :not_found
          else
            render json: events, status: :ok
          end
        end
      end

      #Renders events based on creator or order
      def creator_events
        define_creator
        if params[:order].present?
          render json: @creator.events.limit(@limit).offset(@offset).order("updated_at ?", params[:order]), status: :ok
        else
          render json: @creator.events.limit(@limit).offset(@offset), status: :ok
        end
      end

      #Renders all events based on long, lat, order or search
      def all_events
        if params[:latitude].present? && params[:longitude].present?
          events = Event.near([params[:latitude], params[:longitude]], define_range).limit(@limit).offset(@offset)
          render json: events, status: :ok
        elsif params[:order].present?
          events = Event.limit(@limit).offset(@offset).order(updated_at: params[:order])
          render json: events, status: :ok
        elsif params[:search].present?
          events = Event.where("city = ?", params[:search].downcase).limit(@limit).offset(@offset)
          if events.empty?
            render json: {error: 'No events in that city'}, status: :not_found
          else
            render json: events, status: :ok
          end
        else
          events = Event.limit(@limit).offset(@offset)
          render json: events, status: :ok
        end
      end

      #Defines an event on param[:id]. Will prevent DRY
      def define_event
        @event = Event.find(params[:id])

      rescue ActiveRecord::RecordNotFound
        render json: {error: 'Couldn´t find the event'}, status: :not_found

      end

      #Defines a creator on param[:creator_id]. Will prevent DRY
      def define_creator
        @creator = Creator.find(params[:creator_id])
      rescue ActiveRecord::RecordNotFound
        render json: {error: 'Creator wasnt found on specified id'}, status: :not_found
      end

      def tag_events
        @tag_events = Tag.find(params[:tag_id]).events

      rescue ActiveRecord::RecordNotFound
        render json: {error: 'Tag wasn´t found'}, status: :not_found
      end

      def define_range
        if params[:range].present?
          params[:range].to_f
        else
          10
        end
      end

      def event_params
        params.require(:event).permit(:name, :address, :zip_code, :city, tags_attributes: [:name])
      end
    end
  end
end