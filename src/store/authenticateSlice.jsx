import { createSlice } from "@reduxjs/toolkit";
import { phoneNumberValidate } from "../helper/phoneNumberValidate";

const authenticateInitialState = {
  nameIsValid: false,
  emailIsValid: false,
  passwordIsValid: false,
  phoneIsValid: false,
  nameIsTouched: true,
  emailIsTouched: true,
  passwordIsTouched: true,
  phoneIsTouched: true,
  emailIsExist: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: authenticateInitialState,
  reducers: {
    setNameIstouched(state) {
      state.nameIsTouched = true;
    },
    setEmailIsTouched(state) {
      state.emailIsTouched = true;
    },
    setPasswordIsTouched(state) {
      state.passwordIsTouched = true;
    },
    setPhoneIsTouched(state) {
      state.phoneIsTouched = true;
    },
    setEmailExist(state) {
      state.emailIsExist = false;
    },
    fullnameValidation(state, payload) {
      if (payload.payload.trim() !== "") {
        state.nameIsValid = true;
        state.nameIsTouched = false;
      } else {
        state.nameIsValid = false;
        state.nameIsTouched = false;
      }
    },
    emailValidation(state, payload) {
      const users = JSON.parse(localStorage.getItem("userArr"));
      let checkExistEmail = false;
      if (users) {
        users.forEach((user) => {
          if (user.email === payload.payload) {
            checkExistEmail = true;
            state.emailIsExist = true;
          }
        });
      }

      if (payload.payload.includes("@") && !checkExistEmail) {
        state.emailIsValid = true;
        state.emailIsTouched = false;
      } else {
        state.emailIsValid = false;
        state.emailIsTouched = false;
      }
    },
    passwordValidation(state, payload) {
      if (payload.payload.length > 8) {
        state.passwordIsValid = true;
        state.passwordIsTouched = false;
      } else {
        state.passwordIsValid = false;
        state.passwordIsTouched = false;
      }
    },
    phoneValidation(state, payload) {
      if (phoneNumberValidate(payload.payload)) {
        state.phoneIsValid = true;
        state.phoneIsTouched = false;
      } else {
        state.phoneIsValid = false;
        state.phoneIsTouched = false;
      }
    },
  },
});

export default authenticateSlice.reducer;

export const authenticateActions = authenticateSlice.actions;
