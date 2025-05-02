const auth0 = require('../config/auth0Client');
const User = require('../models/User');

exports.getUserInfo = async (userId) => {
  try {
    console.log('Fetching user info for ID:', userId);
    const userInfoResponse = await auth0.users.get({ id: userId });
    const userInfo = userInfoResponse.data;

    console.log('User Info from Auth0:', userInfo);

    await User.findOneAndUpdate(
      { userId: userInfo.user_id },
      {
        name: userInfo.name,
        email: userInfo.email,
        contactNumber: userInfo.user_metadata?.contactNumber || null,
      },
      { upsert: true, new: true }
    );
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

exports.updateOrDeleteUserMetadata = async (userId, metadata) => {
  try {
    const updatedMetadata = {};
    for (const key in metadata) {
      updatedMetadata[key] = metadata[key] === null ? null : metadata[key];
    }

    const updatedUserResponse = await auth0.users.update(
      { id: userId },
      { user_metadata: updatedMetadata }
    );
    const updatedUser = updatedUserResponse;

    await User.findOneAndUpdate(
      { userId },
      { contactNumber: updatedMetadata.contactNumber || null },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating/deleting user metadata:', error);
    throw error;
  }
};

// exports.deleteUser = async (userId, token) => {
//   const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`;
//   try {
//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     await User.findOneAndDelete({ userId: userId });
//     return await response.json();
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw error;
//   }
// };

// exports.deleteUser = async (userId) => {
//   try {
//     await auth0.deleteUser({ id: userId });

//     await User.findOneAndDelete({ userId });

//     return { message: 'User deleted successfully from Auth0 and database' };
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw error;
//   }
// };
