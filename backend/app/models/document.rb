require 'yomu'

class Document < ApplicationRecord
  validates :filename, presence: true
  validates :content_type, presence: true
  validates :file_content, presence: true
  validates :text_content, presence: true

  def initialize(params = {})
    file = params.delete(:file)
    super
    if file
      self.filename = file.original_filename
      self.description = params[:description]

      content = file.read
      self.file_content = content

      text = Yomu.read :text, content
      self.content_type = `file -b #{file.path}`.gsub(/\n/,"")
      self.text_content = text
    end
  end

  def self.search(query)
    where(
      "filename LIKE ? OR description LIKE ? OR text_content LIKE ?",
      "%#{query}%", "%#{query}%", "%#{query}%"
    )
  end
end