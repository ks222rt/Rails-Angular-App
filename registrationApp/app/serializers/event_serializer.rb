class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :zip_code, :city, :latitude, :longitude, :urls
  has_many :tags, serializer: TagSerializer
  has_one :creator, serializer: CreatorSerializer

  def urls
    {
        self: api_v1_event_path(object.id),
        creator: api_v1_creator_path(object.creator.id),
        tags: api_v1_event_tags_path(object.id)
    }
  end

end
