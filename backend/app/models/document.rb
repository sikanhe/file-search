require 'yomu'

class Document < ApplicationRecord
  def initialize(params = {})
    file = params.delete(:file)
    super
    if file
      self.filename = file.original_filename
      self.description = params[:description]

      content = file.read
      self.file_content = content

      text = Yomu.read :text, content
      metadata = Yomu.read :metadata, content
      self.content_type = metadata['Content-Type']
      self.text_content = text
    end
  end
end