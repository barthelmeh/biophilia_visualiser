import { useContext, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import CheckBox from "expo-checkbox";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import getInstance from "@/services/SetAxiosHeaders";
import { GlobalContext } from "@/context/GlobalProvider";
import { apiUrl } from "@/constants";
import { activityLevel, gender } from "@/constants";
import { AxiosError } from "axios";
import { ErrorToast, SuccessToast } from "@/components/ToastComponents";

const TermsConditions = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { participant, setParticipant } = useContext(GlobalContext);

  const handleSubmit = () => {
    if (participant == null) {
      return;
    }
    const axios = getInstance(null);

    // Update the form
    let activityLevelStringValue:
      | "SEDENTARY"
      | "LIGHTLYACTIVE"
      | "MODERATELYACTIVE"
      | "VERYACTIVE" = "SEDENTARY";
    switch (participant.activityLevel) {
      case activityLevel.SEDENTARY:
        activityLevelStringValue = "SEDENTARY";
        break;
      case activityLevel.LIGHTLYACTIVE:
        activityLevelStringValue = "LIGHTLYACTIVE";
        break;
      case activityLevel.MODERATELYACTIVE:
        activityLevelStringValue = "MODERATELYACTIVE";
        break;
      case activityLevel.VERYACTIVE:
        activityLevelStringValue = "VERYACTIVE";
        break;
    }

    let genderStringValue: "MALE" | "FEMALE" = "MALE";
    switch (participant.gender) {
      case gender.MALE:
        genderStringValue = "MALE";
        break;
      case gender.FEMALE:
        genderStringValue = "FEMALE";
        break;
    }

    axios
      .post(`${apiUrl}/participant`, {
        ...participant,
        activityLevel: activityLevelStringValue,
        gender: genderStringValue,
        hasAcceptedTerms: isChecked,
      })
      .then(
        (_) => {
          setTimeout(() => {
            setParticipant(null);
          }, 0);
          SuccessToast("Created participant");
          router.navigate("/all_done");
        },
        (error) => {
          handleSubmitError(error as AxiosError);
        }
      );
  };

  const handleSubmitError = (error: AxiosError): void => {
    if (error.response?.status === 422) {
      ErrorToast(
        "Unable to insert participant. This may be due to a faulty connection."
      );
    } else {
      ErrorToast(
        error.response?.statusText ?? "Unable to communicate with server."
      );
    }
  };

  return (
    <SafeAreaView className="bg-background h-full relative">
      <ScrollView>
        <View className="w-full h-full px-4">
          <View className="flex justify-center items-center my-16">
            <Text className="font-bold font-title text-3xl text-primary">
              Terms and Conditions
            </Text>
            <Text className="font-body text-primary">
              Please make sure you read the terms and conditions
            </Text>
          </View>

          <View>
            <Text className="text-text font-body">
              Placeholder for the terms and conditions document
            </Text>
          </View>

          <View className="flex flex-row gap-4 mt-8 mb-6 items-center">
            <CheckBox
              value={isChecked}
              onValueChange={(e) => setIsChecked(e)}
            />
            <Text className="text-xs text-text font-body">
              I confirm that I have read and accept the Terms and Conditions
            </Text>
          </View>

          <CustomButton
            title={"Next"}
            isLoading={false}
            disabled={!isChecked}
            handlePress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsConditions;
