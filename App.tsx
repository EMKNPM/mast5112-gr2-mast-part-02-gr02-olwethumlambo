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
}