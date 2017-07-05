class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :urls

  def urls
    {
        self: api_v1_path(object.id)
    }
  end
end
