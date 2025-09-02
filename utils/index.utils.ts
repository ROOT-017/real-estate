export const GetGreetings = () => {
  const date = new Date();
  const hours = date.getHours();
  let greetings;
  if (hours < 12) {
    greetings = "Good Morning";
  } else if (hours < 18) {
    greetings = "Good Afternoon";
  }
  else {
    greetings = "Good Evening";
  }
  return {
    greetings,
  };
};
