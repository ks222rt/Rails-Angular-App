class AdminsController < ApplicationController
  before_action :check_user, only: [:show, :destroy]

  def show
    @user = User.all
  end

  def destroy
    @theUser = User.find_by(id: params[:id])

    if @theUser
      @theUser.destroy
      flash[:success] = "User was removed"
    else
      flash[:danger] = "User didnot exists"
    end

    redirect_to admins_path
  end

end
