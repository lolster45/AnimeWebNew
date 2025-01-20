import admin from 'firebase-admin';
//import serviceAccount from '../src/config/animenew-82be3-firebase-adminsdk-n1b4n-a274c53847.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: 'service_account',
      project_id: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      private_key_id: import.meta.env.VITE_FIREBASE_PRIVATE_KEY_ID,
      private_key: import.meta.env.VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
      client_email: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
      client_id: import.meta.env.VITE_FIREBASE_CLIENT_ID,
      auth_uri: import.meta.env.VITE_FIREBASE_AUTH_URI,
      token_uri: import.meta.env.VITE_FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: import.meta.env.VITE_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: import.meta.env.VITE_FIREBASE_CLIENT_X509_CERT_URL,
    }
    ),
  });
}

// Helper function to enable/disable a user
const enableDisableUser = async (uid, accStatus) => {
  try {
    await admin.auth().updateUser(uid, { disabled: !accStatus });
    console.log(`Account status changed from ${accStatus} to ${!accStatus}`);
    return { status: 'success' };
  } 
  catch (error) {
    console.error('Error disabling user:', error);
    return { status: 'error' };
  }
};

// Helper function to fetch users
const fetchUsers = async () => {
  try {
    const userRecords = await admin.auth().listUsers();
    return userRecords.users.map(user => ({
      id: user.uid,
      email: user.email,
      disabled: user.disabled,
    }));
  } 
  catch (error) {
    console.error('Error fetching users from Firebase', error);
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { uid, accStatus } = req.body;
    const result = await enableDisableUser(uid, accStatus);

    if (result.status === 'success') {
      return res.status(200).json({ status: true });
    } 
    else {
      return res.status(500).json({ status: false });
    }
  } 
  else if (req.method === 'GET') {
    const users = await fetchUsers();

    if (users) {
      return res.status(200).json(users);
    } 
    else {
      return res.status(500).send('Internal Server Error');
    }
  } 
  else {
    return res.status(405).send('Method Not Allowed');
  }
}
