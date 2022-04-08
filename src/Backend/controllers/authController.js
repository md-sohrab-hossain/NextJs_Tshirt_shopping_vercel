//? -- library --
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import absoluteUrl from 'next-absolute-url';
import catchError from '../middlewares/catchAsyncError';
//? -- library --
//? -- components --
import { User } from '../models/user';
import ErrorHandler from '../utils/errorHandler';
import sendEmail from '../utils/sendEmail';
//? -- components --

//* Setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//TODO:----------- Register user =>/api/auth/register ------------//
export const registerUser = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    //? upload images 👇
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'tshirt/avatar',
      width: '150',
      crop: 'scale',
    });

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Account register successfully',
      user,
    });
  } else {
    return next(new ErrorHandler('User already exists with this email', 404));
  }
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: --------------- Cuurent user profile   =>   /api/userInfo ----------------
export const currentUserProfile = catchError(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: ------------ Update user profile   =>   /api/me/update --------------
export const updateProfile = catchError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) user.password = req.body.password;

    if (!user.name) {
      return next(new ErrorHandler('Please enter user name', 404));
    }
    if (!user.email) {
      return next(new ErrorHandler('Please enter user email', 404));
    }
    if (!user.password) {
      return next(new ErrorHandler('user Password Must be larger than 6 character', 404));
    }
  }

  // Update avatar
  if (req.body.avatar !== '') {
    const image_id = user.avatar.public_id;

    // Delete user previous image/avatar
    await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'tshirt/avatar',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});
//*------------------------------❌❌❌---------------------------------*/

//TODO: ---------- Forgot password   =>   /api/password/forgot  ------------
export const forgotPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create reset password url
  const resetUrl = `${origin}/customPages/user/password/reset/${resetToken}`;

  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Tshirt Design Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: -------- Reset password   =>   /api/password/reset/:token -----------
export const resetPassword = catchError(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  // Setup the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: ------------ get All admin user profile   =>   /api/admin/users -------------
export const allAdminUsers = catchError(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: ------------ Get user details  =>   /api/admin/users/:id -------------
export const getUserDetails = catchError(async (req, res, next) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler('User not found with this ID.', 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
//*------------------------------❌❌❌--------------------------------- */

//TODO:------------ Update user details  =>   /api/admin/users/:id ----------
export const updateUser = catchError(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.query.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: ------------- Delete user    =>   /api/admin/users/:id -------------
export const deleteUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler('User not found with this ID.', 400));
  }
  if (user.role == 'admin') {
    return next(new ErrorHandler("Can't delete user admin!!", 400));
  }

  // Remove avatar
  const image_id = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await user.remove();

  res.status(200).json({
    success: true,
    user,
  });
});
//*------------------------------❌❌❌--------------------------------- */
