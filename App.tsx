import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

type Screen = "welcome" | "add" | "success" | "menu";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

type Errors = {
  dishName?: string;
  description?: string;
  course?: string;
  price?: string;
};

const COURSES = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
];

/* ========================
   STYLES
   ========================= */

const styles = StyleSheet.create({
  welcomeSafe: {
    flex: 1,
    backgroundColor: "#090909",
  },

  welcomeScreen: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#090909",
  },

  welcomeEyebrow: {
    color: "#F2E99E",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 22,
  },

  welcomeDivider: {
    width: 65,
    height: 3,
    backgroundColor: "#F2E99E",
    marginBottom: 30,
  },

  welcomeTitle: {
    color: "#F6E9A8",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 4,
    textAlign: "center",
  },

  welcomeSubtitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },

  welcomeDescription: {
    color: "#BDBDBD",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 38,
  },

  startButton: {
    width: "100%",
    maxWidth: 300,
    height: 54,
    backgroundColor: "#F2E99E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },

  startButtonText: {
    color: "#191919",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2,
  },

  welcomeFooter: {
    color: "#777777",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 45,
  },

  addSafe: {
    flex: 1,
    backgroundColor: "#090909",
  },

  addScreen: {
    flexGrow: 1,
    backgroundColor: "#090909",
    paddingHorizontal: 24,
    paddingVertical: 35,
    justifyContent: "center",
  },

  formBox: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingVertical: 15,
  },

  addTitle: {
    color: "#F6E9A8",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 5,
  },

  addSubtitle: {
    color: "#D7D1C7",
    fontSize: 13,
    marginBottom: 28,
  },

  label: {
    color: "#F5F0E8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 13,
    letterSpacing: 0.5,
  },

  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    borderRadius: 2,
    color: "#FFFFFF",
    paddingHorizontal: 13,
    fontSize: 15,
    backgroundColor: "#121212",
  },

  descriptionInput: {
    height: 82,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  inputError: {
    borderColor: "#E66D6D",
  },

  error: {
    color: "#F38B8B",
    fontSize: 11,
    marginTop: 5,
  },

  dropdown: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    borderRadius: 2,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121212",
  },

  placeholderText: {
    color: "#AFAFAF",
    fontSize: 14,
  },

  selectedText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  dropdownOptions: {
    borderWidth: 1,
    borderColor: "#777",
    backgroundColor: "#1B1B1B",
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#343434",
  },

  optionText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  priceBox: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  rand: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    paddingLeft: 13,
  },

  priceInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingHorizontal: 9,
    fontSize: 15,
  },

  saveButton: {
    height: 52,
    backgroundColor: "#F2E99E",
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },

  saveText: {
    color: "#191919",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  viewButton: {
    height: 48,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#F2E99E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },

  viewText: {
    color: "#F2E99E",
    fontSize: 13,
    fontWeight: "800",
  },

  /* SUCCESS */

  successSafe: {
    flex: 1,
    backgroundColor: "#F7F2E8",
  },

  successScreen: {
    flex: 1,
    paddingHorizontal: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  successHeading: {
    color: "#25283A",
    fontSize: 25,
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: 18,
  },

  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F4C9",
    marginBottom: 20,
  },

  check: {
    color: "#A6D84A",
    fontSize: 65,
    fontWeight: "300",
    marginTop: -6,
  },

  savedTitle: {
    color: "#55596D",
    fontSize: 19,
    marginBottom: 28,
  },

  savedText: {
    color: "#737689",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 38,
  },

  darkButton: {
    width: "100%",
    maxWidth: 340,
    height: 50,
    backgroundColor: "#4A506B",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  darkButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  /* MENU */

  menuSafe: {
    flex: 1,
    backgroundColor: "#090909",
  },

  menuScreen: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#090909",
  },

  menuEyebrow: {
    color: "#F2E99E",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 15,
  },

  menuTitle: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "800",
    marginTop: 5,
  },

  menuSubtitle: {
    color: "#A8A8A8",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 25,
  },

  noItems: {
    borderWidth: 1,
    borderColor: "#4A4A4A",
    padding: 25,
    alignItems: "center",
  },

  noItemsTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  noItemsText: {
    color: "#A8A8A8",
    marginTop: 7,
    textAlign: "center",
  },

  menuCard: {
    backgroundColor: "#F7F2E8",
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F2E99E",
  },

  menuCardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuNumber: {
    color: "#4A506B",
    fontWeight: "900",
    fontSize: 14,
    width: 25,
  },

  menuNameArea: {
    flex: 1,
  },

  menuDish: {
    color: "#24252D",
    fontSize: 17,
    fontWeight: "800",
  },

  menuCourse: {
    color: "#7D6F37",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 3,
  },

  menuPrice: {
    color: "#24252D",
    fontSize: 15,
    fontWeight: "900",
  },

  menuDescription: {
    color: "#686A73",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    marginLeft: 25,
  },

  goldButton: {
    height: 50,
    backgroundColor: "#F2E99E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  goldButtonText: {
    color: "#181818",
    fontWeight: "900",
    fontSize: 13,
  },
});

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [courseOpen, setCourseOpen] = useState(false);
  const [successItem, setSuccessItem] =
    useState<MenuItem | null>(null);

  const validate = () => {
    const newErrors: Errors = {};

    if (!dishName.trim()) {
      newErrors.dishName = "Dish name is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!course) {
      newErrors.course = "Please select a course.";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required.";
    } else if (
      Number.isNaN(Number(price)) ||
      Number(price) <= 0
    ) {
      newErrors.price = "Enter a valid price.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveItem = () => {
    if (!validate()) {
      return;
    }

    const item: MenuItem = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: Number(price).toFixed(2),
    };

    setMenuItems((items) => [...items, item]);

    setSuccessItem(item);
    setErrors({});
    setCourseOpen(false);
    setScreen("success");
  };

  const addAnother = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    setErrors({});
    setSuccessItem(null);
    setScreen("add");
  };

  const showError = (message?: string) => {
    if (!message) {
      return null;
    }

    return (
      <Text style={styles.error}>
        {message}
      </Text>
    );
  };

  // WELCOME PAGE
 if (screen === "welcome") {
  return (
    <SafeAreaView style={styles.welcomeSafe}>
      <StatusBar barStyle="light-content" backgroundColor="#090909" />

      <View style={styles.welcomeScreen}>
        <Text style={styles.welcomeEyebrow}>
          CHEF'S MENU MANAGER
        </Text>

        <View style={styles.welcomeDivider} />

        <Text style={styles.welcomeTitle}>ADMIN</Text>

        <Text style={styles.welcomeSubtitle}>
          My Menu Manager
        </Text>

        <Text style={styles.welcomeDescription}>
          Manage your restaurant menu in one place.{"\n"}
          Add dishes, organise courses, and manage prices.
        </Text>

        <Pressable
          style={styles.startButton}
          onPress={() => setScreen("add")}
        >
          <Text style={styles.startButtonText}>START</Text>
        </Pressable>

        <Text style={styles.welcomeFooter}>
          YOUR MENU. YOUR MANAGEMENT.
        </Text>
      </View>
    </SafeAreaView>
  );
 }

 /* =========================
     SUCCESS SCREEN
     ========================= */

  if (screen === "success") {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#090909"}}>
        <StatusBar barStyle="light-content"/>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#F2E99E", fontSize: 32}}>
            DISH ADDED SUCCESSFULLY!!
          </Text>

          <Pressable
          onPress={() => setScreen("add")}
          style={{
            backgroundColor: "#f2E99E",
            padding: 15,
            marginTop: 20,
          }}
          >
            <Text style={{color: "#181818", fontWeight: "bold"}}>
              ADD ANOTHER DISH
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================
     MENU SCREEN
     ========================= */

  if (screen === "menu") {
    return (
      <SafeAreaView style={styles.menuSafe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#090909"
        />

        <ScrollView
          contentContainerStyle={styles.menuScreen}
        >

          <Text style={styles.menuEyebrow}>
            CHEF'S MENU
          </Text>

          <Text style={styles.menuTitle}>
            MENU LIST
          </Text>

          <Text style={styles.menuSubtitle}>
            All menu items added to your restaurant
          </Text>

          {menuItems.length === 0 ? (

            <View style={styles.noItems}>

              <Text style={styles.noItemsTitle}>
                No menu items yet
              </Text>

              <Text style={styles.noItemsText}>
                Add your first dish to see it here.
              </Text>

            </View>

          ) : (

            menuItems.map((item, index) => (

              <View
                style={styles.menuCard}
                key={item.id}
              >

                <View style={styles.menuCardTop}>

                  <Text style={styles.menuNumber}>
                    {index + 1}
                  </Text>

                  <View style={styles.menuNameArea}>

                    <Text style={styles.menuDish}>
                      {item.name}
                    </Text>

                    <Text style={styles.menuCourse}>
                      {item.course}
                    </Text>

                  </View>

                  <Text style={styles.menuPrice}>
                    R {item.price}
                  </Text>

                </View>

                <Text style={styles.menuDescription}>
                  {item.description}
                </Text>

              </View>

            ))
          )}

          <Pressable
            style={styles.goldButton}
            onPress={addAnother}
          >
            <Text style={styles.goldButtonText}>
              ADD ANOTHER ITEM
            </Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =========================
     ADD MENU ITEM SCREEN
     ========================= */

  return (
    <SafeAreaView style={styles.addSafe}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#090909"
      />

      <ScrollView
        contentContainerStyle={styles.addScreen}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.formBox}>

          <Text style={styles.addTitle}>
            ADD MENU ITEM
          </Text>

          <Text style={styles.addSubtitle}>
            Add a dish to your restaurant menu
          </Text>

          {/* DISH NAME */}

          <Text style={styles.label}>
            DISH NAME
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.dishName &&
                styles.inputError,
            ]}
            placeholder="e.g. Chicken Pasta"
            placeholderTextColor="#9E9E9E"
            value={dishName}
            onChangeText={(value) => {
              setDishName(value);

              setErrors((oldErrors) => ({
                ...oldErrors,
                dishName: "",
              }));
            }}
          />

          {showError(errors.dishName)}

          {/* DESCRIPTION */}

          <Text style={styles.label}>
            DESCRIPTION
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.descriptionInput,
              errors.description &&
                styles.inputError,
            ]}
            placeholder="Enter a description"
            placeholderTextColor="#9E9E9E"
            multiline
            value={description}
            onChangeText={(value) => {
              setDescription(value);

              setErrors((oldErrors) => ({
                ...oldErrors,
                description: "",
              }));
            }}
          />

          {showError(errors.description)}

          {/* COURSE */}

          <Text style={styles.label}>
            COURSE
          </Text>

          <Pressable
            style={[
              styles.dropdown,
              errors.course &&
                styles.inputError,
            ]}
            onPress={() =>
              setCourseOpen((value) => !value)
            }
          >

            <Text
              style={
                course
                  ? styles.selectedText
                  : styles.placeholderText
              }
            >
              {course || "Select Course"}
            </Text>

            <Text style={styles.arrow}>
              {courseOpen ? "▲" : "▼"}
            </Text>

          </Pressable>

          {courseOpen && (

            <View style={styles.dropdownOptions}>

              {COURSES.map((item) => (

                <Pressable
                  key={item}
                  style={styles.option}
                  onPress={() => {

                    setCourse(item);
                    setCourseOpen(false);

                    setErrors((oldErrors) => ({
                      ...oldErrors,
                      course: "",
                    }));

                  }}
                >

                  <Text style={styles.optionText}>
                    {item}
                  </Text>

                </Pressable>

              ))}

            </View>

          )}

          {showError(errors.course)}

          {/* PRICE */}

          <Text style={styles.label}>
            PRICE
          </Text>

          <View
            style={[
              styles.priceBox,
              errors.price &&
                styles.inputError,
            ]}
          >

            <Text style={styles.rand}>
              R
            </Text>

            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              placeholderTextColor="#9E9E9E"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(value) => {

                setPrice(value);

                setErrors((oldErrors) => ({
                  ...oldErrors,
                  price: "",
                }));

              }}
            />

          </View>

          {showError(errors.price)}

          {/* SAVE */}

          <Pressable
            style={styles.saveButton}
            onPress={saveItem}
          >

            <Text style={styles.saveText}>
              SAVE ITEM
            </Text>

          </Pressable>

          {/* VIEW MENU */}

          <Pressable
            style={styles.viewButton}
            onPress={() => setScreen("menu")}
          >

            <Text style={styles.viewText}>
              VIEW MENU
            </Text>

          </Pressable>

        </View>

      </ScrollView>

    </SafeAreaView>
  );

}