class DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :update, :destroy]

  # GET /documents
  # GET /documents.json
  def index
    query = search_params["search"]
    if query
      @documents = Document.where("filename LIKE ? OR description LIKE ? OR text_content LIKE ?", "%#{query}%", "%#{query}%", "%#{query}%")
    else
      @documents = Document.all
    end
  end

  # GET /documents/1
  # GET /documents/1.json
  def show
    send_data(@document.file_content,
              type: @document.content_type,
              filename: @document.filename)
  end

  # POST /documents
  # POST /documents.json
  def create
    @document = Document.new(document_params)

    if @document.save
      render :show, status: :created, location: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /documents/1
  # PATCH/PUT /documents/1.json
  # def update
  #   if @document.update(document_params)
  #     render :show, status: :ok, location: @document
  #   else
  #     render json: @document.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /documents/1
  # DELETE /documents/1.json
  def destroy
    @document.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def document_params
      params.require('document').permit(:file, :description)
    end

    def search_params
      params.permit('search')
    end
end
