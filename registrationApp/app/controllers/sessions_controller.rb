class SessionsController < ApplicationController
  def new

  end

  def create

    user = User.find_by(username: params[:session][:username].downcase)

    if user && user.authenticate(params[:session][:password])
      log_in user
    else
      flash.now[:danger] = 'Invalid email or password!'
      render 'new'
    end

  end

  def destroy

    logout

    flash[:success] = "Please come again!"
    redirect_to root_path

  end
end
