const mailchimpTX = require("@mailchimp/mailchimp_transactional")(
  "342d431a32ccf3be01c97a8371978c42-us14"
);

const message = {
  from_email: "samijiyemi@gmail.com",
  subject: "Welcome to Task Manager Application",
  text: `Hi welcome to task manager application we love to see you later`,
  to: [
    {
      email: "ijiyemidamilare1@gmail.com",
      type: "to",
    },
  ],
};

const sendWelcomeEmail = async () => {
  try {
    const response = mailchimpTX.messages
      .send({
        message,
      })
      .then((responseData) => {
        console.log(responseData.response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log({ message: e.message });
  }
};

sendWelcomeEmail();
