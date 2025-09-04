import NoResults from "@/components/NoResults";
import ReviewCard from "@/components/ReviewCard";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { GetIconByPartialText } from "@/utils/index.utils";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AgentCard = ({
  email,
  image,
  name,
  phone,
}: {
  image: string;
  name: string;
  email: string;
  phone: string;
}) => {
  return (
    <View className=" flex-row justify-between items-center mt-5">
      <View className="flex flex-row gap-4">
        <Image source={{ uri: image }} className="size-14 rounded-full"></Image>
        <View>
          <Text className="text-lg font-rubik-semi-bold text-black">
            {name}
          </Text>
          <Text className="text-base font-rubik-medium text-black-200">
            Owner
          </Text>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <TouchableOpacity>
          <Link href={`mailto:${email}`} asChild>
            <Image source={icons.chat} className="size-6 rounded-full"></Image>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icons.phone} className="size-6 rounded-full"></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DetailSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View className="mt-6 px-4">
      <Text className="text-xl font-rubik-bold text-black-300 mb-4">
        {title}
      </Text>
      {children}
    </View>
  );
};

const IconAndTag = ({
  icon,
  text,
}: {
  icon: ImageSourcePropType;
  text: string;
}) => {
  return (
    <View className="flex-row gap-1 justify-center items-center">
      <View className="flex p-3 bg-primary-100 rounded-full h-14 w-14 justify-center items-center">
        <Image source={icon} className="size-7" />
      </View>
      <Text className="text-base font-rubik-medium text-black-300">{text}</Text>
    </View>
  );
};
const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: { id },
  });

  return (
    <View className="flex-1 bg-white">
      <ScrollView className=" relative flex-1 mb-12">
        <View className="flex-1 pb-32">
          <Image
            source={{ uri: data?.image }}
            className="w-full h-[428px]"
            resizeMode="cover"
          ></Image>
          <View className="flex absolute w-full px-5 flex-row items-center justify-between mt-5">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
            >
              <Image
                source={icons.backArrow}
                className="size-5"
                tintColor={"white"}
              ></Image>
            </TouchableOpacity>
            <View className="flex w-fit flex-row gap-4">
              <TouchableOpacity>
                <Image
                  source={icons.heart}
                  className="size-5"
                  tintColor={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={icons.send}
                  className="size-5"
                  tintColor={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="p-4">
            <Text className="text-xl font-rubik-bold">{data?.name}</Text>
            <View className="flex flex-row gap-1 items-center justify-start">
              <View className="flex rounded-full bg-primary-100 p-1">
                <Text className="text-primary-300 text-base px-2 font-rubik-medium uppercase">
                  {data?.type}
                </Text>
              </View>
              <View className="flex-row rounded-full items-center my-3 bg-primary-100 p-2">
                <Image source={icons.star} className="size-5" />
                <Text className="text-base text-black-300 ml-2 font-rubik-bold">
                  {data?.rating} ({data?.reviews.length.toLocaleString()})
                  {data?.reviews.length! > 1 ? " reviews" : " review"}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-2">
              <IconAndTag
                icon={icons.bed}
                text={`${data?.bedrooms} ${data?.bedrooms! > 1 ? "Beds" : "Bed"}`}
              />
              <IconAndTag
                icon={icons.bath}
                text={`${data?.bathrooms} ${data?.bathrooms! > 1 ? "Baths" : "Bath"}`}
              />
              <IconAndTag icon={icons.area} text={`${data?.area} sqft`} />
            </View>
          </View>
          <DetailSection title="Agent">
            <Text className="text-base font-rubik text-black-200">
              {data?.description}
            </Text>
          </DetailSection>
          <DetailSection title="Overview">
            <AgentCard
              image={data?.agent.avatar ?? ""}
              name={data?.agent.name ?? ""}
              email={data?.agent.email ?? ""}
              phone=""
            />
          </DetailSection>
          <DetailSection title="Facilities">
            <View className=" justify-start flex-row gap-4 flex-wrap">
              {data?.facilities.map((item) => (
                <View key={item} className="gap-1 justify-center items-center">
                  <View className="flex p-3 bg-primary-100 rounded-full h-14 w-14 justify-center items-center">
                    <Image
                      source={GetIconByPartialText(item)}
                      className="size-7"
                    />
                  </View>
                  <Text
                    className="text-base font-rubik text-black-300"
                    numberOfLines={1}
                  >
                    {item.split("-").join(" ")}
                  </Text>
                </View>
              ))}
            </View>
          </DetailSection>
          <DetailSection title="Gallery">
            <FlatList
              data={data?.gallery}
              renderItem={({ item }) => (
                <View className=" overflow-hidden h-[118px] w-[118px]">
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    className="size-full rounded-xl"
                    resizeMode="cover"
                  />
                </View>
              )}
              keyExtractor={(item) => item.$id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-4"
              contentContainerStyle={{
                width: data?.gallery.length ? "auto" : "100%",
              }}
              bounces={false}
              ListEmptyComponent={
                <View className="items-center justify-center w-full">
                  <NoResults
                    imageStyle="w-32 h-32"
                    mainTextStyle="text-xl"
                    mainMessage="No Images Found"
                  />
                </View>
              }
            />
          </DetailSection>
          <DetailSection title="Location">
            <View>
              <View className="flex-row items-center gap-2">
                <Image source={icons.location} className="size-5" />
                <Text className="text-base font-rubik text-black-200">
                  {data?.getLocation ?? data?.address}
                </Text>
              </View>
              <View className="w-full h-[200px]">
                <Image
                  source={images.map}
                  className="size-full"
                  resizeMode="contain"
                />
              </View>
            </View>
          </DetailSection>
          <DetailSection title="Reviews">
            <View className="flex-row justify-between items-center">
              {data?.reviews.length && (
                <View className="flex-row rounded-full items-center my-3  p-2">
                  <Image source={icons.star} className="size-5" />
                  <Text className="text-base text-black-300 ml-2 font-rubik-bold">
                    {data?.rating} ({data?.reviews.length.toLocaleString()}
                    {data?.reviews.length! > 1 ? " reviews" : " review"})
                  </Text>
                </View>
              )}
              {data?.reviews.length! > 1 && (
                <TouchableOpacity>
                  <Text className="text-base font-rubik-medium text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="gap-4">
              {data?.reviews && data?.reviews.length ? (
                data?.reviews
                  .splice(0, 4)
                  .map((item) => <ReviewCard {...item} key={item.$id} />)
              ) : (
                <View className="items-center justify-center w-full">
                  <NoResults
                    imageStyle="w-32 h-32"
                    mainTextStyle="text-xl"
                    mainMessage="No Reviews Found"
                  />
                </View>
              )}
            </View>
          </DetailSection>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 h-[140px] ">
        <View
          style={{
            elevation: Platform.OS === "android" ? 10 : 0,
          }}
          className="flex-row justify-between bg-white bg-red border-x-2 border-t h-full w-full shadow-black-300/20 shadow-lg  px-5 border-primary-200 rounded-t-[2em] py-4"
        >
          <View>
            <Text className="text-xl font-rubik-medium text-black-200">
              PRICE
            </Text>
            <Text className="text-xl text-primary-300 font-rubik-bold text-black-30">
              ${data?.price.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity className="bg-primary-300 rounded-full w-2/3 p-4 h-[50px] justify-center items-center">
            <Text className="text-white text-medium font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
