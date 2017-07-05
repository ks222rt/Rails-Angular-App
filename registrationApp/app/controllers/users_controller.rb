class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_param)

    if @user.save
      log_in @user
      flash[:success] = 'Account created. Welcome to this API'
    else
      render :action => 'new'
    end

  end


  private
  def user_param
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
