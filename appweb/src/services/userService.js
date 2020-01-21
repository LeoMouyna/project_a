const baseProfilePicturePath = "files/user/profile_picture/";

export default {
  profilePictureUrl(user) {
    return baseProfilePicturePath + user.profile_pic_url;
  }
};
