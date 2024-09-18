import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalProvider";

import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import enumToOptions from "@/utility/enumToOptions";

import { icons, activityLevel, gender, apiUrl } from "../constants";
import DropdownComponent from "@/components/DropdownComponent";
import DateInput from "@/components/DateInput";

const Details = () => {
  const [form, setForm] = useState<ParticipantRegister>({
    firstName: "",
    lastName: "",
    email: "",
    activityLevel: activityLevel.SEDENTARY,
    age: -1,
    gender: gender.MALE,
  });

  const [dropdownActivityLevel, setDropdownActivityLevel] =
    useState<null | activityLevel>(null);

  // Must be set to an empty space so the HTML element exists on the page
  // Then when an error is added it doesn't move the DOM elements below it
  const [firstNameError, setFirstNameError] = useState(" ");
  const [lastNameError, setLastNameError] = useState(" ");
  const [emailError, setEmailError] = useState(" ");
  const [dateOfBirthError, setDateOfBirthError] = useState(" ");
  const [genderError, setGenderError] = useState(" ");
  const [activityLevelError, setActivityLevelError] = useState(" ");

  const [isLoading, setIsLoading] = useState(false);
  const { setParticipant } = useContext(GlobalContext);

  useEffect(() => {
    if (!dropdownActivityLevel) return;

    setForm({ ...form, activityLevel: dropdownActivityLevel });
  }, [dropdownActivityLevel]);

  const setAge = (newValue: Date | undefined) => {
    if (newValue == undefined) {
      setForm({ ...form, age: -1 }); // Error
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - newValue.getFullYear();
    const monthDifference = today.getMonth() - newValue.getMonth();

    // Adjust age if the birth date hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < newValue.getDate())
    ) {
      age--;
    }

    setForm({ ...form, age });
  };

  const handleValidation = (): boolean => {
    let success = true;

    if (form.firstName === "") {
      success = false;
      setFirstNameError("Please enter your first name");
    }

    if (form.lastName === "") {
      success = false;
      setLastNameError("Please enter your last name");
    }

    if (form.email === "") {
      success = false;
      setEmailError("Please enter a valid email");
    }

    if (form.age === -1) {
      success = false;
      setDateOfBirthError("Please enter a valid date of birth");
    }

    if (success) {
      setFirstNameError(" ");
      setLastNameError(" ");
      setEmailError(" ");
      setDateOfBirthError(" ");
      setGenderError(" ");
      setActivityLevelError(" ");
    }

    return success;
  };

  const handleSubmit = (): void => {
    setIsLoading(true);

    if (!handleValidation()) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setParticipant({
        ...form,
        id: 0,
        hasAcceptedTerms: false,
      });
    });
    router.navigate("/terms_and_conditions");
  };

  return (
    <SafeAreaView className="bg-background h-full relative">
      <ScrollView>
        <View className="w-full h-full px-4">
          <View className="absolute top-0 left-0 px-4 py-2">
            <Link href={{ pathname: "/" }} asChild>
              <Pressable>
                <Image
                  source={icons.leftArrow}
                  className="h-8 w-8 text-secondary_text"
                  resizeMode="contain"
                />
              </Pressable>
            </Link>
          </View>

          <View className="flex justify-center items-center mt-16 mb-6">
            <Text className="font-bold font-title text-3xl text-primary">
              Start with some details
            </Text>
            <Text className="font-body text-primary">
              It helps us get to know you better!
            </Text>
          </View>

          <View className="my-8 flex justify-center">
            {/* First Name */}
            <Text className="text-primary font-body text-lg py-1">
              First Name
            </Text>
            <FormField<string>
              value={form.firstName}
              placeholder={"John"}
              handleChangeValue={(e) => setForm({ ...form, firstName: e })}
              isPassword={false}
              autocapitalise="words"
            />
            <Text className="text-error mb-4 text-sm">{firstNameError}</Text>

            {/* Last Name */}
            <Text className="text-primary font-body text-lg py-1">
              Last Name
            </Text>
            <FormField<string>
              value={form.lastName}
              placeholder={"Smith"}
              handleChangeValue={(e) => setForm({ ...form, lastName: e })}
              isPassword={false}
              autocapitalise="words"
            />
            <Text className="text-error mb-4 text-sm">{lastNameError}</Text>

            {/* Email */}
            <Text className="text-primary font-body text-lg py-1">
              Email Address
            </Text>
            <FormField<string>
              value={form.email}
              placeholder={"John.Smith@email.com"}
              handleChangeValue={(e) => {
                setForm({ ...form, email: e });
              }}
              keyboardType="email-address"
              isPassword={false}
              helperText="We will keep your email private"
              autocapitalise="none"
            />
            <Text className="text-error mb-4 text-sm">{emailError}</Text>

            {/* Sex */}
            <Text className="text-primary font-body text-lg py-1">Sex</Text>
            <View className="flex-row justify-center items-center gap-4">
              {/* Male */}
              <Pressable
                onPress={() => setForm({ ...form, gender: gender.MALE })}
                className={`flex-1 bg-secondaryContainer px-4 py-5 rounded-md border-2 ${
                  form.gender == gender.MALE
                    ? "border-primary"
                    : "border-secondaryContainer"
                }`}
              >
                <Text className="text-center text-primary font-body">Male</Text>
              </Pressable>
              {/* Female */}
              <Pressable
                onPress={() => setForm({ ...form, gender: gender.FEMALE })}
                className={`flex-1 bg-secondaryContainer px-4 py-5 rounded-md border-2 ${
                  form.gender == gender.FEMALE
                    ? "border-primary"
                    : "border-secondaryContainer"
                }`}
              >
                <Text className="text-center text-primary font-body">
                  Female
                </Text>
              </Pressable>
            </View>
            <Text className="text-error mb-4 text-sm">{genderError}</Text>

            {/* Activity Level */}
            <Text className="text-primary font-body text-lg py-1">
              Activity Level
            </Text>
            <DropdownComponent
              data={enumToOptions(activityLevel)}
              placeholder={"Select your activity level"}
              handleChangeValue={(e) => {
                setDropdownActivityLevel(e);
              }}
            />
            <Text className="text-error mb-6 text-sm">
              {activityLevelError}
            </Text>

            {/* Date of Birth */}
            <Text className="text-primary font-body text-lg py-1">
              Date of Birth
            </Text>
            <DateInput
              handleChangeValue={(newValue: Date) => setAge(newValue)}
              setError={(newError: string) => setDateOfBirthError(newError)}
            />
            <Text className="text-error text-sm">{dateOfBirthError}</Text>

            <CustomButton
              title="Next"
              handlePress={() => handleSubmit()}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
