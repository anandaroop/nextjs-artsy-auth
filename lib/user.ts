export interface UserSessionData {
  email: string;
  roles: string[];
  labFeatures: string[];
  lastSignInAt: string;
  accessToken: string;
}

export async function findUser({ username, password, otp }) {
  const accessToken = await getGravityAccessToken({ username, password, otp });
  const userProfile = await getUserProfile(accessToken);

  return {
    ...userProfile,
    accessToken,
  };
}

const getGravityAccessToken = async ({ username, password, otp }) => {
  const response = await fetch(
    `${process.env.GRAVITY_URL}/oauth2/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_APPLICATION_ID,
        client_secret: process.env.CLIENT_APPLICATION_SECRET,
        grant_type: "credentials",
        email: username,
        password: password,
        otp_attempt: otp,
      }),
    }
  );
  const json = await response.json();

  if (response.ok) {
    return json.access_token;
  } else {
    const errorMessage = [response.statusText, json.error_description].join(
      ": "
    );
    throw new Error(errorMessage);
  }
};

const getUserProfile = async (accessToken) => {
  const response = await fetch(`${process.env.GRAVITY_URL}/api/v1/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
  });

  const user = await response.json();
  const { email, roles, lab_features, last_sign_in_at } = user;

  return {
    email,
    roles,
    labFeatures: lab_features,
    lastSignInAt: last_sign_in_at,
  };
};
