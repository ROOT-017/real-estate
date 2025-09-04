import { categories } from "@/constants/data";
import icons from "@/constants/icons";

export const GetGreetings = () => {
  const date = new Date();
  const hours = date.getHours();
  let greetings;
  if (hours < 12) {
    greetings = "Good Morning";
  } else if (hours < 18) {
    greetings = "Good Afternoon";
  } else {
    greetings = "Good Evening";
  }
  return {
    greetings,
  };
};

export const getFilterTypeTitle = (type: string) => {
  const data = categories.find((item) => item.category === type);

  return data?.title;
};

export const GetIconByPartialText = (text: string) => {
  const icon = { ...icons } as const;
  const keys = Object.keys(icon) as (keyof typeof icon)[];

  for (let i = 0; i < keys.length; i++) {
    if (text.toLowerCase().includes(keys[i].toLowerCase())) {
      return icon[keys[i]];
    }
  }
  return null;
};
