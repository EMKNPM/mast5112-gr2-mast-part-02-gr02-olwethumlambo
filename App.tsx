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