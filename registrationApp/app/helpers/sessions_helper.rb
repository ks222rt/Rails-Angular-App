module SessionsHelper

  def log_in(user)
    session[:user_id] = user.id
    redirect_user
  end

  def logout
    session.delete(:user_id)
    @user_auth = nil
  end

  def redirect_user
    if is_admin?(the_current_user)
      redirect_to admins_path
    else
      redirect_to apikeys_path
    end
  end

  def the_current_user
    @user_auth ||= User.find_by(id: session[:user_id])
  end

  def is_admin?(user)
    if user.roles.any?
      the_current_user.roles.each do |r|
        r.role == "admin"
      end
    end
  end

  def is_user_logged_in?
    !the_current_user.nil?
  end

  def check_user
    unless is_user_logged_in?
      flash[:danger] = "You´ve to log in to access member page"
      redirect_to root_path
    end
  end
end
